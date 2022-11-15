import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchService } from './search.service';

@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {

    constructor(private searchService: SearchService) {}

    @Get(':dest')
    async FriendsSearch(@Req() req, @Query() query, @Res() res) {
        if (query['input'])
        {
            switch (req.params.dest) {
                case 'friends':
                    return this.searchService.FriendsSearch(req.user.userId, query['input'], res);
                case 'allUsers':
                    return this.searchService.AllUsersSearch(query['input'], res);
                default:
                    return res.status(HttpStatus.BAD_REQUEST).send({"message": "Bad Request00"});
            }
        }
        return res.status(HttpStatus.BAD_REQUEST).send({'message': 'Bad Request01'});
    }
}
