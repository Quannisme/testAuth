import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), PassportModule],
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy],
})
export class AccountModule {}
