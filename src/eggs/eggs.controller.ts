import { EggsService } from './eggs.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { CreateEggDto } from './dto/create-egg.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { MemberRole } from 'src/members/entities/member-role.enum';
import { UpdateEggDto } from './dto/update-egg.dto';

@Controller('eggs')
export class EggsController {
  constructor(private readonly eggsService: EggsService) {}

  @Get()
  @HttpCode(200)
  @Roles(MemberRole.ADMIN)
  async getAllEggs() {
    const result = await this.eggsService.findAll();
    return {
      status: 200,
      data: { eggs: result },
    };
  }

  @Get(':egg_id')
  @HttpCode(200)
  @Roles(MemberRole.ADMIN)
  async getOneEggs(@Param('egg_id') egg_id: string) {
    const result = await this.eggsService.findOne(egg_id);
    return {
      status: 200,
      data: { egg: result },
    };
  }

  @Post()
  @HttpCode(201)
  @Roles(MemberRole.ADMIN)
  async createEgg(@Body() createEggData: CreateEggDto) {
    const result = await this.eggsService.create(createEggData);
    return {
      status: 201,
      data: { egg_id: result.egg_id },
    };
  }

  @Patch(':egg_id')
  @HttpCode(200)
  @Roles(MemberRole.ADMIN)
  async updateEgg(
    @Param('egg_id') egg_id: string,
    @Body() updateEggData: UpdateEggDto,
  ) {
    const result = await this.eggsService.update(egg_id, updateEggData);
    return {
      status: 200,
      data: { egg: result },
    };
  }

  @Delete(':egg_id')
  @HttpCode(204)
  @Roles(MemberRole.ADMIN)
  async deleteEgg(@Param('egg_id') egg_id: string) {
    await this.eggsService.delete(egg_id);
    return {
      status: 204,
      data: null,
    };
  }
}
