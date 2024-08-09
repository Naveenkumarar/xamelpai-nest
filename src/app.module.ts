import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { XamelpModule } from './xamelp/xamelp.module';

@Module({
  imports: [PrismaModule, XamelpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
