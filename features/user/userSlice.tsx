import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {SessionType, UserState} from '../../types';

const initialState: UserState = {
  name: '',
  uid: '',
  email: '',
  photoURL: '',
  sessions: [{}],
  emotion: {name: 'neutral', quality: 4},
  creationTime: '',
  note: '',
  latestSessionToggle: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetailsFromGoogle: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.creationTime = action.payload.creationTime;
    },
    setSessions: (state, action: PayloadAction<Array<SessionType>>) => {
      state.sessions = action.payload;
    },
    removeSession: (state, action: PayloadAction<any>) => {
      state.sessions = state.sessions?.filter(
        session => session.sessionID !== action.payload,
      );
    },
    setEmotion: (
      state,
      action: PayloadAction<{name: string; quality: number}>,
    ) => {
      state.emotion = action.payload;
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setLatestSessionToggle: (state, action: PayloadAction<boolean>) => {
      state.latestSessionToggle = action.payload;
    },
  },
});

export const {
  setUserDetailsFromGoogle,
  removeSession,
  setSessions,
  setEmotion,
  setNote,
  setLatestSessionToggle,
} = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;

export default userSlice.reducer;
