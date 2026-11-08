<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /** Seeded projects have no image/links; use Edit to add them (cards show a placeholder until then). */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Digital Brand Identity & Editorial System',
                'description' => 'Complete brand manual and multi-page editorial publication for a contemporary creative studio: vector identity in Illustrator, editorial spreads in InDesign, and color-graded campaign photography in Lightroom.',
                'tech_stack' => 'Illustrator, InDesign, Photoshop, Lightroom',
                'completed_at' => '2026-03-15',
            ],
            [
                'title' => 'Creative Media & Photography Showcase',
                'description' => 'Editorial portraits and urban architecture photography. Frequency separation for natural skin texture, complex composite lighting, and tailored cinematic color palettes in Lightroom.',
                'tech_stack' => 'Photoshop, Lightroom Classic, Color Grading, Compositing',
                'completed_at' => '2026-06-20',
            ],
            [
                'title' => 'Lab Recon & Web Vulnerability Report',
                'description' => 'Home-lab and TryHackMe write-up: enumeration, OWASP Top 10 mapping, and remediation notes, laid out as a boardroom-ready executive report.',
                'tech_stack' => 'Kali Linux, Nmap, Python, InDesign',
                'completed_at' => '2026-09-10',
            ],
        ];

        foreach ($projects as $p) {
            Project::updateOrCreate(['title' => $p['title']], $p);
        }
    }
}
