export const Tooltip = ({ children, label }) => {
  return (
    <div className="has-tooltip">
      <span className="tooltip rounded-sm shadow-lg py-1 bg-slate-950 text-white -mt-8 px-4 text-lg animate-fade-in-bottom">
        {label}
      </span>
      <p className=" text-sprint-blue font-semibold cursor-pointer">
        {children}
      </p>
    </div>
  );
};
