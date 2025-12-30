<?php

namespace App\Filament\Resources\Chapters\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class CodeSnippetsRelationManager extends RelationManager
{
    protected static string $relationship = 'codeSnippets';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('description')
                    ->maxLength(500),
                Select::make('language')
                    ->options([
                        'mysql' => 'MySQL',
                        'sql' => 'SQL',
                        'php' => 'PHP',
                        'javascript' => 'JavaScript',
                        'python' => 'Python',
                        'java' => 'Java',
                        'css' => 'CSS',
                        'html' => 'HTML',
                        'bash' => 'Bash',
                        'shell' => 'Shell',
                        'plsql' => 'PL/SQL',
                        'tsql' => 'T-SQL',
                    ])
                    ->searchable()
                    ->required(),
                TextInput::make('order')
                    ->numeric()
                    ->minValue(0)
                    ->label('Display Order')
                    ->helperText('Leave empty to auto-assign next position'),
                Toggle::make('is_executable')
                    ->label('Executable')
                    ->default(false),
                MarkdownEditor::make('code')
                    ->label('Code')
                    ->required()
                    ->columnSpanFull()
                    ->helperText('Use triple backticks for fenced code blocks if needed.'),
            ])
            ->columns(2);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('display_number')
                    ->label('#')
                    ->sortable(false),
                TextColumn::make('title')
                    ->searchable()
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title),
                TextColumn::make('language')
                    ->badge()
                    ->sortable(),
                TextColumn::make('order')
                    ->label('Order')
                    ->sortable(),
                ToggleColumn::make('is_executable')
                    ->label('Executable'),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ])
            ->defaultSort('order');
    }
}
