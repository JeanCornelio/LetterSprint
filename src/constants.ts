import correctSoundSrc from './assets/sounds/correct.mp3'
import errorSoundSrc from './assets/sounds/error.mp3'
import timeOverSoundSrc from './assets/sounds/time_over.mp3'

export const  MODES =  {
    time: 'time',
    words: 'words',
    quote: 'quote',
}
export const  TIMER =  {
    start: 'start',
    reset: 'reset',
    pause: 'pause',
    finished:'finished'
}
export const  TIMES =  {
    0: 0,
    15: 15,
    30: 30,
    60: 60,
    120:120,
}
export const  WORDS =  {
    10: 10,
    25: 25,
    50: 50,
    100: 100,
}

export const LANGUAGES = {
    en: "English",
    es: "Español",
}
    
export const CORRECT_SOUND = new Audio(correctSoundSrc)
export const ERROR_SOUND = new Audio(errorSoundSrc)
export const TIME_OVER = new Audio(timeOverSoundSrc)
