import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, checkUserExist } from "../utils/firebaseAuth.utils";
import { useAuth } from "./useAuth";
import { useUpdateConfig } from "./useUpdateConfig";

export const useCheckingCurrentUser = () => {
  const { checkingCurrentUser, handleCurrentUser,  photoURL, username, setLogout, isPending, state } = useAuth();
  useUpdateConfig()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {

      if (!user) return checkingCurrentUser(false);

      const currentUser = await checkUserExist(user.uid);
      
      if (!currentUser.data) return checkingCurrentUser(false);

      const passwordUser = user.providerData[0].providerId

      if (!user.emailVerified && passwordUser === "password") {
          checkingCurrentUser(false);
          setLogout('We have sent a verification email, please check your email.')
          return   
      }
  
      checkingCurrentUser(true);
    

      handleCurrentUser(currentUser.data);
     
    });
  }, []);

  return {
     photoURL, username, setLogout, isPending, state
  };
};
