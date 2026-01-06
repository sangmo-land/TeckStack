<x-filament-panels::layout.base :livewire="$livewire">
    @slot('bodyAttributes')
        class="bg-slate-950 font-sans antialiased"
    @endslot
    {{ $slot }}
</x-filament-panels::layout.base>
