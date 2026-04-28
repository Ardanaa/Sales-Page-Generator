<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $salesPages = $request->user()->salesPages()->latest()->get();
        
        return Inertia::render('Dashboard', [
            'salesPages' => $salesPages
        ]);
    }
}
