<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#05070A">
        <meta name="color-scheme" content="dark">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Paint the canvas before first byte of CSS lands, so there is no white flash. --}}
        <style>html{background:#05070A;color-scheme:dark}body{background:#05070A;margin:0}</style>

        <!-- Fonts: Space Grotesk (display) / Inter (body) / JetBrains Mono (technical labels) -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=space-grotesk:400,500,600,700|inter:400,500,600,700|jetbrains-mono:400,500&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-void text-ink">
        @inertia
    </body>
</html>
