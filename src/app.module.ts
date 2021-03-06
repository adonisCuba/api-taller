import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { TallerModule } from './taller/taller.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TallerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
