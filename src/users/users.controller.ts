import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from './models/users.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return await this.usersService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User[]> {
    const password = await bcrypt.hash('1234', 12);
    return this.usersService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.usersService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    await this.usersService.update(id, body);

    return this.usersService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
