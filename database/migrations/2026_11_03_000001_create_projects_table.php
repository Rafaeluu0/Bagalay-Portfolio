<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();      // "Digital Brand Identity & Editorial System"
            $table->text('description');                 // what the project is
            $table->string('tech_stack', 150);           // comma-separated: "Illustrator, InDesign"
            $table->string('project_url')->nullable();   // live site / case study / prototype
            $table->string('repository_url')->nullable(); // GitHub / GitLab link
            $table->string('image')->nullable();         // path on the public disk, e.g. projects/abc.jpg
            $table->date('completed_at');                // date completed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
