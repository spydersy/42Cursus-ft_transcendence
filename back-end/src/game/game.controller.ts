import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameService } from './game.service';

@UseGuards(JwtAuthGuard)
@Controller('game')
export class GameController {
    constructor(private gameService: GameService,
        private prisma: PrismaService) {}

    @Get('MatchHistory/:user')
    async GetMatchHistory(@Req() req, @Res() res) {
        return this.gameService.GetMatchHistory(req.user.userId, req.params.user, res);
    }
}
