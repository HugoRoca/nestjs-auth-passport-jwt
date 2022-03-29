import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { User } from '../models/user.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
