/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   myscript.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abelarif <abelarif@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2022/05/21 08:48:20 by abelarif          #+#    #+#             */
/*   Updated: 2022/05/21 14:23:15 by abelarif         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var wallOffset = 16;
var canvasOrigin = 15;

class Canvas {
    constructor (width, height, canvasId) {
        this.width = width;
        this.height = height;
        this.pongTable = canvasId.getContext("2d");
        this.background = "#F05454";
        this.primaryColor = "#30475E";

        this.setBackground(canvasId);
        this.drawMiddleLine();
        this.drawBorders();
        this.drawScores(1, 7);
    }

    setBackground(canvasId) {
        this.pongTable.fillStyle = this.background;
        this.pongTable.fillRect(0, 0, canvasId.width, canvasId.height)
    }

    drawBorders () {
        this.pongTable.beginPath();
        this.pongTable.lineWidth = wallOffset;
        this.pongTable.strokeStyle = this.primaryColor;
        this.pongTable.rect(canvasOrigin, canvasOrigin, this.width - canvasOrigin * 2, this.height - canvasOrigin * 2);
        this.pongTable.stroke();
    }

    drawScores (player1, player2) {

        this.pongTable.font = "30px Verdana";

        // this.pongTable.fillStyle = "#346751";
        this.pongTable.fillText(player1, (this.width / 2) + canvasOrigin - 30 - 60, 55);
        this.pongTable.fillText(player2, (this.width / 2) + canvasOrigin - 30 + 60, 55);
    }

    drawMiddleLine () {
        var xPosition = (this.width / 2) - (wallOffset / 2);
        var yPosition = canvasOrigin ;

        this.pongTable.fillStyle = this.primaryColor;
        while (yPosition < this.height) {
            if (yPosition +  (wallOffset * 1.9) >= this.height - canvasOrigin) {
                this.pongTable.fillRect(xPosition, yPosition, wallOffset,
                    this.height - yPosition - canvasOrigin);
                break ;
            }
            else {
                this.pongTable.fillRect(xPosition, yPosition, wallOffset, wallOffset * 1.9);
                yPosition += wallOffset * 1.9;
                yPosition += 9;
            }
        }
    }
}

class Player {
    constructor (id, isBot, canvas)
    {
        this.id = id;
        this.playerBar = 30;
        this.position = thi.height + ;
        this.isBot = isBot;
    }
}

class Game {
    constructor () {
        this.canvasId = document.getElementById("game-canvas");

        this.height = this.canvasId.height;
        this.width = this.canvasId.width;

        this.canvas = new Canvas(this.width, this.height, this.canvasId);
        this.player1 = new Player("LEFT", false, this.canvas);
        this.player2 = new Player("RIGHT", true, this.canvas);
    }

    gameLoop() {
    }
}

var game = new Game();
requestAnimationFrame(game.gameLoop);