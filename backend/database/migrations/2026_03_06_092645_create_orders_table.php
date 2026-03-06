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
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->foreignId('service_id')->constrained('services', 'service_id')->cascadeOnDelete();
            $table->foreignId('buyer_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('booster_id')->constrained('users', 'user_id')->cascadeOnDelete();
            
            $table->string('rank_from');
            $table->string('rank_to');

            $table->decimal('price', 8, 2);

            $table->string('status')->default('pending');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
