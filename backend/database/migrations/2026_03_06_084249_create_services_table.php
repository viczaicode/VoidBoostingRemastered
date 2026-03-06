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
        Schema::create('services', function (Blueprint $table) {
            $table->id('service_id');
            
            $table->string('title', 32);
            $table->longText('description');
            $table->longText("photo");

            $table->string('status')->default('active');

            $table->timestamps();
        });

        Service::create([
            'title' => "Boosting below masters",
            'description' => "rank boost desc",
            'user_id' => 1,
            'photo' => "/kepek/rank.png"
        ]);

        Service::create([
            'title' => "Boosting above masters",
            'description' => "rank boost desc",
            'user_id' => 1,
            'photo' => "/kepek/rank.png"
        ]);

        Service::create([
            'title' => "Coaching",
            'description' => "coaching desc",
            'user_id' => 1,
            'photo' => "/kepek/rank.png"
        ]);  
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
