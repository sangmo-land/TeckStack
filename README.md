## NelnadoSolutions

Laravel 12 with React, Inertia, Tailwind CSS, Breeze auth scaffolding, and Filament admin panel.

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 22.12+ (or 20.19+) and npm 10+
- A database (SQLite is pre-configured via `database/database.sqlite`)

### Initial setup
1. Copy environment file and adjust values:
	- `copy .env.example .env`
	- Set `APP_URL=http://localhost:8000` (or your host)
2. Install PHP dependencies: `composer install`
3. Generate app key (if missing): `php artisan key:generate`
4. Run migrations: `php artisan migrate`
5. Install JS deps: `npm install`

### Development
- Start Laravel server: `php artisan serve`
- Start Vite dev server: `npm run dev`
- Filament admin panel is available at `/admin` (auth required).

### Production build
- Build assets: `npm run build`
- Serve via your preferred PHP web server; ensure `public/` is the document root.

### Notes
- Vite requires Node 22.12+ (or 20.19+). Update Node if you see an engine warning during builds.
