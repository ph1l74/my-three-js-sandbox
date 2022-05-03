const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.4;


class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
}
);

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

let lastKey;

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()


    player.velocity.x = 0;

    if (keys.a.pressed) {
        player.velocity.x = -2
    }
    else if (keys.d.pressed) {
        player.velocity.x = 2
    }

    if (keys.w.pressed) {
        player.velocity.y = -10
    }

    else if (keys.s.pressed) {
        player.velocity.y += 1
    }

}

animate();


window.addEventListener('keydown', (event) => {
    lastKey = event.key;
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            break
        case "a":
            keys.a.pressed = true;
            break
        case "w":
            keys.w.pressed = true;
            break
        case "s":
            keys.s.pressed = true;
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break
        case "a":
            keys.a.pressed = false;
            break
        case "w":
            keys.w.pressed = false;
            break
        case "s":
            keys.s.pressed = false;
            break
    }
})
