import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }

    @Post('login')
    login(@Body() loginDto: { name: string; email: string; password: string }) {
        return this.userService.login(loginDto);
    }

    @Post()
    createUser(@Body() user: { name: string; email: string; password: string }) {
        return this.userService.createUser(user);
    } s

}