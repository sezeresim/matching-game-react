import { Howl } from 'howler';

const cardVoice = (voiceLevel: number) => {
  return new Howl({
    src: ['/sound.wav'],
    html5: true,
    volume: 0.1 * voiceLevel,
  });
};

export { cardVoice };
