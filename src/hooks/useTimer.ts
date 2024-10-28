import { useEffect } from "react";
import { useTestConfiguration } from "./useTestConfiguration";
import { useAppDispatch, useAppSelector } from "./useStore";
import { setSeconds, setState } from "../store/timer/slice";
import { MODES } from "../constants";

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const { seconds, state } = useAppSelector(({ timer }) => timer);
  const { timeActive, mode } = useTestConfiguration();

  const handleState = (state: string) => {
    dispatch(setState(state));
  };

  const handleTime = () => {
    dispatch(setSeconds(timeActive));
  };

  useEffect(() => {
    if (state !== "start") return;

    const timer = setInterval(() => {
      dispatch(setSeconds(mode === MODES["time"] ? seconds - 1 : seconds + 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, state, mode, dispatch]);

  return {
    seconds,
    handleTimerState: handleState,
    handleTimerTime: handleTime,
    timerState: state,
    timeSelected: timeActive,
    mode,
  };
};
