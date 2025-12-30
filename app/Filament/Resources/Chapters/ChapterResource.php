<?php

namespace App\Filament\Resources\Chapters;

use App\Filament\Resources\Chapters\Pages\CreateChapter;
use App\Filament\Resources\Chapters\Pages\EditChapter;
use App\Filament\Resources\Chapters\Pages\ListChapters;
use App\Filament\Resources\Chapters\Schemas\ChapterForm;
use App\Filament\Resources\Chapters\Tables\ChaptersTable;
use App\Filament\Resources\Chapters\RelationManagers\CodeSnippetsRelationManager;
use App\Models\Chapter;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ChapterResource extends Resource
{
    protected static ?string $model = Chapter::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBookOpen;
    
    protected static ?string $navigationLabel = 'Chapters';
    
    protected static ?string $modelLabel = 'Chapter';
    
    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return ChapterForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ChaptersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            CodeSnippetsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListChapters::route('/'),
            'create' => CreateChapter::route('/create'),
            'edit' => EditChapter::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery();
    }
}
