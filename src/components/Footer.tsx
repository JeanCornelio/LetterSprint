import { Link } from "react-router-dom"
import { GithubIcon, LinkedinIcon } from "../icons/Icons"


export const Footer = () => {
  return (
    <footer className="mt-auto flex flex-wrap w-full py-5 px-2 md:px-0 gap-3 max-h-24 justify-center">
      <div className="flex gap-3">
        <Link to='https://github.com/JeanCornelio' target="_blank" >
          <span className="flex gap-2 items-center text-sm hover:text-sprint-blue transition">
            <GithubIcon />
            Github
          </span>
        </Link>
        <Link to='https://www.linkedin.com/in/jeancornelio/' target="_blank" >
          <span className="flex gap-2 items-center text-sm hover:text-sprint-blue transition">
            <LinkedinIcon />
            Linkedin
          </span>
        </Link>
      </div>

      <span className="text-sm md:ms-auto">By: Jean Cornelio with 💓</span>
    </footer>

  )
}
