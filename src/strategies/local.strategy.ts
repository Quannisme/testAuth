import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super();
  }
  async validate(name: string, password: string) {
    const user = await this.accountService.signIn(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
