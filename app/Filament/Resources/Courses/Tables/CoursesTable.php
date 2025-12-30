<?php

namespace App\Filament\Resources\Courses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\Action;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class CoursesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail_url')
                    ->label('Thumbnail')
                    ->square()
                    ->defaultImageUrl(url('/images/default-course.png'))
                    ->toggleable(isToggledHiddenByDefault: false),
                
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title)
                    ->description(fn ($record): string => $record->instructor?->name ?? 'No instructor', position: 'above')
                    ->icon(Heroicon::OutlinedUserCircle),
                
                TextColumn::make('instructor.name')
                    ->label('Instructor')
                    ->searchable()
                    ->sortable()
                    ->icon(Heroicon::OutlinedUserCircle)
                    ->color('gray')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->visibleFrom('md'),
                
                TextColumn::make('category')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info')
                    ->toggleable(isToggledHiddenByDefault: false),
                
                TextColumn::make('level')
                    ->sortable()
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'beginner' => 'success',
                        'intermediate' => 'warning',
                        'advanced' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state))
                    ->toggleable(isToggledHiddenByDefault: false),
                
                TextColumn::make('price')
                    ->money('USD')
                    ->sortable()
                    ->alignRight()
                    ->toggleable(isToggledHiddenByDefault: false),
                
                TextColumn::make('enrollments_count')
                    ->counts('enrollments')
                    ->label('Enrollments')
                    ->sortable()
                    ->badge()
                    ->color('primary')
                    ->alignCenter()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->visibleFrom('lg'),
                
                IconColumn::make('is_published')
                    ->label('Status')
                    ->boolean()
                    ->trueIcon(Heroicon::OutlinedCheckCircle)
                    ->falseIcon(Heroicon::OutlinedXCircle)
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->toggleable(isToggledHiddenByDefault: false),
                
                TextColumn::make('published_at')
                    ->label('Published')
                    ->dateTime('M d, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->visibleFrom('lg'),
                
                TextColumn::make('created_at')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                TextColumn::make('updated_at')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->options([
                        'Web Development' => 'Web Development',
                        'Mobile Development' => 'Mobile Development',
                        'Data Science' => 'Data Science',
                        'Database Management' => 'Database Management',
                        'DevOps' => 'DevOps',
                        'Cloud Computing' => 'Cloud Computing',
                        'Programming' => 'Programming',
                        'Design' => 'Design',
                    ]),
                
                SelectFilter::make('level')
                    ->options([
                        'beginner' => 'Beginner',
                        'intermediate' => 'Intermediate',
                        'advanced' => 'Advanced',
                    ]),
                
                TernaryFilter::make('is_published')
                    ->label('Published')
                    ->placeholder('All courses')
                    ->trueLabel('Published only')
                    ->falseLabel('Unpublished only'),
                
                TrashedFilter::make(),
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
            ->defaultSort('created_at', 'desc');
    }
}
