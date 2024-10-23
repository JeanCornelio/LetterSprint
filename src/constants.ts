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
    
export const CORRECT_SOUND = new Audio('src/assets/sounds/correct.mp3')
export const ERROR_SOUND = new Audio('src/assets/sounds/error.mp3')
export const TIME_OVER = new Audio('src/assets/sounds/time_over.mp3')