import { useAuth } from "../../hooks/useAuth"
import { AvatarIcon } from "../../icons/Icons"


export const UserPage = () => {

    const { photoURL, username, displayName } = useAuth()

    return (
        <section id="user-profile" className="container">
            <div className="bg-sprint-config w-full p-5 rounded-md flex gap-4">
                <div className="flex items-center gap-5">
                    {
                        photoURL
                            ? < img
                                className=" h-32 w-32 p-1 rounded-full ring-2 ring-slate-600 "
                                src={photoURL}
                                alt="Bordered avatar"
                            />

                            : <div className="relative  overflow-hidden  w-28 h-28 p-1 rounded-full ring-2 ring-slate-600">
                                <AvatarIcon className="absolute w-32 h-32 text-gray-400 -bottom-5  -left-2" />
                            </div>

                    }
                    <div>
                        <h2 className="text-2xl">{username}</h2>
                        {
                            displayName &&
                            <h2 className="text-lg">{displayName}</h2>
                        }

                    </div>

                </div>
                <div className="border-r-4 opacity-85 rounded-full border-gray-500"></div>
                <div className="flex items-center gap-5 justify-evenly flex-1">
                    <div>
                        <h2 className="text-1xl">Test completed</h2>
                        <h2 className="text-3xl text-sprint-blue">0</h2>
                    </div>
                    <div>
                        <h2 className="text-1xl">Test completed</h2>
                        <h2 className="text-3xl text-sprint-blue">0</h2>
                    </div>
                    <div>
                        <h2 className="text-1xl">Time typing</h2>
                        <h2 className="text-3xl text-sprint-blue">00:02:13</h2>
                    </div>

                </div>
            </div>
        </section>
    )
}
