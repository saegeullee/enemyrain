export class Enemy {

    constructor(hero, game) {
        this.hero = hero;
        this.game = game;
        this.enemyTop = 0;
        this.enemyLeft = this.getEnemyPositionRandomly();
    }

    init() {
        this.createEnemy();
    }

    displayEnemyDead(enemy) {
        enemy.classList.add('enemy-dead');
    }

    createEnemy() {
        const body = document.getElementsByTagName('body')[0];
        const newEnemy = document.createElement('div');
        newEnemy.style.backgroundImage = `url("img/enemy.png")`;
        newEnemy.style.backgroundSize = `200px 100px`;
        newEnemy.style.backgroundRepeat = `no-repeat`;
        newEnemy.style.position = `absolute`;
        newEnemy.style.top = this.enemyTop;
        newEnemy.style.left = this.enemyLeft + "%";
        newEnemy.style.height = `100px`;
        newEnemy.style.width = '100px';
        // newEnemy.style.borderRight = '1px solid red';
        // newEnemy.style.borderLeft = '1px solid red';

        this.makeEnemyMoveDown(newEnemy);
        body.appendChild(newEnemy);
    }

    getEnemyPositionRandomly() {
        return Math.ceil(Math.random() * (80 - 12) + 12);
    }

    getEnemyIntervalTermRandomly() {
        return Math.ceil(Math.random() * (100 - 10) + 10);
    }

    makeEnemyMoveDown(enemy) {

        const enemyIntervalTerm = this.getEnemyIntervalTermRandomly();

        const interval = setInterval(() => {

            if (this.enemyTop === 90) {
                this.displayEnemyDead(enemy);
                clearInterval(interval);
                setTimeout(() => {
                    this.removeEnemyFromScreen(enemy);
                }, 1000);
            }

            this.enemyTop += 1;
            enemy.style.top = this.enemyTop + "%";

            if (this.identifyHeroDeath(this.enemyTop, this.enemyLeft)) {
                clearInterval(interval);
                this.removeEnemyFromScreen(enemy);
            }
        }, enemyIntervalTerm);
    }

    removeEnemyFromScreen(enemy) {
        enemy.style.display = "none";
        enemy.parentNode.removeChild(enemy);
    }

    identifyHeroDeath(enemyTop, enemyLeft) {
        if ((enemyTop <= 86 && enemyTop >= 74) &&
            (enemyLeft <= (this.hero.position + 7) &&
                enemyLeft >= (this.hero.position - 7))) {
            this.game.notifyHeroScoreDecrement();
            return true;
        }
    }
}