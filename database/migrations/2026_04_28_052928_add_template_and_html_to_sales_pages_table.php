<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sales_pages', function (Blueprint $table) {
            $table->string('template')->default('dark_modern')->after('usps');
            $table->longText('html_content')->nullable()->after('generated_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_pages', function (Blueprint $table) {
            $table->dropColumn(['template', 'html_content']);
        });
    }
};
