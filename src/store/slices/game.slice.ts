import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';

export interface GameState {
  value: number;
}

const initialState: GameState = {
  value: 0,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});
export const { increment, decrement, incrementByAmount } = gameSlice.actions;

export const counter = (state: RootState) => state.game;

export default gameSlice.reducer;
