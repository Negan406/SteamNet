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
        Schema::table('packages', function (Blueprint $table) {
            $table->string('category')->default('Basic')->after('duration_days');
        });

        Schema::table('iptv_accounts', function (Blueprint $table) {
            $table->string('category')->default('Basic')->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('iptv_accounts', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
