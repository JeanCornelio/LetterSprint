import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, checkUserExist } from "../utils/firebaseAuth.utils";
import { useAuth } from "./useAuth";
import { useUpdateConfig } from "./useUpdateConfig";

export const useCheckingCurrentUser = () => {
  const {
    checkingCurrentUser,
    handleCurrentUser,
    photoURL,
    username,
    setLogout,
    isPending,
    state,
  } = useAuth();
  useUpdateConfig();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      try {
        if (!user) {
          console.log("No user from auth");
          checkingCurrentUser(false);
          return;
        }

        console.log("User from auth:", user.uid);

        const currentUser = await checkUserExist(user.uid);
        console.log("User from DB:", currentUser);

        if (!currentUser.exist || !currentUser.data) {
          console.log("No user data in DB");
          checkingCurrentUser(false);
          return;
        }

        const passwordUser = user.providerData[0]?.providerId;

        if (!user.emailVerified && passwordUser === "password") {
          console.log("Email not verified");
          checkingCurrentUser(false);
          setLogout(
            "We have sent a verification email, please check your email.",
          );
          return;
        }

        console.log("Calling checkingCurrentUser(true)");
        checkingCurrentUser(true);
        console.log("Calling handleCurrentUser");
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
    photoURL,
    username,
    setLogout,
    isPending,
    state,
  };
};
