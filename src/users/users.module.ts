import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  //service에서 Entity 의존성주입 받아옴.
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({

      secret: 'random-secret-key-1234', //비밀키로 JWT토큰을 암호화 할 것.
      signOptions: { expiresIn: '600m' }
    })
  ],

  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
