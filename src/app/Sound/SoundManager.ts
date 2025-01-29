import { Howl } from 'howler';
import { CommonConfig } from '@/Common/CommonConfig';
import { Application } from 'pixi.js';

class SoundManager {
  private sounds: Record<string, Howl>;
  private isMuted: boolean= false;

  private constructor(private app: Application,private config: CommonConfig) {
    this.sounds = {
      background: new Howl({
        src: ['./audio/BG_Music.wav', './audio/BG_Music.m4a'],
        volume: 0.5,
        loop: true,
      }),
    };
    this.app.stage.on(CommonConfig.PLAY_BACKGROUND_SOUND, this.play, this);
  }

  public play(soundName: string): void {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    } else {
      console.error(`Sound "${soundName}" not found.`);
    }
  }

  public stop(soundName: string): void {
    if (this.sounds[soundName]) {
      this.sounds[soundName].stop();
    } else {
      console.error(`Sound "${soundName}" not found.`);
    }
  }

  public getSound(soundName: string): Howl | undefined {
    return this.sounds[soundName];
  }

  public muteAll(): void {
    this.isMuted = true;
    Howler.mute(true);
  }

  public unmuteAll(): void {
    this.isMuted = false;
    Howler.mute(false);
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }
}

export default SoundManager;
