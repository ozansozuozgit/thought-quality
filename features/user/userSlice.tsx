import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';
import {RootState} from '../../app/store';
import {SessionType, UserState} from '../../types';

const initialState: UserState = {
  name: '',
  uid: '',
  notes: [''],
  email: '',
  photoURL: '',
  sessions: [{}],
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
    setSessions: (state, action: PayloadAction<Array<SessionType>>) => {
      state.sessions = action.payload;
    },
    removeSession: (state, action: PayloadAction<any>) => {
      state.sessions = state.sessions?.filter(
        session => session.sessionID !== action.payload,
      );
    },
  },
});

export const {setUserDetailsFromGoogle, removeSession, setSessions} =
  userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
