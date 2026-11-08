# Rafael U. Bagalay – Portfolio (Laravel + Inertia + React)

Midterm Laboratory Activity: the portfolio converted to Laravel + Inertia.js + React.
The **Projects** section is dynamic (full CRUD with image upload and validation); everything else is static React.

This folder is an **overlay**: copy its contents on top of a fresh Laravel + Breeze (React) project.

## Setup

```bash
# 1. New Laravel project with Breeze (React, Inertia) – gives login + Inertia wiring
composer create-project laravel/laravel bagalay-portfolio
cd bagalay-portfolio
composer require laravel/breeze --dev
php artisan breeze:install react        # pick: React (no TypeScript), no dark mode, PHPUnit

# 2. Copy the CONTENTS of this overlay into the project root, replacing files when asked
#    (app/, database/, resources/, routes/, tests/, public/images/, vite.config.js)

# 3. Tailwind v4 (the design uses v4 syntax) – replace Breeze's Tailwind v3 setup
#    Windows: use `del` instead of `rm`
rm -f tailwind.config.js postcss.config.js
npm install
npm install tailwindcss@latest @tailwindcss/vite@latest

# 4. Database, seed data (admin user + 3 projects) and the public link for uploaded images
php artisan migrate --seed
php artisan storage:link

# 5. Run
npm run dev          # terminal 1
php artisan serve    # terminal 2
```

- Public portfolio: http://127.0.0.1:8000
- No login is needed: the **Projects** section shows **+ Add project** and **Edit / Delete** on each card.
  The full management table is at http://127.0.0.1:8000/projects.
- Anyone who can open the site can change projects. Add `->middleware('auth')` back in `routes/web.php` before deploying publicly.
- Tests: `php artisan test --filter=ProjectValidationTest` (needs the PHP `gd` extension for fake images)

If Vite complains about versions, run `npm install vite@latest laravel-vite-plugin@latest @vitejs/plugin-react@latest`.

**Image upload limit:** PHP's default `upload_max_filesize` is 2M, matching the 2 MB rule. Files bigger than the PHP limit
are rejected before Laravel runs; the form shows "The image failed to upload. Keep it under 2 MB."

## Where things are

| Piece | File |
|---|---|
| Migration | `database/migrations/2026_11_03_000001_create_projects_table.php` |
| Model | `app/Models/Project.php` |
| Resource controller | `app/Http/Controllers/ProjectController.php` |
| Public page controller | `app/Http/Controllers/PortfolioController.php` |
| Routes | `routes/web.php` |
| Flash/auth props | `app/Http/Middleware/HandleInertiaRequests.php` |
| Seeders | `database/seeders/` |
| Pages | `resources/js/Pages/Portfolio.jsx`, `Pages/Projects/{Index,Create,Edit}.jsx` |
| Components | `resources/js/Components/` (`ProjectCard`, `Admin/ProjectForm`, `Admin/ProjectModal`, `Admin/FormField`, `Navbar`, `Footer`, ...) |
| Static content | `resources/js/data/content.js` (skills, education, certs) |
| Tests | `tests/Feature/ProjectValidationTest.php` |

## Routes (`Route::resource('projects', ...)->except('show')`)

| Method | URI | Action | Name |
|---|---|---|---|
| GET | /projects | index | projects.index |
| GET | /projects/create | create | projects.create |
| POST | /projects | store | projects.store |
| GET | /projects/{project}/edit | edit | projects.edit |
| PUT/PATCH | /projects/{project} | update | projects.update |
| DELETE | /projects/{project} | destroy | projects.destroy |

`show` is left out because projects are displayed on the portfolio page itself.
Edits that include an image are sent as POST with `_method=put` (a real PUT cannot carry a file upload).

## Fields and validation rules

| Field | Column | Rules |
|---|---|---|
| title | string(100), unique | required, string, min 3, max 100, unique (ignores current record on update) |
| description | text | required, string, min 20, max 500 |
| tech_stack | string(150) | required, string, max 150 (comma-separated) |
| project_url | string, nullable | nullable, valid http/https URL, max 255 |
| repository_url | string, nullable | nullable, valid http/https URL, max 255 |
| image | string (path on `public` disk) | required on create, optional on update; image, jpg/jpeg/png/webp, max 2048 KB |
| completed_at | date | required, date, before_or_equal today |

Custom messages: `title.unique`, `description.min`, `project_url.url`, `repository_url.url`,
`completed_at.before_or_equal`, `image.required`, `image.mimes`, `image.max`.

Uploaded files are saved in `storage/app/public/projects/` and served from `/storage/projects/...`.
Replacing an image or deleting a project also deletes the old file.

## Validation test table (fill the "Actual" column while demoing)

| # | Test case | Input used | Expected | Actual | Pass/Fail |
|---|---|---|---|---|---|
| 1 | Empty form | all blank | Required errors under title, description, tech stack, date, image | | |
| 2 | Title too long | 101 characters | "title must not be greater than 100 characters" | | |
| 3 | Description too short | `too short` | Custom message "at least 20 characters" | | |
| 4 | Bad project URL | `not a url` | Custom message "Enter a full link, e.g. https://example.com" | | |
| 5 | Bad repository URL | `github.com/x` | Custom message "Enter a full link, e.g. https://github.com/you/repo" | | |
| 6 | Future date | tomorrow | "The completion date cannot be in the future." | | |
| 7 | Wrong file type | upload a PDF | "Only JPG, PNG or WebP images are allowed." / "must be an image" | | |
| 8 | Image too big | file over 2 MB | "The image must be 2 MB or smaller." | | |
| 9 | Duplicate unique value | title of an existing project | "You already have a project with this title." | | |
| 10 | Update, same title, no new image | edit a project, change only tech stack | Saves, success flash, old image kept | | |
| 11 | Values kept on error | invalid submit with other fields filled | Typed values still in the inputs | | |
| 12 | No login needed | open /projects without logging in | Page opens (CRUD is public) | | |

Most rows are also covered by `ProjectValidationTest`.

## Live-change practice

Add a nullable `client` field end to end: migration column → `$fillable` → rule in `ProjectController::rules()` → input in `ProjectForm.jsx` → default in `Create.jsx`, `Edit.jsx`, `ProjectModal.jsx` → show it in `ProjectCard.jsx`.
