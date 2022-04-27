import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fruits } from '@/data/fruits';

import { ICard } from '@/interfaces';
import { shuffle } from '@/utils/shuffle';

import type { RootState } from '..';

export type IGameStatus = 'menu' | 'playing' | 'gameover';

export interface GameState {
  status: IGameStatus;
  cards: ICard[];
  timer: number;
}

const initialState: GameState = {
  status: 'menu',
  timer: 60,
  cards: shuffle(
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
  ),
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    gameStart: (state) => {
      state.status = 'playing';
    },
    gameOver: (state) => {
      state.status = 'gameover';
    },
    updateCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timer = state.timer + action.payload;
    },
  },
});
export const { gameStart, updateCards, updateTimer, gameOver } =
  gameSlice.actions;

export const gameState = (state: RootState) => state.game;

export default gameSlice.reducer;
