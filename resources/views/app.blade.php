<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark scroll-smooth motion-reduce:scroll-auto">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Portfolio of Rafael U. Bagalay, BSIT undergraduate in visual design and offensive cybersecurity.">
    <title inertia>Rafael U. Bagalay | Layout Artist &amp; Aspiring Pentester</title>

    {{-- Apply saved theme before paint to avoid a flash --}}
    <script>try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}</script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet">

    @routes {{-- Ziggy: gives Breeze's login/register pages their route() helper --}}
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body class="bg-bg text-ink antialiased">
    @inertia
</body>
</html>
