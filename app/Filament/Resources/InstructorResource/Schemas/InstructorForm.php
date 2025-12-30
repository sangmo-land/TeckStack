<?php

namespace App\Filament\Resources\InstructorResource\Schemas;

use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class InstructorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Association')
                    ->description('Link this instructor profile to a user account')
                    ->schema([
                        Select::make('user_id')
                            ->label('User')
                            ->relationship('user', 'name')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->helperText('Select the user account for this instructor'),
                    ]),

                Section::make('Basic Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g., Michael Chen'),
                        TextInput::make('role_title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g., Database Expert, Senior Developer'),
                        FileUpload::make('image')
                            ->label('Profile Image')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('instructor-images')
                            ->deletable()
                            ->maxSize(2048)
                            ->helperText('Upload a profile image (max 2MB). Drag and drop supported.')
                            ->columnSpanFull(),
                        TextInput::make('gradient')
                            ->maxLength(255)
                            ->placeholder('e.g., from-blue-500 to-cyan-600')
                            ->helperText('Tailwind gradient classes for avatar background'),
                    ])
                    ->columns(2),

                Section::make('Professional Details')
                    ->schema([
                        TextInput::make('years_experience')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->label('Years of Experience'),
                        TextInput::make('rating')
                            ->numeric()
                            ->step(0.1)
                            ->minValue(0)
                            ->maxValue(5)
                            ->default(0)
                            ->placeholder('e.g., 4.8'),
                    ])
                    ->columns(2),

                Section::make('Bio & Description')
                    ->schema([
                        Textarea::make('bio')
                            ->rows(4)
                            ->maxLength(1000)
                            ->placeholder('Tell us about this instructor...')
                            ->helperText('Professional biography and background'),
                    ]),

                Section::make('Skills & Expertise')
                    ->schema([
                        TagsInput::make('expertise')
                            ->separator(',')
                            ->placeholder('Add expertise areas (e.g., Database Design, SQL, Oracle)')
                            ->helperText('Press Enter or comma to add each skill'),
                        TagsInput::make('certifications')
                            ->separator(',')
                            ->placeholder('Add certifications (e.g., Oracle Certified Associate)')
                            ->helperText('List professional certifications'),
                        TagsInput::make('companies')
                            ->separator(',')
                            ->placeholder('Add companies (e.g., Google, Amazon, Microsoft)')
                            ->helperText('Previous employers and companies'),
                    ]),
            ]);
    }
}
