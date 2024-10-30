import { useNavigate } from "react-router-dom";
import {
  checkingStatus,
  chekUserNameStatus,
  logout,
  setAuthenticatedState,
  setCurrentUser,
  setIsPending,
  setUserName,
  singInGoogle,
} from "../store/auth/slice";
import {
  auth,
  checkUserExist,
  createUserAccount,
  singInGooglePopup,
} from "../utils/firebaseAuth.utils";
import { useAppDispatch, useAppSelector } from "./useStore";
import { signOut } from "firebase/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
    userName,
    uid,
    isPending,
  } = useAppSelector(({ auth }) => auth);

  const handleCurrentUSer = (currentUser) => {
    dispatch(setCurrentUser(currentUser));
  };

  const checkingCurrentUser = (value: boolean) => {
    dispatch(setIsPending(value));
  };

  const setLogout = (errorMessage = "Sign up process Canceled") => {
    dispatch(logout(errorMessage));
    signOut(auth);
    navigate("/login");
  };

  const addUserName = (userName: string) => {
    dispatch(setUserName({ userName }));
  };

  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // waiting for google autentication

    const resp = await singInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) {
      return setLogout(errorMessage);
    }

    dispatch(singInGoogle({ uid, email, displayName, photoURL }));

    const user = await checkUserExist(uid);

    if (!user.exist) {
      dispatch(chekUserNameStatus()); // waiting for userName
    } else {
      dispatch(setAuthenticatedState());

      addUserName(user.data.userName);

      navigate("/");
    }
  };

  const createAccountName = (userName: string) => {
    addUserName(userName);

    createUserAccount({ uid, email, displayName, photoURL, userName });

    dispatch(setAuthenticatedState());

    navigate("/user");
  };

  return {
    signInWithGoogle,
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
    setLogout,
    userName,
    createAccountName,
    isPending,
    handleCurrentUSer,
    checkingCurrentUser,
  };
};
