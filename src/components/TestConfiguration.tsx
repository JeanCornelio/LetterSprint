
import { MODES, TIMER, TIMES, WORDS } from "../constants";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import {
  AtIcon,
  ClockIcon,
  HealthiconsAIcon,
  NumberIcon,
} from "../icons/Icons";
import { MODE, TIME, WORD } from "../types/Text";
import { useTimer } from "../hooks/useTimer";
import { TestConfigurationModal } from "./TestConfigurationModal";
import { useUpdateConfig } from "../hooks/useUpdateConfig";

export const TestConfiguration = () => {
  const {
    mode,
    timeActive,
    words,
    setMode,
    setTime,
    setWordQuantity,
    puntuationToggle,
    numberToggle,
    isPuntuatioActive,
    isNumberactive,
  } = useTestConfiguration();
  useUpdateConfig()
  //Note: descrubir la animacon del filtro al expandirce

  const defaultClass = "cursor-pointer hover:text-sprint-blue transition";
  const active = " text-sprint-blue font-bold";
  const { timerState } = useTimer();



  return (
    <section
      id="testConfig"
      className={
        (timerState === TIMER["start"] || timerState === TIMER["finished"]
          ? "animate-fade-out"
          : "animate-fade-in") + " flex  justify-center transition-all "
      }
    >
      <div className="hidden  md:flex gap-5 bg-sprint-config p-2 px-5 rounded-md justify-center md:w-100  ">
        <ul className="flex gap-5">
          <li className={defaultClass + (isPuntuatioActive ? active : "")}>
            <button
              className="flex items-center gap-1"
              onClick={puntuationToggle}
            >
              {" "}
              <AtIcon className="text-md" /> Puntuation
            </button>
          </li>
          <li className={defaultClass + (isNumberactive ? active : "")}>
            <button className="flex items-center gap-1" onClick={numberToggle}>
              {" "}
              <NumberIcon className="text-md" /> Numbers
            </button>
          </li>
        </ul>
        <div className="border-r-2 rounded-full border-gray-400"></div>
        <ul className="flex gap-5">
          <li className={defaultClass + (MODES["time"] === mode ? active : "")}>
            <button
              onClick={() => setMode("time")}
              className="flex items-center gap-1"
            >
              {" "}
              <ClockIcon className="text-sm" /> Time
            </button>
          </li>
          <li
            className={defaultClass + (MODES["words"] === mode ? active : "")}
          >
            <button
              onClick={() => setMode("words")}
              className="flex items-center gap-1"
            >
              <HealthiconsAIcon className="text-md" /> Words
            </button>
          </li>
        </ul>
        <div className="border-r-2 rounded-full border-gray-400"></div>

        {MODES[mode as MODE] === "time" && (
          <ul className="flex gap-5 items-center">
            {Object.entries(TIMES)
              .slice(1)
              .map(([key, time]) => (
                <li
                  key={key}
                  className={
                    defaultClass +
                    (TIMES[timeActive as TIME] === time ? active : "")
                  }
                >
                  <button
                    onClick={() => setTime(Number(key) as TIME)}
                    className="flex items-center gap-1 text-sm"
                  >
                    {time}
                  </button>
                </li>
              ))}
          </ul>
        )}

        {MODES[mode as MODE] === "words" && (
          <ul className="flex gap-5 items-center">
            {Object.entries(WORDS).map(([key, quantity]) => (
              <li
                key={key}
                className={
                  defaultClass +
                  (WORDS[words as WORD] === quantity ? active : "")
                }
              >
                <button
                  onClick={() => setWordQuantity(Number(key) as WORD)}
                  className="flex items-center gap-1 text-sm"
                >
                  {quantity}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <TestConfigurationModal />
    </section>
  );
};
