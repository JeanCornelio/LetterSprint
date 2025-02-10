import { useNavigate } from "react-router-dom";
import {
  checkingStatus,
  chekUsernameStatus,
  logout,
  setAuthenticatedState,
  setCurrentUser,
  setErrorMessage,
  setIsPending,
  setUsername,
  signInWithExternalAccount,
} from "../store/auth/slice";
import {
  auth,
  checkUserExist,
  checkUsernameExist,
  createAccountWithEmailAndPassword,
  createUserAccount,
  signInGooglePopup,
  signInEmailAndPassword,
  signInGithub,
  getCurrentUser,
} from "../utils/firebaseAuth.utils";
import { useAppDispatch, useAppSelector } from "./useStore";
import { signOut } from "firebase/auth";
import { useTestConfiguration } from "./useTestConfiguration";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
    username,
    uid,
    isPending,
    stats
  } = useAppSelector(({ auth }) => auth);
  const { setCurrentUserTestConfiguration, resetConfiguration } =
    useTestConfiguration();

  const handleCurrentUser = async (currentUser) => {
    //dipatch Configuration
  
    const user = await getCurrentUser(currentUser.uid);
    const { testConfig } = user;

    setCurrentUserTestConfiguration(testConfig);
    dispatch(setCurrentUser(currentUser));
  };

  const checkingCurrentUser = (value: boolean) => {
    dispatch(setIsPending(value));
  };

  const setLogout = (errorMessage = "Sign Out") => {
    dispatch(logout(errorMessage));
    resetConfiguration();
    signOut(auth);
    navigate("/login");
  };

  const addUsername = (username: string) => {
    dispatch(setUsername({ username }));
  };

  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // waiting for google autentication

    const resp = await signInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) return setLogout(errorMessage);

    dispatch(signInWithExternalAccount({ uid, email, displayName, photoURL }));

    const user = await checkUserExist(uid);

    if (!user.exist) return dispatch(chekUsernameStatus());

    dispatch(setAuthenticatedState());

    addUsername(user.data.username);

    navigate("/");
  };

  const signInWithGithub = async () => {
    dispatch(checkingStatus()); // waiting for google autentication

    const resp = await signInGithub();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) return setLogout(errorMessage);

    dispatch(signInWithExternalAccount({ uid, email, displayName, photoURL }));

    const user = await checkUserExist(uid);

    if (!user.exist) return dispatch(chekUsernameStatus());

    dispatch(setAuthenticatedState());

    addUsername(user.data.username);

    navigate("/");
  };

  const createAccountName = (username: string) => {
    addUsername(username);

    createUserAccount({
      uid,
      email,
      displayName,
      photoURL,
      username,
    });

    dispatch(setAuthenticatedState());

    navigate("/");
  };

  const createUserWithEmailAndPassword = async ({
    email,
    password,
    username,
  }) => {
    dispatch(checkingStatus()); // waiting for google autentication
    const resp = await createAccountWithEmailAndPassword({
      email,
      password,
      username,
    });

    const {
      uid,
      email: userEmail,
      displayName,
      photoURL,
      ok,
      errorMessage,
    } = resp;

    if (!ok) return setLogout(errorMessage);

    const userCreated = await createUserAccount({
      uid,
      email: userEmail,
      displayName,
      photoURL,
      username,
    });

    if (!userCreated.ok) return setLogout(userCreated.errorMessage);
  };

  const signIn = async ({ email, password }) => {
    //dispatch(checkingStatus());

    const resp = await signInEmailAndPassword({ email, password });

    const { ok, errorMessage } = resp;

    if (!ok) return dispatch(logout(errorMessage));

    navigate("/");
  };

  const checkUsername = async (username: string) => {
    const result = await checkUsernameExist(username);
    return result;
  };

  const setMessage = (msg: string) => {
    dispatch(setErrorMessage(msg));
  };

  return {
    signInWithGoogle,
    signInWithGithub,
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
    setLogout,
    username,
    createAccountName,
    isPending,
    handleCurrentUser,
    checkingCurrentUser,
    checkUsername,
    createUserWithEmailAndPassword,
    signIn,
    setMessage,
    uid,
    stats
  };
};
