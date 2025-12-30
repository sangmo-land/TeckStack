<?php

namespace App\Filament\Resources\Chapters\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ChapterForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Information')
                    ->schema([
                        Select::make('course_id')
                            ->relationship('course', 'title')
                            ->searchable()
                            ->preload()
                            ->required(),
                        
                        Select::make('parent_id')
                            ->label('Parent Chapter')
                            ->relationship('parent', 'title')
                            ->searchable()
                            ->preload()
                            ->hint('Leave empty for main chapters'),
                        
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        
                        TextInput::make('order')
                            ->label('Display Order')
                            ->numeric()
                            ->minValue(0)
                            ->helperText('Leave empty to auto-assign next position'),
                    ])->columns(2),
                
                Section::make('Content')
                    ->description('Create rich, formatted content with headings, lists, bold, italic, links, and more')
                    ->schema([
                        Textarea::make('description')
                            ->label('Short Description')
                            ->placeholder('A brief summary of what this chapter covers...')
                            ->rows(3)
                            ->columnSpanFull()
                            ->helperText('This will appear as a preview in course listings'),
                        
                        RichEditor::make('content')
                            ->label('Chapter Content')
                            ->placeholder('Write your comprehensive chapter content here...')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'strike',
                                'underline',
                                'link',
                                'codeBlock',
                                'bulletList',
                                'orderedList',
                                'blockquote',
                            ])
                            ->extraInputAttributes(['style' => 'min-height: 500px;'])
                            ->columnSpanFull()
                            ->helperText('Add formatting with bold, italic, lists, code blocks, and links to enhance readability.'),
                    ]),
                
                Section::make('Media & Duration')
                    ->schema([
                        FileUpload::make('video_url')
                            ->label('Video')
                            ->directory('videos/chapters')
                            ->disk('public')
                            ->acceptedFileTypes([
                                'video/mp4',
                                'video/webm',
                                'video/ogg',
                                'video/quicktime',
                            ])
                            ->maxSize(102400) // 100MB
                            ->preserveFilenames()
                            ->helperText('Upload or drag & drop a video file, or paste a direct video URL.')
                            ->columnSpanFull(),
                        
                        TextInput::make('duration_minutes')
                            ->label('Duration (minutes)')
                            ->numeric()
                            ->minValue(0)
                            ->suffix(' min'),
                    ])->columns(2),
                
                Section::make('Status')
                    ->schema([
                        Toggle::make('is_published')
                            ->label('Published')
                            ->default(true),
                        
                        Toggle::make('is_free')
                            ->label('Free Preview')
                            ->default(false)
                            ->helperText('Allow free preview of this chapter'),
                    ])->columns(2),
            ]);
    }
}
