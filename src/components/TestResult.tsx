import { Link } from "react-router-dom";
import {
  LetterADiamondIcon,
  PercentIcon,
  TargetIcon,
  TimeIcon,
} from "../icons/Icons";
import { Tooltip } from "./Tooltip";
import { MODES } from "../constants";
import { useTimer } from "../hooks/useTimer";
import { useAuth } from "../hooks/useAuth";
import { useResult } from "../hooks/useResult";
import { useEffect } from "react";
import { Stats, RecordItem } from "../interfaces/Test";
import { getBestTimesAndWords } from "../utils/firebaseService";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { UI_LABELS } from "../constants/uiLabels";

interface TestResultValues {
  characters: string;
  wpm: number;
  correct: number;
  incorrect: number;
  totalWords: number;
  modeResult: string;
  precision: number;
  raw: number;
  mode: string;
  seconds: number;
  uid: string;
}

interface TestResultProps {
  testReultValues: TestResultValues;
}

export const TestResult = ({ testReultValues }: TestResultProps) => {
  const {
    characters,
    correct,
    incorrect,
    wpm,
    totalWords,
    precision,
    modeResult,
    mode,
    raw,
    seconds,
    uid,
  } = testReultValues;
  const { timeSelected } = useTimer();
  const { state } = useAuth();
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  const { setTestsResult, setStats } = useResult();

  const newTestsCompleted = {
    uid: crypto.randomUUID(),
    userUid: uid,
    wpm,
    raw,
    precision,
    mode: modeResult.replace(/\s?\d+\s?/g, ""),
    characters,
    modeSelected: modeResult,
    date: new Date().toISOString(),
  };

  const createNewStats = async (): Promise<Stats> => {
    const { wordRecord, timeRecord } = await getBestTimesAndWords(uid);

    const newStats: Stats = {
      testsCompleted: 1,
      wordsWritten: totalWords,
      timeTyping: Number(mode === MODES["time"] ? timeSelected : seconds),
      timeRecord: timeRecord as RecordItem[],
      wordRecord: wordRecord as RecordItem[],
    };

    return newStats;
  };

  useEffect(() => {
    const fetchData = async () => {
      const newStast = await createNewStats();
      setStats(newStast);
    };

    setTestsResult(newTestsCompleted);
    fetchData();
  }, []);

  return (
    <article
      id="result"
      className="animate-fade-in-bottom text-4xl flex flex-col gap-5">
      <div className="grid grid-cols-7 grid-rows-8 gap-4">
        <div className="col-span-7 row-span-2 md:col-span-3 md:row-span-4 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config ">
          <LetterADiamondIcon className="absolute opacity-10 -left-5 md:-left-10 w-40  md:w-96 -rotate-12 md:-top-8  pointer-events-none " />
          <div className="flex flex-col items-center justify-center  h-full  gap-4">
            <label>{labels.results.characters}</label>
            <Tooltip label={labels.results.charactersTooltip}>
              <span className=" text-sprint-blue font-semibold ">
                {characters}
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-3 md:col-span-2 md:row-span-3 md:col-start-4 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config">
          <TimeIcon className="absolute opacity-10 top-8  md:top-0 left-0 md:left-0  w-32 md:w-52   pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>{labels.results.time}</label>
            <span className=" text-sprint-blue font-semibold ">
              {mode === MODES["time"] ? timeSelected : seconds}s
            </span>
          </div>
        </div>

        <div className="col-span-7 row-span-2 row-start-5 md:col-span-2 md:row-span-4 md:col-start-6 md:row-start-1 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config">
          <PercentIcon className="absolute opacity-10 top-8 md:top-0 -left-3 md:-left-3 w-32 md:w-60 -rotate-12  pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>{labels.results.wpm}</label>
            <Tooltip label={labels.results.wpmTooltip(wpm)}>
              <span className=" text-sprint-blue font-semibold">
                {Math.trunc(wpm)} %
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-7 md:col-span-3 md:row-span-4 md:col-start-1 md:row-start-5 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config">
          <LetterADiamondIcon className="absolute opacity-10 -left-5 md:-left-10 w-40 md:w-96 -rotate-12 md:-top-8  pointer-events-none " />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>{labels.results.words}</label>
            <span className=" text-sprint-blue font-semibold ">
              {totalWords}
            </span>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-9 md:col-span-2 md:row-span-5 md:col-start-4 md:row-start-4 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config">
          <TargetIcon className="absolute opacity-10 -bottom-5 md:-bottom-20 left-0 w-32 md:w-72 pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>{labels.results.precision}</label>
            <Tooltip
              label={labels.results.precisionTooltip(precision, correct, incorrect)}>
              <span className=" text-sprint-blue font-semibold ">
                {Math.trunc(precision)} %
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-11 md:col-span-2 md:row-span-4 md:col-start-6 md:row-start-5 rounded-md p-5 relative overflow-hidden select-none bg-sprint-config">
          <PercentIcon className="absolute opacity-10 top-8 md:top-0 -left-3 md:-left-3 w-32 md:w-60 -rotate-12  pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full gap-4 ">
            <label>{labels.results.raw}</label>
            <Tooltip label={labels.results.rawTooltip(raw)}>
              <span className=" text-sprint-blue font-semibold">
                {Math.trunc(raw)}
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {state === "not authenticated" && (
        <footer className="text-center self-center mt-10 text-lg">
          <Link to="/login" className="underline">
            {labels.results.signInToSaveLink}
          </Link>
          <span>{labels.results.signInToSaveSuffix}</span>
        </footer>
      )}
    </article>
  );
};
