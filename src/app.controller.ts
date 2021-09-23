import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  BadRequestException,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

interface catInterface {
  name: string;
  breed: string;
  age: number;
}

@Controller('/cat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all')
  getAllCats(): catInterface[] {
    return this.appService.getCats();
  }

  @Get('/:id')
  getCatByID(@Req() req: Request, @Param('id') id: number): catInterface {
    const cat = this.appService.getOneCat(id);
    if (cat === undefined) {
      throw new NotFoundException('Cat Not Found');
    }
    return cat;
  }

  @Post('/')
  create(
    @Body('name') name: string,
    @Body('breed') breed: string,
    @Body('age') age: number,
  ): catInterface {
    if (!name) {
      throw new BadRequestException('Name not provided');
    }
    if (!breed) {
      throw new BadRequestException('Breed not provided');
    }
    if (!age) {
      throw new BadRequestException('Age not provided');
    }
    return this.appService.createCat({ breed, age, name });
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('breed') breed: string,
    @Body('age') age: number,
  ): any {
    return this.appService.updateCat({ id, name, breed, age });
  }

  @Delete('/:id')
  delete(@Param('id') id: number): any {
    return this.appService.deleteCat(id);
  }
}
