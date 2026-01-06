    <div
        class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {{-- Animated Background Effects --}}
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse">
            </div>
            <div
                class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000">
            </div>
            <div class="absolute top-0 left-0 w-full h-full"
                style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0); background-size: 32px 32px;">
            </div>
        </div>

        <div class="w-full max-w-lg px-6 relative z-10 transition-all duration-300">
            {{-- Logo Section --}}
            <div class="text-center mb-8">
                <div
                    class="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20 mb-4">
                    <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-white tracking-tight">
                    Nelnado<span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Solutions</span>
                </h1>
                <p class="text-slate-400 mt-2 text-sm">Secure Administrative Access</p>
            </div>

            {{-- Login Card --}}
            <div
                class="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl ring-1 ring-white/5">
                {{ $this->form }}

                {{-- Footer Text --}}
                <p class="text-center text-xs text-slate-500 mt-6">
                    &copy; {{ date('Y') }} NelnadoSolutions. All rights reserved.
                </p>
            </div>
        </div>
</div>
