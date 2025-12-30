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

// Optional allowlist via env: FILAMENT_ALLOWED_EMAILS="admin@example.com,owner@example.com"
        $allowedEmails = array_filter(array_map('trim', explode(',', (string) env('FILAMENT_ALLOWED_EMAILS'))));
        if (!empty($allowedEmails) && in_array($user->email, $allowedEmails, true)) {
        return $next($request);
        }
        
        // Allow common admin roles
        $allowedRoles = ['admin', 'superadmin'];
        // Only admins can access Filament panel routes when authenticated
        if (method_exists($user, 'isAdmin')) {
            if (!$user->isAdmin()) {
                return redirect('/dashboard');
            }
        } else {
if (!in_array(($user->role ?? null), $allowedRoles, true)) {
                return redirect('/dashboard');
            }
        }

        return $next($request);
    }
}
