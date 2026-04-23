import { useRef, useState } from "react";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { LANGUAGES } from "../constants";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { TypingLanguage } from "../interfaces/testConfiguration";
import { LanguageIcon } from "../icons/Icons";
import { UI_LABELS } from "../constants/uiLabels";

const LANGUAGE_FLAGS: Record<TypingLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
};

const LANGUAGE_CODES: Record<TypingLanguage, string> = {
  en: "EN",
  es: "ES",
};

export const LanguageOptions = () => {
  const { language, setLanguage } = useTestConfiguration();
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

  const handleLanguageSelect = (targetLanguage: TypingLanguage) => {
    setLanguage(targetLanguage);
    handleOpenChange(false);
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        ref={triggerRef}
        aria-label={labels.nav.openLanguageMenu}
        className="p-1 rounded-full hover:text-sprint-blue transition  hidden md:block ">
        <LanguageIcon className="text-2xl" />
      </Button>

      <Popover>
        <Dialog className="rounded-md w-25 overflow-hidden bg-sprint-config text-sprint-foreground shadow-lg shadow-black/5">
          <div className="flex flex-col text-sm">
            {(Object.keys(LANGUAGES) as TypingLanguage[]).map((key) => {
              const isActive = language === key;

              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isActive}
                  className={
                    "flex items-center gap-2 px-3 py-2 text-left transition " +
                    (isActive
                      ? "bg-sprint-blue/15 text-sprint-blue font-semibold"
                      : "hover:bg-sprint-surface-hover/35")
                  }
                  onClick={() => handleLanguageSelect(key)}>
                  <span aria-hidden>{LANGUAGE_FLAGS[key]}</span>
                  <span>{LANGUAGE_CODES[key]}</span>
                </button>
              );
            })}
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
