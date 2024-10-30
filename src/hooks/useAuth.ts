import { useNavigate } from "react-router-dom";
import { checkingStatus, chekUserNameStatus, logout, setAuthenticatedState, setCurrentUser, setUserName, singInGoogle } from "../store/auth/slice";
import { auth, checkUserExist, createUserAccount, singInGooglePopup } from "../utils/firebaseAuth.utils";
import { useAppDispatch, useAppSelector } from "./useStore";
import { onAuthStateChanged, signOut } from "firebase/auth";



export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state, photoURL, displayName, errorMessage, email, userName, uid } = useAppSelector(
    ({ auth }) => auth
  );


  const setUserAuthenticated = async () =>{
    
   onAuthStateChanged(auth, async (user)  => {
      if(user){
          const currentUser = await checkUserExist(user.uid)
          dispatch(setCurrentUser(currentUser.data));
      }
    })

  }

 

 
  const setLogout = (errorMessage = 'Sign up process Canceled') =>{
    dispatch(logout(errorMessage));
    signOut(auth);
    navigate('/login')
  }


  const addUserName= (userName:string) =>{
   dispatch(setUserName({userName}))
  }


  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // waiting for google autentication 

    const resp = await singInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) {return setLogout(errorMessage)}

    dispatch(singInGoogle({ uid, email, displayName, photoURL }));

     const user = await checkUserExist(uid)

     if(!user.exist){

       dispatch(chekUserNameStatus()); // waiting for userName
     
      }else{
       dispatch(setAuthenticatedState());

       addUserName(user.data.userName)
       
       navigate("/");
     }
  };

  const createAccountName = (userName: string) =>{

     addUserName(userName)
     
     createUserAccount({ uid, email, displayName, photoURL, userName })
     
     dispatch(setAuthenticatedState());
    
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
    createAccountName,
    setUserAuthenticated
  };
};
