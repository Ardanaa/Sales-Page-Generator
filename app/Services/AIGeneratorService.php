<?php

namespace App\Services;

use App\Models\SalesPage;
use Illuminate\Support\Facades\Http;

class AIGeneratorService
{
    public function generateSalesCopy(SalesPage $salesPage)
    {
        set_time_limit(300);
        $apiKey = env('GEMINI_API_KEY');

        $templateStyle = $salesPage->template === 'dark_modern' 
            ? "Dark Modern: Rich dark backgrounds (#0B0F19, #111827), white/gray text, vibrant gradient accents (purple-to-indigo, cyan-to-blue). Use glassmorphism (bg-white/5 backdrop-blur-xl border border-white/10). Subtle glowing shadows on CTAs (shadow-[0_0_30px_rgba(99,102,241,0.4)]). Use bg-gradient-to-r for hero backgrounds."
            : "Clean Minimalist: Warm off-white backgrounds (#FAFAF9, #F5F5F4), rich dark text (#1C1917), a single vibrant accent color. Generous whitespace, editorial typography feel. Subtle shadows (shadow-sm). Apple/Linear-inspired aesthetic.";

        $prompt = "You are a world-class frontend developer and direct-response copywriter. You build landing pages that look like they were designed by a top agency and convert like crazy.\n\n";
        $prompt .= "Generate a complete, standalone, PREMIUM HTML sales page for:\n\n";
        $prompt .= "Product: " . $salesPage->name . "\n";
        $prompt .= "Description: " . $salesPage->description . "\n";
        if ($salesPage->features) {
            $prompt .= "Features: " . $salesPage->features . "\n";
        }
        if ($salesPage->target_audience) {
            $prompt .= "Target Audience: " . $salesPage->target_audience . "\n";
        }
        if ($salesPage->price) {
            $prompt .= "Price: " . $salesPage->price . "\n";
        }
        if ($salesPage->usps) {
            $prompt .= "Unique Selling Propositions: " . $salesPage->usps . "\n";
        }

        $prompt .= "\n\nDesign Style: " . $templateStyle . "\n";

        $prompt .= "\n=== TECHNICAL REQUIREMENTS ===\n";
        $prompt .= "1. Return a FULL, valid HTML5 document starting with <!DOCTYPE html>.\n";
        $prompt .= "2. Include Tailwind CSS via CDN: <script src=\"https://cdn.tailwindcss.com\"></script>\n";
        $prompt .= "3. Add <style>html { scroll-behavior: smooth; }</style> in the <head> for native smooth scrolling.\n";
        $prompt .= "4. Do NOT use any external images. Use inline SVG icons, emoji, or Tailwind-styled div placeholders.\n";
        $prompt .= "5. Include a <script> at the bottom for the mobile hamburger menu toggle.\n";

        $prompt .= "\n=== PAGE STRUCTURE (all required) ===\n";
        $prompt .= "1. NAVBAR: sticky top-0 z-50 with backdrop-blur. Nav links use anchor hrefs (#features, #pricing, etc). Must include a hamburger button (hidden on desktop, visible on mobile) that toggles a mobile menu div. The mobile menu must start hidden.\n";
        $prompt .= "2. HERO: Large compelling headline (max 10 words), a subheadline (1-2 sentences), and a prominent CTA button. Use gradient text or accent colors on key words.\n";
        $prompt .= "3. SOCIAL PROOF BAR: A row of logos or trust badges (e.g. '500+ companies trust us', '4.9/5 rating'). Use simple styled divs as logo placeholders.\n";
        $prompt .= "4. FEATURES/BENEFITS: Use a grid (2 or 3 columns on desktop, 1 on mobile). Each card should have an icon (inline SVG), a bold title, and a short description. Use hover effects.\n";
        $prompt .= "5. TESTIMONIALS: 2-3 testimonial cards with fake but realistic quotes, names, and roles. Use rounded avatar placeholders.\n";
        $prompt .= "6. PRICING: At least one pricing card with a clear price, feature list with checkmarks, and a CTA button. Highlight the recommended plan if multiple.\n";
        $prompt .= "7. FINAL CTA: A strong closing section with urgency, a headline, and a large CTA button.\n";
        $prompt .= "8. FOOTER: Simple footer with copyright and a few links.\n";

        $prompt .= "\n=== DESIGN QUALITY RULES ===\n";
        $prompt .= "- DO NOT make it look like a generic Bootstrap template. Make it look like a Y Combinator startup landing page or a premium Framer template.\n";
        $prompt .= "- Use a modern font stack: add <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap\" rel=\"stylesheet\"> and set font-family: 'Inter', sans-serif on the body.\n";
        $prompt .= "- Use generous spacing (py-20, py-24, gap-8, gap-12). Sections should breathe.\n";
        $prompt .= "- Use rounded-2xl or rounded-xl on cards. No sharp corners.\n";
        $prompt .= "- CTAs should be large, bold, and have hover scale effects (hover:scale-105 transition-transform).\n";
        $prompt .= "- Add subtle micro-animations: transition-all duration-300 on interactive elements.\n";
        $prompt .= "- Write copy like a pro copywriter: benefit-driven, specific numbers, power words, urgency triggers.\n";
        $prompt .= "- The page must be fully responsive (mobile-first). Test your layout mentally at 375px, 768px, and 1280px.\n";

        $prompt .= "\n\nReturn the response strictly as a JSON object with the following structure:\n";
        $prompt .= "{\n";
        $prompt .= "  \"html\": \"<!DOCTYPE html><html>...</html>\"\n";
        $prompt .= "}\n";

        $response = Http::withoutVerifying()
            ->timeout(300)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'responseMimeType' => 'application/json'
                ]
            ]);

        if ($response->successful()) {
            $jsonResponse = $response->json();
            $content = $jsonResponse['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            
            // Strip markdown backticks if Gemini accidentally includes them
            $content = preg_replace('/^```json\s*/i', '', $content);
            $content = preg_replace('/^```\s*/i', '', $content);
            $content = preg_replace('/\s*```$/i', '', $content);

            $decoded = json_decode($content, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Illuminate\Support\Facades\Log::error('JSON Decode Error in generateSalesCopy: ' . json_last_error_msg() . ' Content snippet: ' . substr($content, 0, 200));
                return ['error' => 'Failed to parse AI response. See logs for details.'];
            }

            // Save the raw HTML to the sales page record
            if (isset($decoded['html'])) {
                $salesPage->update([
                    'html_content' => $decoded['html']
                ]);
            } else {
                \Illuminate\Support\Facades\Log::error('AI Response missing HTML key. Content snippet: ' . substr($content, 0, 200));
                return ['error' => 'AI returned an invalid format. Missing "html" key.'];
            }

            return $decoded;
        }

        \Illuminate\Support\Facades\Log::error('Gemini API Error in generateSalesCopy: ' . $response->body());

        return [
            'error' => 'Failed to generate content: ' . $response->json('error.message', 'Unknown API Error')
        ];
    }

    public function generateSection(SalesPage $salesPage, string $section)
    {
        set_time_limit(300);
        $apiKey = env('GEMINI_API_KEY');

        $prompt = "You are an expert web developer and copywriter.\n";
        $prompt .= "I have an existing HTML sales page for a product named '{$salesPage->name}'.\n";
        $prompt .= "I want you to regenerate ONLY the '{$section}' section of this HTML.\n";
        $prompt .= "Make it more persuasive, engaging, and better designed, but keep the SAME Tailwind design system and aesthetic.\n";
        $prompt .= "DO NOT change the other sections.\n\n";
        $prompt .= "Product Description: {$salesPage->description}\n";
        if ($salesPage->features) $prompt .= "Features: {$salesPage->features}\n";
        if ($salesPage->price) $prompt .= "Price: {$salesPage->price}\n";
        
        $prompt .= "\nREQUIREMENTS:\n";
        $prompt .= "1. Return the FULL, updated valid HTML5 document.\n";
        $prompt .= "2. The '{$section}' section should be completely rewritten and improved.\n";
        $prompt .= "3. All other sections MUST remain exactly as they are in the original HTML.\n";
        $prompt .= "\n\nReturn the response strictly as a JSON object with the following structure:\n";
        $prompt .= "{\n";
        $prompt .= "  \"html\": \"<!DOCTYPE html><html>...</html>\"\n";
        $prompt .= "}\n\n";
        
        $prompt .= "EXISTING HTML:\n```html\n" . $salesPage->html_content . "\n```\n";

        $response = Http::withoutVerifying()
            ->timeout(300)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . $apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'responseMimeType' => 'application/json'
                ]
            ]);

        if ($response->successful()) {
            $jsonResponse = $response->json();
            $content = $jsonResponse['candidates'][0]['content']['parts'][0]['text'] ?? '{}';
            
            // Strip markdown backticks if Gemini accidentally includes them
            $content = preg_replace('/^```json\s*/i', '', $content);
            $content = preg_replace('/^```\s*/i', '', $content);
            $content = preg_replace('/\s*```$/i', '', $content);

            \Illuminate\Support\Facades\Log::info('Gemini Section Response: ' . substr($content, 0, 500));
            \Illuminate\Support\Facades\Log::info('Gemini Section Response END: ' . substr($content, -500));

            $decoded = json_decode($content, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Illuminate\Support\Facades\Log::error('JSON Decode Error in generateSection: ' . json_last_error_msg() . ' Content snippet: ' . substr($content, 0, 200));
                return ['error' => 'Failed to parse AI response. See logs for details.'];
            }
            
            if (!isset($decoded['html'])) {
                \Illuminate\Support\Facades\Log::error('AI Response missing HTML key. Content snippet: ' . substr($content, 0, 200));
                return ['error' => 'AI returned an invalid format. Missing "html" key.'];
            }

            return $decoded;
        }

        \Illuminate\Support\Facades\Log::error('Gemini API Error in generateSection: ' . $response->body());

        return [
            'error' => 'Failed to generate content: ' . $response->json('error.message', 'Unknown API Error')
        ];
    }
}
