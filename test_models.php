<?php
$response = Http::withoutVerifying()->get('https://generativelanguage.googleapis.com/v1beta/models?key=' . env('GEMINI_API_KEY'));
print_r($response->json());
