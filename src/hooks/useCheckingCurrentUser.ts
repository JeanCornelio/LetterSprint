import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, checkUserExist } from "../utils/firebaseAuth.utils";
import { useAuth } from "./useAuth";

export const useCheckingCurrentUser = () => {
  const { checkingCurrentUser, handleCurrentUSer } = useAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return checkingCurrentUser(false);
      }

      const currentUser = await checkUserExist(user.uid);

      if (currentUser.data) {
        checkingCurrentUser(true);
        handleCurrentUSer(currentUser.data);
      }
    });
  }, []);

  return {};
};
