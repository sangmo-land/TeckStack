<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Pages\Login as AuthLogin;
use Filament\Forms\Components\Component;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Illuminate\Validation\ValidationException;

class Login extends AuthLogin
{
    protected string $view = 'filament.pages.auth.login';

public function getLayout(): string
    {
        return 'filament.pages.auth.login_layout';
    }
    public function authenticate(): ?LoginResponse
    {
        $data = $this->form->getState();

        // Check if the email is the main admin email
        if (strtolower($data['email']) !== 'mokomnelvis@yahoo.com') {
            Notification::make()
                ->danger()
                ->title('Access Denied')
                ->body('You are not the main admin.')
                ->persistent()
                ->send();
            
            $this->form->fill();
            
            return null;
        }

        // Proceed with normal authentication
        return parent::authenticate();
    }
}
