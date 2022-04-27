import cn from 'classnames';
import Image from 'next/image';
import * as React from 'react';

import { cardVoice } from '@/lib/sound';

import { Button } from '@/components/buttons';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  gameStart,
  gameState,
  IGameStatus,
  updateCards,
} from '@/store/slices/game.slice';

import { ICard } from '@/interfaces';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { status, cards } = useAppSelector(gameState);

  const [voiceLevel, setVoiceLevel] = React.useState<number>(5);
  const [timer, setTimer] = React.useState(60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCards, setSelectedCards] = React.useState<ICard[]>([]);

  const handleClickCard = (el: ICard) => {
    let newData;
    if (el.isOpen) {
      return;
    }
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, el]);
      console.log('newData ~ newData', [...selectedCards, el]);
      newData = cards.map((fruit: ICard) => {
        const isRemoved =
          selectedCards[0]?.name === fruit.name && fruit.name === el.name;
        console.log('Match Status=', isRemoved);
        return selectedCards[0]?.id === fruit.id || fruit.id === el.id
          ? {
              ...fruit,
              isOpen: true,
              isRemoved,
            }
          : {
              ...fruit,
              isOpen: false,
            };
      });
    } else {
      dispatch(updateCards([el]));
      setSelectedCards([el]);
      console.log('newData ~ newData', [el]);
      newData = cards.map((fruit) => {
        if (fruit.id === el.id) {
          return {
            ...fruit,
            isOpen: true,
          };
        } else {
          return {
            ...fruit,
            isOpen: false,
          };
        }
      });
    }
    dispatch(updateCards(newData));

    cardVoice(voiceLevel).play();
  };

  const renderGame = (status: IGameStatus) => {
    switch (status) {
      case 'menu':
        return (
          <div className='flex h-screen w-full flex-col items-center justify-center'>
            <div className='w-3/4 rounded border bg-white px-12 py-20 shadow-xl md:w-1/2'>
              <Button
                variant='primary'
                className='w-full'
                onClick={() => dispatch(gameStart())}
              >
                Game Start
              </Button>
            </div>
          </div>
        );
      case 'playing':
        return (
          <div className='max-h-screen'>
            <div>
              {/* sound bar */}
              <div className='flex'>
                <label className='flex items-center'>Voice:{voiceLevel}</label>
                <input
                  type='range'
                  step={1}
                  min={0}
                  max={10}
                  className='w-1/4'
                  onChange={(e) => {
                    setVoiceLevel(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            {/* timer */}
            <div className='flex justify-between'>
              <p className='my-3 font-mono text-2xl font-semibold'>{timer}</p>
              <p className='my-3 font-mono text-2xl font-semibold'>
                {cards.filter((fruit: ICard) => fruit.isRemoved).length / 2} /{' '}
                {cards.length / 2}
              </p>
            </div>
            <div className='grid grid-cols-4 gap-2 xl:px-28'>
              {cards.map((el: ICard) => (
                <div
                  key={el.id}
                  className={cn([
                    'rounded-xl border p-1',
                    el.isRemoved
                      ? 'bg-red-400'
                      : 'bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
                  ])}
                >
                  <div
                    className={cn('cu-card aspect-square', [
                      el.isRemoved && 'bg-red-400',
                    ])}
                    onClick={() => handleClickCard(el)}
                  >
                    {!el.isRemoved && el.isOpen && (
                      <Image
                        src={el.image}
                        alt={el.name}
                        width={150}
                        height={150}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <main className='bg-gradient-to-t from-teal-700 via-teal-400 to-teal-100'>
      <div className='container mx-auto max-h-screen min-h-screen  lg:px-52'>
        {renderGame(status)}
      </div>
    </main>
  );
}
