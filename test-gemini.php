<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$page = App\Models\SalesPage::first();
if (!$page) {
    echo "No sales page found.\n";
    exit;
}

$service = new App\Services\AIGeneratorService();
echo "Generating section...\n";
$res = $service->generateSection($page, 'Hero');
var_dump($res);
