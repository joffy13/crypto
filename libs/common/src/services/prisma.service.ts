import { PrismaClient } from '@prisma/client';
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from './jwt.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async onModuleInit() {
    Logger.log('✅ ️Prisma connection established');
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
      await this.$disconnect();

      Logger.log('❌ App destroyed. Prisma connection closed');
    });
  }

  async createUser(args: any) {
    console.log(args);
    const { username, ...userData } = args;
    const token = this.jwtService.sign(userData);
    console.log(username);
    const { hashed_info, ...user } = await this.user.create({
      data: {
        username,
        hashed_info: token,
      },
    });
    const verifiedUser = this.jwtService.verify(hashed_info);
    return { ...user, ...verifiedUser };
  }

  async findUser(args: any) {
    const { hashed_info, ...user } = await this.user.findUnique(args);
    const verifiedUser = this.jwtService.verify(hashed_info);

    return { ...user, ...verifiedUser };
  }
}
