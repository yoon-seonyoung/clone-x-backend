import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/user.entity';
import { Feed } from './feed.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed, User]),
    //forFeature => 이 모듈 안에서 Feed와 User 엔티티용 Repository객체를 DI컨테이너에 등록
    //          => @InjectRepository(Feed)를 사용해서 서비스에서 주입받을 수 있음

    JwtModule.register({

      secret: 'random-secret-key-1234', //비밀키로 JWT토큰을 암호화 할 것.
      signOptions: { expiresIn: '600m' }
    }),

  ],
  controllers: [FeedsController],
  providers: [FeedsService]
})
export class FeedsModule { }
