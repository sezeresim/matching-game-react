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
  score: number;
  selectedCards: ICard[];
  isSuccess: boolean;
  voiceLevel: number;
}

const initialState: GameState = {
  status: 'menu',
  timer: 60,
  score: 0,
  selectedCards: [],
  isSuccess: false,
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
  voiceLevel: 2,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    gameStart: (state) => {
      state.status = 'playing';
    },
    gameReset: () => initialState,
    gameOver: (state, action: PayloadAction<boolean>) => {
      state.status = 'gameover';
      state.isSuccess = action.payload;
    },
    updateCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timer = state.timer + action.payload;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = state.score + action.payload;
    },
    updateSelectedCards: (state, action: PayloadAction<ICard[]>) => {
      state.selectedCards = action.payload;
    },
    updateVoiceLevel: (state, action: PayloadAction<number>) => {
      state.voiceLevel = action.payload;
    },
  },
});
export const {
  gameStart,
  updateCards,
  updateTimer,
  gameOver,
  updateScore,
  updateSelectedCards,
  gameReset,
  updateVoiceLevel,
} = gameSlice.actions;

export const gameState = (state: RootState) => state.game;

export default gameSlice.reducer;
