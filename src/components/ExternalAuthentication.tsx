
import { GithubIcon, GoogleIcon } from '../icons/Icons'

export const ExternalAuthentication = ({ onSignInWithGoogle, onSignWithGithub }) => {
    return (
        <div className="flex flex-col w-full gap-4 mb-4 ">
            <button className="border border-1 border-gray-700 p-4 rounded-md  hover:border-sprint-blue hover:text-sprint-blue transition" onClick={() => onSignInWithGoogle()}>
                <span className="flex gap-3 items-center ">
                    <GoogleIcon className="text-xl" />
                    Sign in with Google
                </span>
            </button>
            <button className="border border-1 border-gray-700 p-4  rounded-md  hover:border-sprint-blue hover:text-sprint-blue transition" onClick={() => onSignWithGithub()}>
                <span className="flex gap-2 items-center ">
                    <GithubIcon className="text-xl" />
                    Github
                </span>
            </button>
        </div>
    )
}
