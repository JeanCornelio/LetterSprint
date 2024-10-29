import { useNavigate } from "react-router-dom";
import { checkingStatus, logout, singInGoogle } from "../store/auth/slice";
import { singInGooglePopup } from "../utils/firebaseAuth.utils";
import { useAppDispatch, useAppSelector } from "./useStore";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state, photoURL, displayName, errorMessage, email } = useAppSelector(
    ({ auth }) => auth
  );

  const signInWithGoogle = async () => {
    dispatch(checkingStatus()); // loanding...

    const resp = await singInGooglePopup();
    const { uid, email, displayName, photoURL, ok, errorMessage } = resp;

    if (!ok) {
      return dispatch(logout(errorMessage));
    }

    //cuando tenga los datos los enviamos al storage
    dispatch(singInGoogle({ uid, email, displayName, photoURL }));

    //navigate when
    navigate("/user");
  };

  return {
    signInWithGoogle,
    state,
    photoURL,
    displayName,
    errorMessage,
    email,
  };
};
