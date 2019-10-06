import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";

class GameController {

    constructor() {
        this.isGamePlaying = false;
    }

    init() {
        this.score = 5;
        this.isGamePlaying = true;
        this.initHero();
        this.generateEnemy();

        this.scoreBoard = document.getElementsByClassName('score')[0];
        this.scoreBoard.textContent = this.score;
        this.gameFinishNoticeBoard = document.getElementsByClassName('game-finish')[0];
    }

    initHero() {
        this.hero = new Hero();
        this.hero.init();
    }

    generateEnemy() {
        const interval = setInterval(() => {
            if (this.isGamePlaying) {
                const enemy = new Enemy(this.hero, this);
                enemy.init();
            } else {
                clearInterval(interval);
            }
        }, 500);
    }

    notifyHeroScoreDecrement() {
        if (this.isGamePlaying) {
            this.score -= 1;
            this.scoreBoard.textContent = this.score;

            if (this.score === 0) {
                this.gameFinishNoticeBoard.style.display = "block";
                this.isGamePlaying = false;
            }
        }
    }
}

const game = new GameController();
game.init();

