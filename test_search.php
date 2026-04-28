<?php
$r = Http::withoutVerifying()->get('https://generativelanguage.googleapis.com/v1beta/models?key='.env('GEMINI_API_KEY'))->json();
foreach($r['models'] as $m) {
    if(strpos($m['name'], 'gemini') !== false && in_array('generateContent', $m['supportedGenerationMethods'])) echo $m['name'] . "\n";
}
