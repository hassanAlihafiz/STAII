import { StockDetails } from '@/types/stocks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  currentStockData: null | StockDetails;
}

const initialState: StockState = {
  currentStockData: null,
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setCurrentStockData(state, action: PayloadAction<StockState['currentStockData']>) {
      state.currentStockData = action.payload;
    },
  },
});

export const { setCurrentStockData } = stocksSlice.actions;
export default stocksSlice.reducer;
