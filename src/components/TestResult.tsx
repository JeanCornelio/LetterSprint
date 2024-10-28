import { Link } from 'react-router-dom'
import { LetterADiamondIcon, PercentIcon, TargetIcon, TimeIcon } from '../icons/Icons'
import { Tooltip } from './Tooltip'
import { useTestConfiguration } from '../hooks/useTestConfiguration';
import { MODES } from '../constants';
import { useTimer } from '../hooks/useTimer';


export const TestResult = ({testReultValues}) => {

  const {correct, incorrect, extra, missed, netWpm, totalWords, presition, raw, seconds} = testReultValues;
  const { mode } = useTestConfiguration();
  const { timeSelected} = useTimer()

  return (
    <article
    id="result"
    className="animate-fade-in-bottom text-4xl flex flex-col gap-5"
  >
    <div className="grid grid-cols-7 grid-rows-8 gap-4">
      <div className="col-span-3 row-span-4 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <LetterADiamondIcon className="absolute opacity-5 -top-8 -left-10 w-96 -rotate-12  pointer-events-none " />
        <div className="flex flex-col items-center justify-center  h-full  gap-4">
          <label>CHARACTERES</label>
          <Tooltip label="correct, incorrect, extra, missed">
            <span className=" text-sprint-blue font-semibold ">
              {correct.length}/{incorrect.length}/{extra.length}/
              {missed.length}
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="col-span-2 row-span-3 col-start-4  bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <TimeIcon className="absolute opacity-5 top-0 left-0 w-52   pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-full  gap-4">
          <label>TIME</label>
          <span className=" text-sprint-blue font-semibold ">
            {mode === MODES["time"] ? timeSelected : seconds}s
          </span>
        </div>
      </div>

      <div className="col-span-2 row-span-4 col-start-6 row-start-1 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <PercentIcon className="absolute opacity-5 top-0 -left-3 w-60 -rotate-12  pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-full  gap-4">
          <label>WPM</label>
          <Tooltip label={`${parseFloat(netWpm.toFixed(2))} WPN`}>
            <span className=" text-sprint-blue font-semibold">
              {Math.trunc(netWpm)} %
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="col-span-3 row-span-4 col-start-1 row-start-5 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <LetterADiamondIcon className="absolute opacity-5 -top-8 -left-10 w-96 -rotate-12  pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-full  gap-4">
          <label>WORDS</label>
          <span className=" text-sprint-blue font-semibold ">
          {totalWords}
          </span>
        </div>
      </div>
      <div className="col-span-2 row-span-5 col-start-4 row-start-4 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <TargetIcon className="absolute opacity-5 -bottom-20 left-0 w-72   pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-full  gap-4">
          <label>PRESITION</label>
          <Tooltip
            label={`${parseFloat(presition.toFixed(2))} % (${
              correct.length
            } correct / ${incorrect.length} incorrect)`}
          >
            <span className=" text-sprint-blue font-semibold ">
              {Math.trunc(presition)} %
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="col-span-2 row-span-4 col-start-6 row-start-5 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
        <PercentIcon className="absolute opacity-5 top-0 -left-3 w-60 -rotate-12 z-0 pointer-events-none " />
        <div className="flex flex-col items-center justify-center h-full gap-4 ">
          <label>RAW</label>
          <Tooltip label={`${parseFloat(raw.toFixed(2))} WPN`}>
            <span className=" text-sprint-blue font-semibold">
              {Math.trunc(raw)}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
    <footer className="text-center self-center mt-10 text-lg">
      <Link to="/login" className="underline">
        Sing in
      </Link>
      <span> to save your result</span>
    </footer>
  </article>
  )
}
