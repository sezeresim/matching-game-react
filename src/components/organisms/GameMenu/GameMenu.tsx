import React from 'react';

import { Button } from '../../atoms';

interface IGameMenuProps {
  onStart: () => void;
}

const GameMenu: React.FC<IGameMenuProps> = (props) => {
  const { onStart } = props;
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='mx-2 rounded border bg-white px-12 py-20 shadow-xl '>
        <Button variant='primary' className='w-full' onClick={onStart}>
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
};

export default GameMenu;
