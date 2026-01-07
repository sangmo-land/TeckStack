<?php

namespace App\Filament\Resources\UserResource\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Details')
                    ->schema([
                        FileUpload::make('avatar_url')
                            ->label('Avatar')
->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                            null,
                            '16:9',
                            '4:3',
                            '1:1',
                            ])
                            ->directory('avatars')
                            ->disk('public')
->deletable(true)
                            ->downloadable(true)
                            ->preserveFilenames()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
                            ->maxSize(5120)
                            ->helperText('Search, paste URL, or drag & drop an avatar image (max 5MB).')
                            ->columnSpanFull(),

                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('password')
                            ->password()
->revealable()
                            ->label('Password')
                            ->required(fn ($record) => $record === null)
                            ->dehydrated(fn ($state) => filled($state))
                            ->dehydrateStateUsing(fn ($state) => bcrypt($state))
                            ->maxLength(255),
                        Select::make('role')
                            ->required()
                            ->options([
                                'admin' => 'Admin',
                                'instructor' => 'Instructor',
                                'student' => 'Student',
                            ]),
                        Toggle::make('is_email_verified')
                            ->label('Email Verified')
                            ->default(false),
                    ])
                    ->columns(2),
            ]);
    }
}
