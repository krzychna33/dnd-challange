import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app-config.type';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfig>) => {
        return { uri: config.get('DB_URL') };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
