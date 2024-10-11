import { AtIcon, ClockIcon,  HealthiconsAIcon, NumberIcon, QuoteIcon, ToolsIcon,  } from "../icons/Icons";

export const TestConfiguration = () => {
  return (
    <section id="testConfig" className="mt-10  flex justify-center ">
      <div className="flex gap-5 bg-sprint-config p-2 px-5 rounded-md justify-center md:w-100 ">
      <li className="flex gap-5">
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1">
              {" "}
              <AtIcon className="text-md" /> Puntuation
            </span>
          </ul>
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1">
              {" "}
              <NumberIcon className="text-md" />  Numbers
            </span>
          </ul>
        </li>
      <div className="border-r-2 rounded-full border-gray-400"></div>
        <li className="flex gap-5">
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1">
            
              <HealthiconsAIcon className="text-md" /> Words
            </span>
          </ul>
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1">
              {" "}
              <QuoteIcon className="text-md" /> quote
            </span>
          </ul>

          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1">
              {" "}
              <ClockIcon className="text-sm" /> time
            </span>
          </ul>
        </li>
        <div className="border-r-2 rounded-full border-gray-400"></div>
        <li className="flex gap-5 items-center">
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1 text-sm"> 15 </span>
          </ul>
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1 text-sm"> 30</span>
          </ul>

          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1 text-sm">60</span>
          </ul>
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1 text-sm">120</span>
          </ul>
          <ul className="cursor-pointer hover:text-sprint-blue transition">
            <span className="flex items-center gap-1 text-md">
              <ToolsIcon />
            </span>
          </ul>
        </li>
      </div>
    </section>
  );
};
