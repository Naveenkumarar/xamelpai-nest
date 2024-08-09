import { Module } from '@nestjs/common';
import { XamelpService } from './xamelp.service';
import { XamelpController } from './xamelp.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports : [PrismaModule],
  controllers: [XamelpController],
  providers: [XamelpService],
})
export class XamelpModule {}
