<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /** GET / - public portfolio; the Projects section comes from the database. */
    public function index(): Response
    {
        return Inertia::render('Portfolio', [
            'projects' => Project::orderByDesc('completed_at')->orderByDesc('id')->get(),
        ]);
    }
}
