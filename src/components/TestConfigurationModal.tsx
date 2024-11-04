import { Button, Dialog, Modal } from "react-aria-components";
import { SettingsIcon } from "../icons/Icons";
import { useState } from "react";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { MODES, TIMES, WORDS } from "../constants";
import { MODE, TIME, WORD } from "../types/Text";
import { useTimer } from "../hooks/useTimer";

export const TestConfigurationModal = () => {
    const [isOpen, setOpen] = useState(false);
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

    const defaultClass = " hover:bg-sprint-blue hover:text-white py-2  rounded-md transition ";
    const active = " bg-sprint-blue text-white ";
    const { timerState } = useTimer();

    console.log(isPuntuatioActive)
    return (
        <>
            <Button
                className="flex gap-5 md:hidden bg-sprint-config p-2 px-5 rounded-md justify-center w-72 hover:bg-sprint-blue hover:text-white transition"
                onPress={() => setOpen(true)}
            >
                <span className="flex items-center gap-1">
                    <SettingsIcon className="text-lg" /> Test settings
                </span>
            </Button>
            <Modal isDismissable isOpen={isOpen} onOpenChange={setOpen}>
                <Dialog className="bg-sprint-home p-4 md:p-5 rounded-lg flex flex-col min-w-80 gap-3 text-lg font-semibold animate-fade-in">
                    <button className={defaultClass + (isPuntuatioActive ? active : "bg-sprint-config")} onClick={puntuationToggle}>

                        Puntuation
                    </button>
                    <button className={defaultClass + (isNumberactive ? active : "bg-sprint-config")} onClick={numberToggle}>
                        Numbers
                    </button>

                    <div className="flex flex-col gap-3 mt-5">
                        <button
                            className={defaultClass + (MODES["time"] === mode ? active : "bg-sprint-config")}
                            onClick={() => setMode("time")}
                        >
                            Time
                        </button>
                        <button
                            className={defaultClass + (MODES["words"] === mode ? active : "bg-sprint-config")}
                            onClick={() => setMode("words")}
                        >
                            Word
                        </button>
                    </div>

                    {MODES[mode as MODE] === "time" && (
                        <div id="time-mode" className="flex flex-col gap-3 mt-5 ">
                            {Object.entries(TIMES).slice(1).map(([key, time]) => (

                                <button key={key} onClick={() => setTime(Number(key) as TIME)} className={
                                    defaultClass +
                                    (TIMES[timeActive as TIME] === time ? active : "bg-sprint-config")
                                }>
                                    {time}
                                </button>

                            ))}
                        </div>

                    )}

                    {MODES[mode as MODE] === "words" && (
                        <div id="word-mode" className="flex flex-col gap-3 mt-5">
                            {Object.entries(WORDS).map(([key, quantity]) => (

                                <button key={key} onClick={() => setWordQuantity(Number(key) as WORD)} className={
                                    defaultClass +
                                    (WORDS[words as WORD] === quantity ? active : "bg-sprint-config")
                                }>
                                    {quantity}
                                </button>

                            ))}

                        </div>
                    )}
                </Dialog>
            </Modal>
        </>
    );
};
