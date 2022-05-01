import React from 'react';

import { Button } from '../../atoms';

interface IGameGameOverProps {
  onRestart: () => void;
  score: number;
  isSuccess: boolean;
}

const GameGameOver: React.FC<IGameGameOverProps> = (props) => {
  const { onRestart, isSuccess, score } = props;
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center '>
      <div className='mx-2 flex w-[300px] flex-col items-center justify-center rounded border bg-white px-12 py-20 shadow-xl md:w-[600px]'>
        {isSuccess ? (
          <p className='text-xl text-red-500'>
            You Win
            <span className='text-2xl'>👾</span>
          </p>
        ) : (
          <p className='text-xl text-red-500'>You Lose</p>
        )}
        <p className='text-xl text-red-500'>Your Score : {score}</p>
        <br />
        <Button variant='primary' className='w-full' onClick={onRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
};

export default GameGameOver;
