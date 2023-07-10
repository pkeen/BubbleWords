

// function initAudio() {
//     var howler = document.createElement('script');  
//     howler.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js');
//     document.head.appendChild(howelerScript);
// }

const sfx = {
    tick: new Howl({
        src: '../../assets/tick-1.wav',
        volume: 0.2
    }),
    pop1: new Howl({
        src: '../../assets/pop-1.wav',
        volume: 0.7
    }),
    pop2: new Howl({
        src: '../../assets/pop-2.wav',
        volume: 0.9
    }),
    music: new Howl({
        src: '../../assets/music.wav',
        volume: 0.3
    }),
    win: new Howl({
        src: '../../assets/win.wav',
        volume: 0.4
    }),
    loss: new Howl({
        src: '../../assets/loss.wav',
        volume: 0.4
    }),
    welcome: new Howl({
        src: '../../assets/welcome.wav'
    }),
    
}

export {sfx};

// export {initAudio, sfx}


// const sfx = {
//     tick: new Howl({
//         src: ["../../assets/clock-tick.wav"],

//     })
// // }

// export {sfx};

// const audioCtx = new AudioContext();

// const audio = {

//     tick: new Audio('../../assets.clock-tick.wav'),






    
//     initAudioCtx: () => {
//         const audioContext = new AudioContext();
//         console.log('Audio Context iniialized');
//     }
    
// }
// let audioContext;

// const initAudioCtx = () => {
//     audioContext = new AudioContext();
//     console.log('Audio Context iniialized');
// }

// const filePath;

// async function getFiles() {
//     const response = await fetch(filePath);
//     const arrayBuffer = await response.arrayBuffer();
//     const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
// }

// const audio = new Audio("../../assets/clock-tick.wav");

// const source = audioContext.createMediaElementSource(audio);

// source.connect(audioContext.destination);

// export {audioCtx, audio};