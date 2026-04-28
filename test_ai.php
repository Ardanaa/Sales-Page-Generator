<?php
$page = new \App\Models\SalesPage();
$page->name = 'CopyGenius';
$page->description = 'AI copywriting assistant';
$page->features = 'templates, AI';
$page->target_audience = 'Marketers';
$page->price = '$49';
$page->usps = 'Fast';

$svc = app(\App\Services\AIGeneratorService::class);
$result = $svc->generateSalesCopy($page);
print_r($result);
