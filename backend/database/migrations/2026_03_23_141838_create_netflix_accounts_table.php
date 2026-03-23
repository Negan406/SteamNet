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
        Schema::create('netflix_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('password');
            $table->string('profile_name')->nullable();
            $table->string('pin')->nullable();
            $table->string('category')->default('Basic');
            $table->enum('status', ['available', 'sold'])->default('available');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->date('expire_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('netflix_accounts');
    }
};
