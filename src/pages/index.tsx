import cn from 'classnames';
import { Howl } from 'howler';
import Image from 'next/image';
import * as React from 'react';

import { fruits } from '@/data/fruits';

const sound = new Howl({
  src: ['/sound.wav'],
  html5: true,
  volume: 0.5,
});

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function HomePage() {
  const [fruitsData, setFruitsData] = React.useState(
    shuffle(
      [
        ...fruits.map((el) => ({
          ...el,
        })),
        ...fruits.map((el) => ({ ...el, clone: 2 })),
      ].map((fruit: any) => ({
        ...fruit,
        id: fruit.id + fruit.clone,
        isOpen: false,
        isRemoved: false,
      }))
    )
  );
  const [timer, setTimer] = React.useState(60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClickCard = (id: string) => {
    setFruitsData(
      fruitsData.map((fruit) =>
        fruit.id === id ? { ...fruit, isOpen: !fruit.isOpen } : fruit
      )
    );
    sound.play();
  };

  return (
    <main className='container mx-auto px-2 py-5 lg:px-52'>
      {/* timer */}
      <div className='flex justify-between'>
        <p className='my-3 font-mono text-2xl font-semibold'>{timer}</p>
        <p className='my-3 font-mono text-2xl font-semibold'>
          {fruitsData.filter((fruit) => fruit.isRemoved).length / 2} /{' '}
          {fruitsData.length / 2}
        </p>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        {fruitsData.map((el) => (
          <div
            key={el.id}
            className='rounded-xl bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[6px] shadow-lg '
          >
            <div
              className={cn([
                'item-center duration-400 flex cursor-pointer justify-center rounded-xl   bg-white text-white transition-all',
                el.isOpen ? 'origin-center' : 'blur-2xl',
              ])}
            >
              <Image
                src={el.image}
                width={200}
                height={200}
                alt={el.name}
                onClick={() => handleClickCard(el.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
