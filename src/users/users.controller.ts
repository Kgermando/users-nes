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
  async all(@Query('page') page = 1){
    return await this.usersService.paginate(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User[]> {
    const password = await bcrypt.hash('1234', 12);
    const {roleId, ...data} = body
    return this.usersService.create({
      ...data,
      password,
      role: {id: roleId}
    });
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.usersService.findOne({ id }, ['role']);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const {roleId, ...data} = body
    await this.usersService.update(id, {
      ...data,
      role: {id: roleId}
    });

    return this.usersService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
