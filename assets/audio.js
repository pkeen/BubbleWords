// Audio stored here

const sfx = {
    tick: new Howl({
        src: './BubbelWords/assets/tick-1.wav',
        volume: 0.2
    }),
    pop1: new Howl({
        src: './pop-1.wav',
        volume: 0.7
    }),
    pop2: new Howl({
        src: './assets/pop-2.wav',
        volume: 0.9
    }),
    music: new Howl({
        src: './assets/music.wav',
        volume: 0.3
    }),
    win: new Howl({
        src: './assets/win.wav',
        volume: 0.4
    }),
    loss: new Howl({
        src: './assets/loss.wav',
        volume: 0.4
    }),
    welcome: new Howl({
        src: './assets/welcome.wav'
    }),

}

export {sfx};