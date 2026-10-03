import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class RegisterDto {
  nama: string;
  email: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrasi wisatawan baru' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.nama, dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login dan menerima token JWT' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}