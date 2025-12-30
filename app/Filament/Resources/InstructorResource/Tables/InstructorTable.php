<?php

namespace App\Filament\Resources\InstructorResource\Tables;

use Filament\Support\Icons\Heroicon;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class InstructorTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('role_title')
                    ->searchable()
                    ->limit(30)
                    ->tooltip(fn (TextColumn $column): ?string => $column->getState()),
                BadgeColumn::make('rating')
                    ->colors([
                        'danger' => static fn ($value) => $value < 3,
                        'warning' => static fn ($value) => $value < 4,
                        'success' => static fn ($value) => $value >= 4,
                    ])
                    ->formatStateUsing(fn ($state) => $state > 0 ? "{$state}/5.0" : 'No rating'),
                TextColumn::make('students')
                    ->numeric()
                    ->label('Students')
                    ->sortable(),
                TextColumn::make('courses')
                    ->numeric()
                    ->label('Courses')
                    ->sortable(),
                TextColumn::make('years_experience')
                    ->numeric()
                    ->label('Exp. (yrs)')
                    ->sortable(),
                TextColumn::make('expertise')
                    ->label('Expertise')
                    ->formatStateUsing(fn ($state) => is_array($state) 
                        ? implode(', ', array_slice($state, 0, 2)) . (count($state) > 2 ? '...' : '')
                        : 'N/A')
                    ->limit(40)
                    ->tooltip(fn (TextColumn $column): ?string => is_array($column->getState()) 
                        ? implode(', ', $column->getState())
                        : null),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->since()
                    ->label('Created'),
            ])
            ->filters([
                SelectFilter::make('expertise')
                    ->multiple()
                    ->options(fn () => collect(\DB::table('instructors')
                        ->pluck('expertise')
                        ->filter()
                        ->map(fn ($json) => json_decode($json, true))
                        ->flatten()
                        ->unique()
                        ->sort()
                        ->values()
                        ->mapWithKeys(fn ($skill) => [$skill => $skill])
                        ->toArray())),
            ])
            ->actions([
                DeleteAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }
}
