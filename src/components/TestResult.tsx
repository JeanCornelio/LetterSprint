import { Link } from 'react-router-dom'
import { LetterADiamondIcon, PercentIcon, TargetIcon, TimeIcon } from '../icons/Icons'
import { Tooltip } from './Tooltip'
import { useTestConfiguration } from '../hooks/useTestConfiguration';
import { MODES } from '../constants';
import { useTimer } from '../hooks/useTimer';
import { useAuth } from '../hooks/useAuth';


export const TestResult = ({ testReultValues }) => {

  const { correct, incorrect, extra, missed, netWpm, totalWords, presition, raw, seconds } = testReultValues;
  const { mode } = useTestConfiguration();
  const { timeSelected } = useTimer()
  const { state } = useAuth()
  console.log(state)
  return (
    <article
      id="result"
      className="animate-fade-in-bottom text-4xl flex flex-col gap-5"
    >
      <div className="grid grid-cols-7 grid-rows-8 gap-4">
        <div className="col-span-7 row-span-2  md:col-span-3 md:row-span-4 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <LetterADiamondIcon className="absolute opacity-5 -left-5 md:-left-10 w-40  md:w-96 -rotate-12 md:-top-8  pointer-events-none " />
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
        <div className="col-span-7 row-span-2 row-start-3 md:col-span-2 md:row-span-3 md:col-start-4  bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <TimeIcon className="absolute opacity-5 top-8  md:top-0 left-0 md:left-0  w-32 md:w-52   pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>TIME</label>
            <span className=" text-sprint-blue font-semibold ">
              {mode === MODES["time"] ? timeSelected : seconds}s
            </span>
          </div>
        </div>

        <div className=" col-span-7 row-span-2 row-start-5 md:col-span-2  md:row-span-4 md:col-start-6  md:row-start-1 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <PercentIcon className="absolute opacity-5 top-8 md:top-0 -left-3 md:-left-3 w-32 md:w-60 -rotate-12  pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>WPM</label>
            <Tooltip label={`${parseFloat(netWpm.toFixed(2))} WPN`}>
              <span className=" text-sprint-blue font-semibold">
                {Math.trunc(netWpm)} %
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-7 md:col-span-3 md:row-span-4 md:col-start-1 md:row-start-5 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <LetterADiamondIcon className="absolute opacity-5 -left-5 md:-left-10 w-40 md:w-96 -rotate-12 md:-top-8  pointer-events-none " />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>WORDS</label>
            <span className=" text-sprint-blue font-semibold ">
              {totalWords}
            </span>
          </div>
        </div>
        <div className="col-span-7 row-span-2 row-start-9 md:col-span-2 md:row-span-5 md:col-start-4 md:row-start-4 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <TargetIcon className="absolute opacity-5 -bottom-5 md:-bottom-20 left-0 w-32 md:w-72 pointer-events-none" />
          <div className="flex flex-col items-center justify-center h-full  gap-4">
            <label>PRESITION</label>
            <Tooltip
              label={`${parseFloat(presition.toFixed(2))} % (${correct.length
                } correct / ${incorrect.length} incorrect)`}
            >
              <span className=" text-sprint-blue font-semibold ">
                {Math.trunc(presition)} %
              </span>
            </Tooltip>
          </div>
        </div>
        <div className=" col-span-7 row-span-2 row-start-11 md:col-span-2 md:row-span-4 md:col-start-6 md:row-start-5 bg-sprint-config rounded-md p-5 relative overflow-hidden select-none">
          <PercentIcon className="absolute opacity-5 top-8 md:top-0 -left-3 md:-left-3 w-32 md:w-60 -rotate-12  pointer-events-none" />
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

      {state === 'not_authenticated' &&
        <footer className="text-center self-center mt-10 text-lg">
          <Link to="/login" className="underline">
            Sing in
          </Link>
          <span> to save your result</span>
        </footer>
      }
    </article>
  )
}
