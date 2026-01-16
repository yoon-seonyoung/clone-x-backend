import { Injectable } from '@nestjs/common';
import { CreatedFeedDto } from './dto/create-feed.dto';
import { privateDecrypt } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { User } from '../users/user.entity';

@Injectable()
export class FeedsService {
    constructor(
        @InjectRepository(Feed)
        private feedRepository: Repository<Feed>,
        //feedRepository는 typeORM의 Repository객체
        //Repository는 DB테이블(Feed 엔티티)에 접근해서 CRUD 가능
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getFeeds() {
        return this.feedRepository.find({ order: { created_at: 'DESC' } });
    }

    async createFeed(feed: CreatedFeedDto, userId: number) {
        const user = await this.userRepository.findOne(
            {
                where: { id: userId }
            });
        if (!user) {
            throw new Error('User not found')
        }
        const newFeed = this.feedRepository.create({
            content: feed.content,
            user: user,
        });

        return await this.feedRepository.save(newFeed);
    }
    async deleteFeed(id: number) {
        return await this.feedRepository.delete(id);
    }

    async getFeedsWithUser() {
        const feeds = await this.feedRepository.find({
            relations: ['user'],
            order: { created_at: 'DESC' },
        });

        const feedsWithUserInfo = feeds.map((feed) => ({
            ...feed,
            user: {
                id: feed.user.id,
                name: feed.user.name,
            },
        }));
        return feedsWithUserInfo;
    }
}
