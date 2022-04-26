import cn from 'classnames';
import Image from 'next/image';
import * as React from 'react';

import { cardVoice } from '@/lib/sound';

import { fruits } from '@/data/fruits';

import { Button } from '@/components/buttons';

import { ICard } from '@/interfaces';
import { shuffle } from '@/utils/shuffle';
export const MENU_STATUS = {
  START_GAME: 'START_GAME',
  PLAYING_GAME: 'PLAYPLAYING_GAMEING',
  END_GAME: 'END_GAME',
};

const actionTypes = {
  START_GAME: 'START_GAME',
};

const initialState = {
  status: MENU_STATUS.START_GAME,
};

function reducer(state: any, action: any) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.START_GAME:
      return {
        ...state,
        status: MENU_STATUS.PLAYING_GAME,
      };
    default:
      return state;
  }
}
export default function HomePage() {
  const [game, dispatch] = React.useReducer(reducer, initialState);

  const [fruitsData, setFruitsData] = React.useState<ICard[]>(
    shuffle(
      [
        ...fruits.map((el) => ({
          ...el,
        })),
        ...fruits.map((el) => ({ ...el, clone: 2 })),
      ].map((fruit: ICard) => ({
        ...fruit,
        id: fruit.id + fruit.clone,
        isOpen: false,
        isRemoved: false,
      }))
    )
  );
  const [voiceLevel, setVoiceLevel] = React.useState<number>(5);
  const [timer, setTimer] = React.useState(60);

  /*  React.useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); */

  const [selectedCards, setSelectedCards] = React.useState<any>([]);

  const handleClickCard = (el: ICard) => {
    let newData;
    if (el.isOpen) {
      return;
    }
    if (selectedCards.length < 2) {
      setSelectedCards([...selectedCards, el]);
      console.log('newData ~ newData', [...selectedCards, el]);
      newData = fruitsData.map((fruit: ICard) => {
        const isRemoved =
          selectedCards[0]?.name === fruit.name && fruit.name === el.name;
        console.log('Match Status=', isRemoved);
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
      setSelectedCards([el]);
      console.log('newData ~ newData', [el]);
      newData = fruitsData.map((fruit) => {
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

    setFruitsData(newData);

    cardVoice(voiceLevel).play();
  };

  const renderGame = (status: any) => {
    switch (status) {
      case MENU_STATUS.START_GAME:
        return (
          <div className='flex h-screen w-full flex-col items-center justify-center'>
            <div className='w-3/4 rounded border bg-white px-12 py-20 shadow-xl md:w-1/2'>
              <Button
                variant='primary'
                className='w-full'
                onClick={() => dispatch({ type: actionTypes.START_GAME })}
              >
                Game Start
              </Button>
            </div>
          </div>
        );
      case MENU_STATUS.PLAYING_GAME:
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
                {fruitsData.filter((fruit: ICard) => fruit.isRemoved).length /
                  2}{' '}
                / {fruitsData.length / 2}
              </p>
            </div>
            <div className='grid grid-cols-4 gap-2 xl:px-28'>
              {fruitsData.map((el: ICard) => (
                <div
                  key={el.id}
                  className={cn([
                    'rounded-xl border p-1',
                    el.isRemoved
                      ? 'bg-white'
                      : 'bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
                  ])}
                >
                  <div
                    className={cn([
                      'cu-card aspect-square',
                      el.isOpen &&
                        'bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
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
        {renderGame(game.status)}
      </div>
    </main>
  );
}
