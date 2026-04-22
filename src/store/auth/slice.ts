import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stats } from "../../interfaces/Test";

interface AuthState {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  username: string;
  state: string;
  errorMessage: string | null;
  isPending: boolean;
  stats: Stats;
}

const initialState: AuthState = {
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
  username: "",
  state: "not authenticated",
  errorMessage: null,
  isPending: true,
  stats: {
    testsCompleted: 0,
    wordsWritten: 0,
    timeTyping: 0,
    timeRecord: [],
    wordRecord: [],
  },
};

interface SetCurrentUserPayload {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  username: string;
  stats: Stats;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkingStatus: (state) => {
      state.state = "checking";
    },
    chekUsernameStatus: (state) => {
      state.state = "checkUserName";
    },
    setUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username;
    },
    signInWithExternalAccount: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        displayName: string | null;
        photoURL: string | null;
      }>,
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName || "";
      state.photoURL = action.payload.photoURL || "";
    },
    logout: (state, action: PayloadAction<string>) => {
      state.uid = "";
      state.email = "";
      state.displayName = "";
      state.photoURL = "";
      state.username = "";
      state.state = "not authenticated";
      state.errorMessage = action.payload;
    },
    setAuthenticatedState: (state) => {
      state.state = "authenticated";
    },
    setCurrentUser: (state, action: PayloadAction<SetCurrentUserPayload>) => {
      const { payload } = action;
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.username = payload.username;
      state.state = "authenticated";
      state.isPending = false;
      state.stats = payload.stats;
    },
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setCurrentStats: (state, action: PayloadAction<Stats>) => {
      const { payload } = action;
      state.stats.testsCompleted += payload.testsCompleted;
      state.stats.wordsWritten += payload.wordsWritten;
      state.stats.timeTyping += payload.timeTyping;
      state.stats.timeRecord = payload.timeRecord;
      state.stats.wordRecord = payload.wordRecord;
    },
  },
});

export default authSlice.reducer;
export const {
  signInWithExternalAccount,
  setCurrentStats,
  checkingStatus,
  logout,
  chekUsernameStatus,
  setUsername,
  setAuthenticatedState,
  setCurrentUser,
  setIsPending,
  setErrorMessage,
} = authSlice.actions;
