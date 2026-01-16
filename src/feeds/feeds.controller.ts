import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { CreatedFeedDto } from './dto/create-feed.dto';
import { request } from 'http';

@UseGuards(JwtAuthGuard)
@Controller('feeds')
export class FeedsController {
    constructor(
        private readonly feedsService: FeedsService
    ) { }
    //feeds 요청 오는 곳

    @Get()
    getFeeds() {
        return this.feedsService.getFeedsWithUser();
    }

    @Post()
    createdFeed(
        @Body() feed: CreatedFeedDto,
        @Req() request: Request & { user: { id: number } },
    ) {
        const userId = request.user.id;
        return this.feedsService.createFeed({ ...feed }, userId);
    }

    @Delete(':id')
    deleteFeed(@Param('id') id: number) {
        return this.feedsService.deleteFeed(id);
    }
}

