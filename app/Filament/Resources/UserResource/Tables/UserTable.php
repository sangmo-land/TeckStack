<?php

namespace App\Filament\Resources\UserResource\Tables;

use Filament\Support\Icons\Heroicon;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class UserTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('role')
                    ->badge()
                    ->colors([
                        'primary',
                        'success' => 'admin',
                        'info' => 'instructor',
                        'warning' => 'student',
                    ])
                    ->icon(fn (string $state) => match ($state) {
                        'admin' => Heroicon::OutlinedShieldCheck,
                        'instructor' => Heroicon::OutlinedBriefcase,
                        default => Heroicon::OutlinedAcademicCap,
                    })
                    ->sortable(),
                IconColumn::make('is_email_verified')
                    ->label('Verified')
                    ->boolean(),
IconColumn::make('is_active')
                ->label('Approved')
                ->boolean()
                ->sortable()
                ->action(fn ($record) => $record->update(['is_active' => !$record->is_active])), // Toggle action
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->since(),
            ])
            ->filters([
                SelectFilter::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'instructor' => 'Instructor',
                        'student' => 'Student',
                    ]),
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
