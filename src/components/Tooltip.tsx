import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  label: string;
}

export const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <div className="has-tooltip">
      <span className="tooltip rounded-sm shadow-lg py-1 bg-slate-950  text-white -mt-10 px-4 text-lg cursor-pointer">
        {label}
      </span>
      <p className=" text-sprint-blue font-semibold cursor-pointer">
        {children}
      </p>
    </div>
  );
};