import { Module } from '@nestjs/common';
import { CharactersModule } from './modules/characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './libs/database/database.module';

@Module({
  imports: [
    CharactersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
