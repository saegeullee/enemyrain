export class Hero {

    constructor() {
        this.position = 40;
    }

    init() {
        const hero = document.getElementsByClassName('hero')[0];
        this.attachEventListeners(hero);
    }

    attachEventListeners(hero) {

        window.addEventListener('keydown', event => {
            if (event.keyCode === 37) {
                hero.style.left = (this.position - 1) + "%";
                this.position -= 1;
                hero.classList.remove('hero-right');
                hero.classList.add('hero-left');
            }
        });

        window.addEventListener('keydown', event => {
            if (event.keyCode === 39) {
                hero.style.left = (this.position + 1) + "%";
                this.position += 1;
                hero.classList.remove('hero-left');
                hero.classList.add('hero-right');
            }
        });

        window.addEventListener('keyup', () => {
            hero.classList.remove('hero-left');
            hero.classList.remove('hero-right');
        });
    }
}
