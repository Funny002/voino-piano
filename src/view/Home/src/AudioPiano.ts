export interface AudioPianoOptions {
  duration: number;
  linearRamp: number;
  exponentialRamp: number;
  type: 'sine' | 'square' | 'triangle' | 'sawtooth';
}

export class AudioPiano {
  private options: AudioPianoOptions;
  private readonly audio: AudioContext;

  constructor(options?: Partial<AudioPianoOptions>) {
    this.options = this.handleOptions(options || {});
    this.audio = new (AudioContext || (window as any).webkitAudioContext)();
  }

  private handleOptions(options: Partial<AudioPianoOptions>) {
    const { type = 'sine', duration = 1, linearRamp = 1, exponentialRamp = 0.01 } = options || {};
    return { type, duration, linearRamp, exponentialRamp };
  }

  public setOptions(options: Partial<AudioPianoOptions>) {
    this.options = this.handleOptions(options || {});
  }

  public sendSound(freq: number) {
    const { type, duration, linearRamp, exponentialRamp } = this.options;
    const { currentTime, destination } = this.audio;
    const os = this.audio.createOscillator();
    const gain = this.audio.createGain();
    gain.connect(destination);
    os.connect(gain);
    os.type = type;
    gain.gain.value = 0;
    os.frequency.value = freq;
    os.start(currentTime);
    gain.gain.linearRampToValueAtTime(linearRamp, currentTime + exponentialRamp);
    os.stop(currentTime + duration);
    gain.gain.exponentialRampToValueAtTime(exponentialRamp, currentTime + duration);
  }
}

export default AudioPiano;
