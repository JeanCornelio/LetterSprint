import { useEffect } from "react";
import { updateUserSettings } from "../utils/firebaseAuth.utils";
import { useTestConfiguration } from "./useTestConfiguration";
import { useAuth } from "./useAuth";


export const useUpdateConfig = () => {

    const {mode, timeActive, words, isPuntuatioActive, isNumberactive, difficulty, soundEffects} = useTestConfiguration()
    const {uid, setMessage, state} = useAuth()

  useEffect(() => {
    if (state !== "authenticated" || !uid) return;

  const saveConfig = async () => {
       const data = await  updateUserSettings(uid, {mode,number:isNumberactive,puntuation:isPuntuatioActive ,time:timeActive, words, difficulty, soundEffects});

       const {ok, errorMessage} = data
       
       if (!ok) return  setMessage(errorMessage)

  };

  saveConfig(); 
  
    
  }, [mode, timeActive, words, isPuntuatioActive, isNumberactive, difficulty, soundEffects, uid, state])


  return {

  }
}
