<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->integer('api_id');
            $table->string('title');
            $table->longText('description', 1500);
            $table->string('ru_title');
            $table->smallInteger('year');
            $table->float('raiting')->nullable();
            $table->integer('watched')->nullable();
            $table->integer('place')->nullable();
            $table->string('status')->nullable();
            $table->string('image');
            $table->string('big_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
