<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InstructorResource\Pages;
use App\Models\Instructor;
use App\Filament\Resources\InstructorResource\Schemas\InstructorForm;
use App\Filament\Resources\InstructorResource\Tables\InstructorTable;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class InstructorResource extends Resource
{
    protected static ?string $model = Instructor::class;

    protected static BackedEnum|string|null $navigationIcon = Heroicon::OutlinedBriefcase;

    protected static UnitEnum|string|null $navigationGroup = 'Users';

    public static function form(Schema $schema): Schema
    {
        return InstructorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InstructorTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInstructors::route('/'),
            'create' => Pages\CreateInstructor::route('/create'),
            'edit' => Pages\EditInstructor::route('/{record}/edit'),
        ];
    }
}
