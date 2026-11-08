<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Public portfolio
Route::get('/', [PortfolioController::class, 'index'])->name('home');

// Breeze's auth routes still point at "dashboard" after login, so keep the name
Route::get('/dashboard', fn () => redirect()->route('projects.index'))->name('dashboard');

// Projects CRUD: open, no login required (index, create, store, edit, update, destroy)
Route::resource('projects', ProjectController::class)->except('show');

require __DIR__ . '/auth.php';
