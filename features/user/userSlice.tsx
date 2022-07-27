import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface UserState {
  name: string;
  id: number;
  notes: Array<string>;

}

const initialState: UserState = {
  name: '',
  id: 0,
  notes: ['']
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name += action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
