import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/services/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    console.log(createUserInput);
    return this.prisma.createUser(createUserInput);
  }
  findOne(id: number) {
    return this.prisma.findUser({ where: { id } });
  }
}
