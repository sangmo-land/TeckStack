<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Course Information')
                    ->schema([
                        Select::make('instructor_id')
                            ->label('Instructor')
                            ->relationship('instructor', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn ($state, Set $set) => $set('slug', Str::slug($state))),
                        
                        TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        
                        Textarea::make('description')
                            ->required()
                            ->maxLength(500)
                            ->rows(3)
                            ->columnSpanFull(),
                        
                        RichEditor::make('overview')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                                'h2',
                                'h3',
                            ]),
                    ])->columns(2),
                
                Section::make('Course Details')
                    ->schema([
                        Select::make('category')
                            ->options([
                                'Web Development' => 'Web Development',
                                'Mobile Development' => 'Mobile Development',
                                'Data Science' => 'Data Science',
                                'Database Management' => 'Database Management',
                                'DevOps' => 'DevOps',
                                'Cloud Computing' => 'Cloud Computing',
                                'Programming' => 'Programming',
                                'Design' => 'Design',
                            ])
                            ->required()
                            ->searchable(),
                        
                        Select::make('level')
                            ->options([
                                'beginner' => 'Beginner',
                                'intermediate' => 'Intermediate',
                                'advanced' => 'Advanced',
                            ])
                            ->required()
                            ->default('beginner'),
                        
                        TextInput::make('price')
                            ->numeric()
                            ->prefix('$')
                            ->required()
                            ->minValue(0)
                            ->maxValue(999.99)
                            ->step(0.01),
                        
                        TextInput::make('language')
                            ->default('English')
                            ->required(),
                        
                        FileUpload::make('thumbnail_url')
                            ->label('Thumbnail Image')
                            ->image()
                            ->imageEditor()
                            ->maxSize(2048)
                            ->disk('public')
                            ->directory('course-thumbnails')
                            ->deletable()
                            ->columnSpanFull()
                            ->helperText('Upload a thumbnail image (max 2MB). Drag and drop supported.'),
                        
                        FileUpload::make('cover_image')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('course-covers')
                            ->deletable()
                            ->columnSpanFull(),
                    ])->columns(2),
                
                Section::make('Additional Information')
                    ->schema([
                        Textarea::make('learning_outcomes')
                            ->label('What students will learn')
                            ->rows(4)
                            ->columnSpanFull(),
                        
                        Textarea::make('requirements')
                            ->label('Course requirements')
                            ->rows(4)
                            ->columnSpanFull(),
                    ]),
                
                Section::make('Publishing')
                    ->schema([
                        Toggle::make('is_published')
                            ->label('Publish course')
                            ->default(false)
                            ->live(),
                        
                        DateTimePicker::make('published_at')
                            ->label('Publication date')
                            ->visible(fn (Get $get) => $get('is_published'))
                            ->default(now()),
                    ])->columns(2),
            ]);
    }
}
