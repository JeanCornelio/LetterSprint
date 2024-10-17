import  { useEffect, useState } from 'react'
import { useTestConfiguration } from './useTestConfiguration'

export const useTimer = () => {
    const {timeActive} = useTestConfiguration()
    const [seconds, setSeconds] = useState(timeActive)

    useEffect(() => {
        setSeconds(timeActive)
    }, [timeActive])
    

    useEffect(() => {
        if(seconds <= 0) return

        const timer = setInterval(() =>{
            setSeconds((prevSeconds: number) => prevSeconds - 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, [seconds])
  
    return {
        seconds,
       
    }
}
