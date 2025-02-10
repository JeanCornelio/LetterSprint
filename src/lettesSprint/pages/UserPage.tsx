import { HistoricalScoreTable } from "../../components/HistoricalScoreTable";
import { ScoreModeTable } from "../../components/ScoreModeTable";
import { useAuth } from "../../hooks/useAuth";
import { useResult } from "../../hooks/useResult";
import { AvatarIcon } from "../../icons/Icons";


/* const timeRecord = [
    {
        mode: '15 Seconds',
        wpm: '58',
        pre: '100',
        raw: '58',
        id: 1,
    },
    {
        mode: '30 Seconds',
        wpm: '38',
        pre: '90',
        raw: '58',
        id: 2,
    },
    {
        mode: '60 Seconds',
        wpm: null,
        pre: null,
        raw: null,
        id: 3,
    },
    {
        mode: '120 Seconds',
        wpm: null,
        pre: null,
        raw: null,
        id: 4,
    },
]
const wordRecord = [
    {
        mode: '10 Words',
        wpm: '58',
        pre: '100',
        raw: '58',
        id: 1,
    },
    {
        mode: '25 Words',
        wpm: null,
        pre: null,
        raw: null,
        id: 2,
    },
    {
        mode: '50 Words',
        wpm: null,
        pre: null,
        raw: null,
        id: 3,
    },
    {
        mode: '100 Words',
        wpm: null,
        pre: null,
        raw: null,
        id: 4,
    },
] */


export const UserPage = () => {
    const { photoURL, username, displayName, stats } = useAuth();
    const { tests, setLmt } = useResult()


    return (
        <section id="user-profile" className="container flex flex-col gap-5 animate-fade-in">
            <div className="bg-sprint-config w-full p-5 rounded-md flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-5">
                    {photoURL ? (
                        <img
                            className="w-20   md:w-32 p-1 rounded-full ring-2 ring-slate-600 "
                            src={photoURL}
                            alt="Bordered avatar"
                        />
                    ) : (
                        <div className="relative  overflow-hidden  w-28 h-28 p-1 rounded-full ring-2 ring-slate-600">
                            <AvatarIcon className="absolute w-32 h-32 text-gray-400 -bottom-5  -left-2" />
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">{username}</h2>
                        {displayName && <h2 className="text-lg">{displayName}</h2>}
                    </div>
                </div>
                <div className="border-r-4  rounded-full border-x-sprint-home hidden sm:flex"></div>
                <div className=" flex-1 flex flex-wrap  sm:items-center gap-5 md:justify-evenly ">
                    <div>
                        <h2 className="text-1xl">Test completed</h2>
                        <h2 className="text-3xl text-sprint-blue font-bold">{stats.testsCompleted}</h2>
                    </div>
                    <div>
                        <h2 className="text-1xl">Total words</h2> {/* Remember implement a pipe to number */}
                        <h2 className="text-3xl text-sprint-blue font-bold">{stats.wordsWritten}</h2>
                    </div>
                    <div>
                        <h2 className="text-1xl">Time typing</h2>
                        <h2 className="text-3xl text-sprint-blue font-bold">{stats.timeTyping}</h2>
                    </div>
                </div>
            </div>
            {
                stats.testsCompleted > 0 && <div className="grid grid-col-1  lg:grid-cols-2 gap-5">
                    <ScoreModeTable records={stats.timeRecord} />
                    <ScoreModeTable records={stats.wordRecord} />
                </div>
            }

            {

                stats.testsCompleted > 0 ? <HistoricalScoreTable tests={tests} /> : <h2 className="text-2xl text-center mt-5">No tests completed yet</h2>
            }

            {
                stats.testsCompleted > tests.length && <button className="p-3 rounded-md bg-sprint-config cursor-pointer hover:opacity-80 hover:bg-white transition" onClick={() => setLmt()}>Load More</button>
            }

        </section>
    );
};
