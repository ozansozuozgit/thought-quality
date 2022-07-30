import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface UserState {
  name: string;
  uid: string;
  notes: Array<string>;
  email: string;
  photoURL: string;
}

const initialState: UserState = {
  name: '',
  uid: '',
  notes: [''],
  email: '',
  photoURL: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetailsFromGoogle: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.email = action.payload.name;
      state.photoURL = action.payload.photoURL;
    },
  },
});

export const {setUserDetailsFromGoogle} = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
