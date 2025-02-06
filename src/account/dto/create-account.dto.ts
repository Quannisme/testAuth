import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Name Is Not Empty' })
  name: string;
  @IsEmpty({ message: 'Email' })
  email: string;
  @IsNotEmpty({ message: 'Password Is Not Empty' })
  password: string;
}
