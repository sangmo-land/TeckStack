<?php

namespace App\Filament\Resources\Chapters\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ChaptersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_number')
                    ->label('Chapter #')
                    ->weight('bold')
                    ->sortable(),
                
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title),
                
                TextColumn::make('course.title')
                    ->label('Course')
                    ->searchable()
                    ->sortable()
                    ->icon(Heroicon::OutlinedAcademicCap)
                    ->color('gray'),
                
                TextColumn::make('parent.title')
                    ->label('Parent')
                    ->searchable()
                    ->limit(30),
                
                TextColumn::make('level')
                    ->badge()
                    ->color(fn (int $state): string => match ($state) {
                        1 => 'success',
                        2 => 'info',
                        3 => 'warning',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (int $state): string => 'Level ' . $state),
                
                TextColumn::make('duration_minutes')
                    ->label('Duration')
                    ->sortable()
                    ->formatStateUsing(fn (?int $state): string => $state ? $state . ' min' : '-'),
                
                IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean()
                    ->trueIcon(Heroicon::OutlinedCheckCircle)
                    ->falseIcon(Heroicon::OutlinedXCircle)
                    ->trueColor('success')
                    ->falseColor('gray'),
                
                IconColumn::make('is_free')
                    ->label('Free')
                    ->boolean()
                    ->trueIcon(Heroicon::OutlinedGift)
                    ->falseIcon(Heroicon::OutlinedLockClosed)
                    ->trueColor('success')
                    ->falseColor('gray'),
                
                TextColumn::make('created_at')
                    ->dateTime('M d, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('course_id')
                    ->relationship('course', 'title')
                    ->label('Course'),
                
                SelectFilter::make('level')
                    ->options([
                        '1' => 'Level 1',
                        '2' => 'Level 2',
                        '3' => 'Level 3',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ])
            ->defaultSort('order', 'asc');
    }
}
