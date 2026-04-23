import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  label: string;
}

export const Tooltip = ({ children, label }: TooltipProps) => {
  return (
    <div className="has-tooltip">
      <span className="tooltip rounded-sm shadow-lg py-1 -mt-10 px-4 text-lg cursor-pointer bg-[rgb(var(--tooltip-bg))] text-[rgb(var(--tooltip-fg))]">
        {label}
      </span>
      <p className=" text-sprint-blue font-semibold cursor-pointer">
        {children}
      </p>
    </div>
  );
};
