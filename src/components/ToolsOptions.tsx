import { useRef, useState } from "react";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { ToolsIcon } from "../icons/Icons";
import { UI_LABELS } from "../constants/uiLabels";

export const ToolsOptions = () => {
  const { soundEffects, soundEffectsToggle, language } = useTestConfiguration();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const labels = UI_LABELS[language];

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      window.setTimeout(() => {
        triggerRef.current?.blur();
      }, 0);
    }
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        ref={triggerRef}
        aria-label={labels.openTools}
        className="p-1 rounded-full hover:text-sprint-blue transition  hidden md:block ">
        <ToolsIcon className="text-2xl" />
      </Button>

      <Popover>
        <Dialog className="rounded-md w-32 overflow-hidden  bg-sprint-config text-sprint-foreground shadow-lg shadow-black/5 ">
          <div className="px-3 py-2 flex items-center justify-between text-sm">
            <span>{labels.sound}</span>
            <button
              type="button"
              role="switch"
              aria-checked={soundEffects}
              className={
                "w-10 h-6 rounded-full p-1 transition " +
                (soundEffects ? "bg-sprint-blue" : "bg-slate-400")
              }
              onClick={soundEffectsToggle}>
              <span
                className={
                  "block w-4 h-4 rounded-full bg-white transition " +
                  (soundEffects ? "translate-x-4" : "translate-x-0")
                }
              />
            </button>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
