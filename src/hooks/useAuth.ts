import { useNavigate } from "react-router-dom";
import {
  checkingStatus,
  chekUsernameStatus,
  logout,
  setAuthenticatedState,
  setCurrentUser,
  setIsPending,
  setUsername,
  singInGoogle,
} from "../store/auth/slice";
import {
  auth,
  checkUserExist,
  checkUsernameExist,
  createAccountWithEmailAndPassword,
  createUserAccount,
  singInGooglePopup,
  singInWithEmailAndPassword,
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
    username,
    uid,
    isPending,
  } = useAppSelector(({ auth }) => auth);

  const handleCurrentUser = (currentUser) => {
    dispatch(setCurrentUser(currentUser));
  
  };

  const checkingCurrentUser = (value: boolean) => {
    dispatch(setIsPending(value));
  };


  

  const setLogout = (errorMessage = "Sign Out") => {
    dispatch(logout(errorMessage));
    signOut(auth);
    navigate("/login");
    
  };

  const addUsername = (username: string) => {
    dispatch(setUsername({ username }));
  };

  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // waiting for google autentication

    const resp = await singInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) return setLogout(errorMessage);

    dispatch(singInGoogle({ uid, email, displayName, photoURL }));

    const user = await checkUserExist(uid);

    if(!user.exist) return  dispatch(chekUsernameStatus());

    dispatch(setAuthenticatedState());

    addUsername(user.data.username);

     navigate('/')
  };

  const createAccountName = (username: string) => {

    addUsername(username);

    createUserAccount({ uid, email, displayName, photoURL, username });

    dispatch(setAuthenticatedState());

    navigate('/')
  };

  const createUserWithEmailAndPassword = async({email, password, username}) =>{
     dispatch(checkingStatus()); // waiting for google autentication
    const resp = await createAccountWithEmailAndPassword({email, password, username})

    const { uid, email:userEmail, displayName, photoURL, ok, errorMessage } = resp;

     if (!ok) return setLogout(errorMessage);
    
    const userCreated = await createUserAccount({ uid, email: userEmail, displayName, photoURL, username });
    
     if (!userCreated.ok) return setLogout(userCreated.errorMessage);
   
  }

  const signIn = async ({ email, password} ) =>{
    //dispatch(checkingStatus());
   
   const resp = await singInWithEmailAndPassword({ email, password})

   const {ok, errorMessage} = resp;

   if (!ok) return  dispatch(logout(errorMessage))

   navigate('/')
  }

  const checkUsername = async (username:string) =>{

   const result = await checkUsernameExist(username)
  
   return result

  }

  return {
    signInWithGoogle,
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
    signIn
  };
};
