import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sign-up')
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: Request,
    @Res() res: Response,
  ) {
    try {
      const temp = await this.accountService.create(createAccountDto);
      return res.status(200).json({ message: 'success', data: temp });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Body() createAccountDto: CreateAccountDto,
    @Request() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { name, password } = createAccountDto;
      const temp = await this.accountService.signIn(name, password);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
