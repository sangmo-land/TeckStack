<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictFilamentAccess
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        // Allow guests to reach Filament login (/admin/login) and let Filament handle auth
        if (!$user) {
            return $next($request);
        }

        // Only admins can access Filament panel routes when authenticated
        if (method_exists($user, 'isAdmin')) {
            if (!$user->isAdmin()) {
                return redirect('/dashboard');
            }
        } else {
            if (($user->role ?? null) !== 'admin') {
                return redirect('/dashboard');
            }
        }

        return $next($request);
    }
}
