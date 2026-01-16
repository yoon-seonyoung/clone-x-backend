import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FeedsModule } from './feeds/feeds.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '34.158.219.205',
      port: 3306,
      username: 'admin',
      password: 'Asdf1234!',
      database: 'clone_x_db',
      autoLoadEntities: true,
      synchronize: false,
      ssl: {
        ca: fs.readFileSync('certs/server-ca.pem'),
        key: fs.readFileSync('certs/client-key.pem'),
        cert: fs.readFileSync('certs/client-cert.pem'),
      },
    }),
    UsersModule, FeedsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
