import  { useEffect } from 'react'
import { useTestConfiguration } from './useTestConfiguration'
import { useAppDispatch, useAppSelector } from './useStore'
import { setSeconds, setState } from '../store/timer/slice'
import { MODES, TIMER } from '../constants'

export const useTimer = () => {
    const dispatch = useAppDispatch()
    const {seconds, state} = useAppSelector(({timer}) => timer)  
    const {timeActive, mode} = useTestConfiguration()

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
        //if(seconds <= 0) return

        
        if(state ===  'pause' || state === 'reset' || state === 'finished') return

     
        const timer = setInterval(() =>{
                dispatch(setSeconds(mode === MODES['time'] ? seconds - 1 : seconds + 1 ))    ;
        }, 1000);
    
        return () => clearInterval(timer);
    }, [seconds, state])
  
    return {
        seconds,
        handleTimerState:handleState,
        handleTimerTime:handleTime,
        timerState: state,
        timeSelected:timeActive,
        mode
       
    }
}
