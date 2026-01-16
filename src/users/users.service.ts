import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    //nestjs에서 typeOrm을 쓰기 위한 코드들 참조
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,  //TypeORM
        private jwtService: JwtService,             //jwt 라이브러리 사용하기 위함 의존성주입
    ) { }
    getAllUser() {
        return "getAllUser";
    }

    async login(loginDto: { email: string; password: string }) {
        if (!loginDto.email) {
            throw new HttpException(
                'Email must not be null or emtry',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!loginDto.password) {
            throw new HttpException(
                'Password must not be null or emtry',
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.usersRepository.findOne({
            //orm쓰고 있기 때문에 select문 쓰지 않고 findOne사용
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (user && !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { id: user.id, email: user.email };

        //JWT토큰 만들어 돌려주기
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            access_token: this.jwtService.sign(payload)
        };
    }

    async createUser(user: { name: string; email: string; password: string }) {

        //email 정보 없으면 에러 던지기
        if (!user.email) {
            throw new HttpException(
                'Email must not be null or emtry',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!user.name) {
            throw new HttpException(
                'Name must not be null or emtry',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (!user.password) {
            throw new HttpException(
                'Password must not be null or emtry',
                HttpStatus.BAD_REQUEST,
            );
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        //암호화 숫자 :암호화 강도 10: 중간기본값

        const newUser = {
            name: user.name,
            email: user.email,
            password: hashedPassword,
        };

        return this.usersRepository.save(newUser);
    }
}
