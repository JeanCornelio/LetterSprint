import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, checkUserExist } from "../utils/firebaseAuth.utils";
import { useAuth } from "./useAuth";
import { useUpdateConfig } from "./useUpdateConfig";

export const useCheckingCurrentUser = () => {
  const { checkingCurrentUser, handleCurrentUser, photoURL, username, setLogout, isPending, state } = useAuth();
  useUpdateConfig();

  useEffect(() => {
    let isMounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;
      
      try {
        if (!user) {
          checkingCurrentUser(false);
          return;
        }

        const currentUser = await checkUserExist(user.uid);
        
        if (!currentUser.exist || !currentUser.data) {
          checkingCurrentUser(false);
          return;
        }

        const passwordUser = user.providerData[0]?.providerId;

        if (!user.emailVerified && passwordUser === "password") {
          checkingCurrentUser(false);
          setLogout("We have sent a verification email, please check your email.");
          return;
        }

        checkingCurrentUser(true);
        handleCurrentUser(currentUser.data);
      } catch (error) {
        console.error("Error checking user:", error);
        if (isMounted) {
          checkingCurrentUser(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return {
    photoURL, username, setLogout, isPending, state
  };
};
