import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getAllUser() {
        return this.userService.getAllUser();
    }

}