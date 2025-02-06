import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-ts';
import { TokenPayload } from 'src/types/type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  private salt = 10;
  constructor(
    @InjectRepository(Account)
    private accountResponse: Repository<Account>,
    private jwtService: JwtService,
  ) {}
  private async verifyPlainContentWithHashedContent(password, passwordHash) {
    const check = await bcrypt.compare(password, passwordHash);
    if (!check) {
      throw new BadRequestException();
    }
  }
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const check = createAccountDto.name;
    const checkName = await this.accountResponse.findOneBy({ name: check });
    if (checkName) {
      throw new Error(`Account ${check} already exists`);
    }
    const hashPassword = await bcrypt.hash(
      createAccountDto.password,
      this.salt,
    );
    console.log('hash', hashPassword);
    const account = this.accountResponse.create({
      name: createAccountDto.name,
      password: hashPassword,
    });
    const user = await this.accountResponse.save(account);
    return user;
  }

  async signIn(name: string, password: string): Promise<Account> {
    try {
      const findAccount = await this.accountResponse.findOneBy({ name: name });
      if (!findAccount) {
        throw new Error('Account not found');
      }
      // await this.verifyPlainContentWithHashedContent(
      //   password,
      //   findAccount.password,
      // );
      const user = { name: name, password: password };
      const token = await this.generateToken(user);
      const refreshToken = await this.generateRefreshToken(user);
      return findAccount;
    } catch (error) {
      throw new BadRequestException(`Invalid password for account ${name}`);
    }
  }
  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async generateToken(payload: TokenPayload) {
    const temp = await this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '300s',
    });
    return temp;
  }

  async generateRefreshToken(payload: TokenPayload) {
    const temp = await this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY_REFRESHTOKEN,
      expiresIn: '1d',
    });
    return temp;
  }
}
