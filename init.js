import { Hero } from "./hero.js";
import { Enemy } from "./enemy.js";

class GameController {

    constructor() {
        this.isGamePlaying = false;
    }

    init() {
        this.score = 5;
        this.isGamePlaying = true;
        this.initHero()
        this.generateEnemy();

        this.scoreBoard = document.getElementsByClassName('score')[0];
        this.scoreBoard.textContent = this.score;
        this.gameFinishNoticeBoard = document.getElementsByClassName('game-finish')[0];

        this.addEventListenerForReplay();
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

    addEventListenerForReplay() {
        window.addEventListener('keydown', event => {
            if (event.keyCode === 13) {
                this.gameFinishNoticeBoard.style.display = "none";
                this.hero = null;
                this.isGamePlaying = false;
                this.init();
            }
        })
    }
}

const game = new GameController();
game.init();

