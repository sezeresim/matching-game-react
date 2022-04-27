import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fruits } from '@/data/fruits';

import { ICard } from '@/interfaces';
import { shuffle } from '@/utils/shuffle';

import type { RootState } from '..';

export type IGameStatus = 'menu' | 'playing' | 'gameover';

export interface GameState {
  status: IGameStatus;
  cards: ICard[];
}

const initialState: GameState = {
  status: 'menu',
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
    updateCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
  },
});
export const { gameStart, updateCards } = gameSlice.actions;

export const gameState = (state: RootState) => state.game;

export default gameSlice.reducer;
