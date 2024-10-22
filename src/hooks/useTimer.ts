import  { useEffect } from 'react'
import { useTestConfiguration } from './useTestConfiguration'
import { useAppDispatch, useAppSelector } from './useStore'
import { setSeconds, setState } from '../store/timer/slice'

export const useTimer = () => {
    const dispatch = useAppDispatch()
    const {seconds, state} = useAppSelector(({timer}) => timer)  
    const {timeActive} = useTestConfiguration()

    useEffect(() => {
       
        dispatch(setSeconds(timeActive))
    }, [timeActive])
    
    //console.log(seconds)

    const handleState = (state: string) =>{
        dispatch(setState(state))
    }

    const handleTime = ()=>{      
        dispatch(setSeconds(timeActive))
    }

    useEffect(() => {
        if(seconds <= 0) return

        
        if(state ===  'pause' || state === 'stop') return

        const timer = setInterval(() =>{
            dispatch(setSeconds(seconds - 1))
;
        }, 1000);
    
        return () => clearInterval(timer);
    }, [seconds, state])
  
    return {
        seconds,
        handleTimerState:handleState,
        handleTimerTime:handleTime,
        timerState: state,
        timeSelected:timeActive
       
    }
}
