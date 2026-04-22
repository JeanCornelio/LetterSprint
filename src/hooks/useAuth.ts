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
import { auth } from "../utils/firebaseAuth.utils";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useTestConfiguration } from "./useTestConfiguration";
import type { TestInitialState } from "../interfaces/testConfiguration";
import type { Stats } from "../interfaces/Test";

interface CurrentUserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  username: string;
  stats: Stats;
}

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

  const handleCurrentUser = async (currentUser: CurrentUserData) => {
    const user = await getCurrentUser(currentUser.uid);
    if (!user.ok) return;
    
    const testConfig = user.testConfig as TestInitialState | undefined;
    if (testConfig) {
      setCurrentUserTestConfiguration(testConfig);
    }
    dispatch(setCurrentUser(currentUser as Parameters<typeof setCurrentUser>[0]));
  };

  const checkingCurrentUser = (value: boolean) => {
    dispatch(setIsPending(value));
  };

  const setLogout = (errorMsg = "Sign Out") => {
    dispatch(logout(errorMsg));
    resetConfiguration();
    firebaseSignOut(auth);
    navigate("/login");
  };

  const addUsername = (name: string) => {
    dispatch(setUsername({ username: name }));
  };

  const signInWithGoogle = async () => {
    dispatch(checkingStatus());

    const resp = await signInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok || !uid) return setLogout(errorMessage || "Sign in failed");

    dispatch(signInWithExternalAccount({ uid, email: email || "", displayName, photoURL }));

    const user = await checkUserExist(uid);

    if (!user.exist) return dispatch(chekUsernameStatus());

    dispatch(setAuthenticatedState());
    if (user.data?.username) {
      addUsername(user.data.username);
    }

    navigate("/");
  };

  const signInWithGithub = async () => {
    dispatch(checkingStatus());

    const resp = await signInGithub();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok || !uid) return setLogout(errorMessage || "Sign in failed");

    dispatch(signInWithExternalAccount({ uid, email: email || "", displayName, photoURL }));

    const user = await checkUserExist(uid);

    if (!user.exist) return dispatch(chekUsernameStatus());

    dispatch(setAuthenticatedState());
    if (user.data?.username) {
      addUsername(user.data.username);
    }

    navigate("/");
  };

  const createAccountName = (name: string) => {
    addUsername(name);

    createUserAccount({
      uid,
      email: email || "",
      displayName,
      photoURL,
      username: name,
    });

    dispatch(setAuthenticatedState());

    navigate("/");
  };

  const createUserWithEmailAndPassword = async ({
    email: userEmail,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    dispatch(checkingStatus());
    const resp = await createAccountWithEmailAndPassword({
      email: userEmail,
      password,
      username,
    });

    const {
      uid,
      email: userEmailResp,
      displayName,
      photoURL,
      ok,
      errorMessage,
    } = resp;

    if (!ok || !uid) return setLogout(errorMessage || "Creation failed");

    const userCreated = await createUserAccount({
      uid,
      email: userEmailResp || userEmail,
      displayName,
      photoURL,
      username,
    });

    if (!userCreated.ok) return setLogout(userCreated.errorMessage || "Creation failed");
  };

  const signIn = async ({ email: userEmail, password }: { email: string; password: string }) => {
    const resp = await signInEmailAndPassword({ email: userEmail, password });

    const { ok, errorMessage } = resp;

    if (!ok) return dispatch(logout(errorMessage || "Sign in failed"));

    navigate("/");
  };

  const checkUsername = async (name: string) => {
    const result = await checkUsernameExist(name);
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