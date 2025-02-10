import { OptionsVerticalIcons } from '../icons/Icons'


export const ScoreModeTable = ({ records }) => {
    return (
        <div className="bg-sprint-config  rounded-md flex overflow-hidden">
            <div className=" justify-around w-min flex-1 p-5 grid grid-cols-2 md:grid-cols-4 gap-2 ">

                {
                    records.map(({ uid, modeSelected, wpm, precision }) => (
                        <div className="text-center px-2 " key={uid}>
                            <h4 className="text-xs">{modeSelected}</h4>
                            <h2 className="text-4xl font-bold">{wpm !== null ? wpm : '-'}</h2>
                            <h3 className="text-xl">{precision !== null ? `${precision}%` : '-'}</h3>
                        </div>
                    ))
                }
            </div>

            <div className="text-center  flex justify-center flex-col cursor-pointer hover:opacity-80 hover:bg-white transition">
                <OptionsVerticalIcons className="text-2xl " />
            </div>
        </div>
    )
}
