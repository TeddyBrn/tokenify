'use client';
import { GradualSpacing } from './gradual-spacing';
import { FadeText } from './fade-text';

export function WelcomeSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <GradualSpacing
        className="font-display text-center text-4xl font-bold -tracking-widest mb-8 text-[#39D66E] dark:text-white md:text-8xl md:leading-[5rem]"
        text="What is Tokenify ?"
      />
      <FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 1 } }
        }}
        text="Find an artist"
      />
      <FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 2 } }
        }}
        text="Their best songs"
      />
      <FadeText
        className="text-6xl font-bold text-[#BABABA] dark:text-white"
        direction="up"
        framerProps={{
          show: { transition: { delay: 3 } }
        }}
        text="Their albums"
      />
    </div>
  );
}
