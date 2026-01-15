import { Controller, Get } from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Controller('feeds')
export class FeedsController {
    constructor(
        private readonly feedsService: FeedsService
    ) { }
    //feeds 요청 오는 곳

    @Get()
    getFeeds() {
        return this.feedsService.getFeeds();
    }
}
