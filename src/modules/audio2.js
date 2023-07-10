

class audio {

    constructor() {
        this.ctx = new AudioContext();
        this.sfx = []
    }  

    getFile = async (filePath) => {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }

    loadFile = async (filePath) => {
        const track = await getFile(filePath);
        return track;
    }

    playTrack(audioBuffer) {
        const trackSource = audioCtx.createBufferSource();
        trackSource.buffer = audioBuffer;
        trackSource.connect(audioCtx.destination);
      
        if (offset === 0) {
          trackSource.start();
          offset = audioCtx.currentTime;
        } else {
          trackSource.start(0, audioCtx.currentTime - offset);
        }
      
        return trackSource;

    init = () => {

    }
}