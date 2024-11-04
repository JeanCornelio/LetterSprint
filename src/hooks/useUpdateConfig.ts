import { useEffect } from "react";
import { updateUserSettings } from "../utils/firebaseAuth.utils";
import { useTestConfiguration } from "./useTestConfiguration";
import { useAuth } from "./useAuth";


export const useUpdateConfig = () => {

    const {mode, timeActive, words, isPuntuatioActive, isNumberactive} = useTestConfiguration()
    const {uid, setMessage} = useAuth()

  useEffect(() => {
  const saveConfig = async () => {
       const data = await  updateUserSettings(uid, {mode,number:isNumberactive,puntuation:isPuntuatioActive ,time:timeActive, words});

       const {ok, errorMessage} = data
       
       if (!ok) return  setMessage(errorMessage)

    };

    saveConfig(); 
  
    
  }, [mode, timeActive, words, isPuntuatioActive, isNumberactive])


  return {

  }
}
