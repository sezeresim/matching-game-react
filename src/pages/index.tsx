import cn from 'classnames';
import Image from 'next/image';
import * as React from 'react';

import { fruits } from '@/data/fruits';

export default function HomePage() {
  const [fruitsData, setFruitsData] = React.useState(
    fruits.map((fruit) => ({
      ...fruit,
      isOpen: false,
    }))
  );

  const handleClickCard = (id: string) => {
    setFruitsData(
      fruitsData.map((fruit) =>
        fruit.id === id ? { ...fruit, isOpen: !fruit.isOpen } : fruit
      )
    );
  };

  return (
    <main className='container mx-auto py-5 '>
      <div className='grid grid-cols-3 gap-2'>
        {fruitsData.map((el) => (
          <div
            key={el.id}
            className='rounded-xl bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] p-[6px] shadow-lg '
          >
            <div
              className={cn([
                'item-center duration-400 flex cursor-pointer justify-center  rounded-lg bg-white text-white transition-all',
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
