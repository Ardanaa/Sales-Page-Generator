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

        $prompt = "You are a world-class direct-response copywriter and expert frontend developer. Your mission is to build a high-converting sales page using proven psychological triggers.\n\n";
        $prompt .= "=== COPYWRITING STRATEGY ===\n";
        $prompt .= "1. Use the AIDA Framework (Attention, Interest, Desire, Action) to structure the overall page flow.\n";
        $prompt .= "2. Use the PAS Framework (Problem, Agitation, Solution) specifically in the sections following the Hero to deeply connect with the audience's pain points before presenting the solution.\n";
        $prompt .= "3. Write benefit-driven copy, not just features. Explain 'What's in it for them?'.\n";
        $prompt .= "4. Use emotional power words, social proof triggers, and scarcity/urgency where appropriate.\n\n";

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
        $prompt .= "4. VISUALS: Avoid generic photography. Use abstract CSS gradients, glassmorphism containers, or high-quality inline SVG illustrations. For avatars, use <img src=\"https://api.dicebear.com/7.x/avataaars/svg?seed={name}\" alt=\"avatar\"> which looks professional and modern.\n";
        $prompt .= "5. Include a <script> at the bottom for the mobile hamburger menu toggle.\n";

        $prompt .= "\n=== PAGE STRUCTURE (all required) ===\n";
        $prompt .= "1. NAVBAR: Sticky top-0 z-50 with glassmorphism. Nav links use anchor hrefs (#features, #pricing, etc).\n";
        $prompt .= "2. HERO (Attention): Magnetic headline (max 10 words) that stops the scroll, a compelling subheadline, and a primary CTA. Use a high-end visual element.\n";
        $prompt .= "3. THE PAIN (Problem & Agitation): A dedicated section using PAS. Describe the struggle the target audience faces without this product. Make them feel the problem before showing the cure.\n";
        $prompt .= "4. THE SOLUTION: Introduce the product as the hero that solves the previously mentioned pain points.\n";
        $prompt .= "5. SOCIAL PROOF BAR: Trust badges or 'Featured In' section.\n";
        $prompt .= "6. FEATURES/BENEFITS (Interest & Desire): Use a grid. Convert every feature into a deep benefit. Use icons.\n";
        $prompt .= "7. SOCIAL PROOF (Testimonials): 2-3 high-impact testimonials with avatars.\n";
        $prompt .= "8. PRICING: Clear pricing card with a 'Risk-Free' guarantee mention.\n";
        $prompt .= "9. FINAL CTA (Action): A high-urgency closing section with a clear directive to buy now.\n";
        $prompt .= "10. FOOTER: Professional copyright and links.\n";

        $prompt .= "\n=== DESIGN QUALITY RULES ===\n";
        $prompt .= "- DO NOT make it look like a generic Bootstrap template. Make it look like a Y Combinator startup landing page.\n";
        $prompt .= "- Use a modern font stack: Inter or Outfit from Google Fonts.\n";
        $prompt .= "- Use generous spacing (py-24). Sections should feel editorial and premium.\n";
        $prompt .= "- Write copy like a $10k/month copywriter: punchy, clear, and persuasive.\n";
        $prompt .= "- The page must be fully responsive (mobile-first).\n";

        $prompt .= "\n\nReturn the response strictly as a JSON object with the following structure:\n";
        $prompt .= "{\n";
        $prompt .= "  \"html\": \"<!DOCTYPE html><html>...</html>\"\n";
        $prompt .= "}\n";

        $response = Http::withoutVerifying()
            ->timeout(300)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' . $apiKey, [
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
            ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' . $apiKey, [
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
