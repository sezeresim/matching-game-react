/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { cardVoice } from '@/lib/sound';

import { Button } from '@/components/buttons';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  gameOver,
  gameStart,
  gameState,
  IGameStatus,
  updateCards,
  updateTimer,
} from '@/store/slices/game.slice';

import { ICard } from '@/interfaces';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { status, cards, timer } = useAppSelector(gameState);

  const [voiceLevel, setVoiceLevel] = useState<number>(5);

  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);

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

  const timerInterval: any = useRef();
  const handleClickStart = () => {
    dispatch(gameStart());
    timerInterval.current = setInterval(() => {
      dispatch(updateTimer(-10));
    }, 1000);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerInterval.current);
      dispatch(gameOver());
    }
  }, [timer]);

  const renderGame = (status: IGameStatus) => {
    switch (status) {
      case 'menu':
        return (
          <div className='flex h-screen w-full flex-col items-center justify-center'>
            <div className='mx-2 rounded border bg-white px-12 py-20 shadow-xl '>
              <Button
                variant='primary'
                className='w-full'
                onClick={handleClickStart}
              >
                Game Start
              </Button>
              <p className='mt-2 text-sm text-red-600'>
                Game is start with click and total time is 60 seconds.
              </p>
              <p>
                Good Luck <span className='text-2xl'>👾</span>
              </p>
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
      case 'gameover':
        return (
          <div className='flex h-screen w-full flex-col items-center justify-center'>
            <motion.p
              className='text-2xl font-bold text-dark'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                repeat: Infinity,
              }}
            >
              Game Over
              <br />
              <span className='flex justify-center text-4xl'>👾</span>
            </motion.p>
          </div>
        );
    }
  };

  return (
    <main className='bg-gradient-to-t from-teal-700 via-teal-400 to-teal-100'>
      <motion.div
        initial={{
          opacity: 0,
          x: '100vw',
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
      >
        <div className='container mx-auto max-h-screen min-h-screen  lg:px-52'>
          {renderGame(status)}
        </div>
      </motion.div>
    </main>
  );
}
