/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { cardVoice } from '@/lib/sound';

import { Seo } from '@/components/atoms';
import { FormGroup } from '@/components/molecules';
import { GameGameOver, GameMenu } from '@/components/organisms';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  gameOver,
  gameReset,
  gameStart,
  gameState,
  IGameStatus,
  updateCards,
  updateScore,
  updateSelectedCards,
  updateTimer,
  updateVoiceLevel,
} from '@/store/slices/game.slice';

import { ICard } from '@/interfaces';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { status, cards, timer, score, selectedCards, isSuccess, voiceLevel } =
    useAppSelector(gameState);

  const handleClickCard = (el: ICard) => {
    let newData;
    if (el.isOpen || el.isRemoved) {
      return;
    }
    if (selectedCards.length < 2) {
      dispatch(updateSelectedCards([...selectedCards, el]));
      console.log('newData ~ newData', [...selectedCards, el]);
      newData = cards.map((fruit: ICard) => {
        const isRemoved =
          selectedCards[0]?.name === fruit.name && fruit.name === el.name;
        console.log('Match Status=', isRemoved);
        if (isRemoved) {
          dispatch(updateScore(timer));
        }
        if (selectedCards[0]?.id === fruit.id || fruit.id === el.id) {
          return {
            ...fruit,
            isOpen: true,
            isRemoved,
          };
        } else {
          return {
            ...fruit,
            isOpen: false,
          };
        }
      });
    } else {
      dispatch(updateCards([el]));
      dispatch(updateSelectedCards([el]));
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

  /* Game Start */
  const timerInterval: any = useRef();
  const handleClickStart = () => {
    dispatch(gameStart());
    timerInterval.current = setInterval(() => {
      dispatch(updateTimer(-1));
    }, 1000);
  };

  /* Game Over */
  const handleGameOver = () => {
    const isAllCardRemoved =
      cards.filter((card: ICard) => card.isRemoved).length == cards.length;
    if (timer === 0 || isAllCardRemoved) {
      dispatch(gameOver(isAllCardRemoved));
      clearInterval(timerInterval.current);
    }
  };

  useEffect(() => {
    handleGameOver();
  }, [timer]);

  /* Game ReStart */
  const handleClickRestart = () => {
    dispatch(gameReset());
    handleClickStart();
  };

  /* Handel Voice Level */
  const handleVoiceLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateVoiceLevel(Number(e.target.value)));
  };

  const renderGame = (status: IGameStatus) => {
    switch (status) {
      case 'menu':
        return <GameMenu onStart={handleClickStart} />;
      case 'playing':
        return (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <div className='max-h-screen'>
              {/* sound bar */}
              <FormGroup
                label={'Voice:' + voiceLevel}
                type='range'
                name='voiceLevel'
                step={1}
                min={0}
                max={10}
                className='w-1/4'
                value={voiceLevel}
                onChange={handleVoiceLevel}
              />
              {/* timer */}
              <div className='flex justify-between'>
                <p className='my-3 text-2xl font-semibold'>{timer}</p>
                <p className='my-3 text-2xl font-semibold'>{score}</p>
              </div>
              <div className='grid grid-cols-4 gap-3 xl:px-28'>
                {cards.map((el: ICard) => (
                  <div
                    key={el.id}
                    className={cn([
                      'rounded-xl border p-1 shadow-lg shadow-gray-500/80',
                      el.isRemoved
                        ? 'bg-red-400'
                        : 'bg-gradient-to-r from-[black] via-[blue] to-[gray]',
                    ])}
                  >
                    <div
                      className={cn('cu-card', [
                        el.isRemoved && ' bg-red-400',
                        el.isOpen && 'bg-blue-100',
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
          </motion.div>
        );
      case 'gameover':
        return (
          <GameGameOver
            onRestart={handleClickRestart}
            score={score}
            isSuccess={isSuccess}
          />
        );
    }
  };

  return (
    <>
      <Seo templateTitle='Memory Game' />
      <main className='bg-gradient-to-t from-teal-300 via-teal-200 to-teal-100'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 1],
          }}
        >
          <div className='container mx-auto max-h-screen min-h-screen px-2 lg:px-52'>
            {status == 'menu' && <GameMenu onStart={handleClickStart} />}
            {status == 'gameover' && (
              <GameGameOver
                onRestart={handleClickRestart}
                score={score}
                isSuccess={isSuccess}
              />
            )}
            {status == 'playing' && renderGame(status)}
          </div>
        </motion.div>
      </main>
    </>
  );
}
