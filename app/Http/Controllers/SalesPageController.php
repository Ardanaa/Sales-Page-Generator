<?php

namespace App\Http\Controllers;

use App\Models\SalesPage;
use App\Services\AIGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesPageController extends Controller
{
    public function create()
    {
        return Inertia::render('SalesPage/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|string',
            'target_audience' => 'nullable|string',
            'price' => 'nullable|string',
            'usps' => 'nullable|string',
            'template' => 'required|string|in:dark_modern,clean_minimalist',
        ]);

        $salesPage = $request->user()->salesPages()->create($validated);

        return redirect()->route('sales-pages.show', $salesPage);
    }

    public function show(SalesPage $salesPage)
    {
        if ($salesPage->user_id !== request()->user()->id) {
            abort(403);
        }

        return Inertia::render('SalesPage/Show', [
            'salesPage' => $salesPage
        ]);
    }

    public function generate(Request $request, SalesPage $salesPage, AIGeneratorService $aiService)
    {
        if ($salesPage->user_id !== $request->user()->id) {
            abort(403);
        }

        $generatedData = $aiService->generateSalesCopy($salesPage);

        if (isset($generatedData['error'])) {
            return back()->with('error', $generatedData['error']);
        }

        $salesPage->update([
            'generated_data' => $generatedData
        ]);

        return back()->with('success', 'Sales copy generated successfully!');
    }

    public function generateSection(Request $request, SalesPage $salesPage, AIGeneratorService $aiService)
    {
        if ($salesPage->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate([
            'section' => 'required|string|in:Hero,Benefits,Features,Social Proof,Pricing,Call to Action'
        ]);

        $generatedData = $aiService->generateSection($salesPage, $request->section);

        if (isset($generatedData['error'])) {
            return back()->with('error', $generatedData['error']);
        }

        if (isset($generatedData['html'])) {
            $salesPage->update([
                'html_content' => $generatedData['html']
            ]);
        }

        return back()->with('success', "{$request->section} section regenerated successfully!");
    }

    public function destroy(SalesPage $salesPage)
    {
        if ($salesPage->user_id !== request()->user()->id) {
            abort(403);
        }
        
        $salesPage->delete();

        return redirect()->route('dashboard')->with('success', 'Sales page deleted.');
    }
}
