import { useNavigate } from "react-router-dom";
import { checkingStatus, chekUserNameStatus, logout, setAuthenticatedState, setUserName, singInGoogle } from "../store/auth/slice";
import { singInGooglePopup } from "../utils/firebaseAuth.utils";
import { useAppDispatch, useAppSelector } from "./useStore";


export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

 

  const { state, photoURL, displayName, errorMessage, email, userName } = useAppSelector(
    ({ auth }) => auth
  );

 
  const setLogout = (errorMessage = 'Sign up process Canceled') =>{
    dispatch(logout(errorMessage));
  }


  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // waiting for google autentication 

    const resp = await singInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage, isNewUser } = resp;

    if (!ok) {return setLogout(errorMessage)}

    dispatch(singInGoogle({ uid, email, displayName, photoURL }));
    
    if(isNewUser){
      //This should active when is the first time of user or if user dosen't exist in our data base
          dispatch(chekUserNameStatus()); // waiting for userName
    }else{
      //get the userName and set the information

      //look up information of user
      dispatch(setUserName({userName: 'MunditoRD'}))
      dispatch(setAuthenticatedState());
      navigate("/");
    }
   

  };

  const createAccountName = (userName: string) =>{

    dispatch(setUserName({userName}))
    dispatch(setAuthenticatedState());
    //navigate when
    navigate("/user");
  }



  return {
    signInWithGoogle,
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
    setLogout,
    userName,
    createAccountName
  };
};
