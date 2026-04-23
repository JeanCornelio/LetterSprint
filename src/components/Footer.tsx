import { Link } from "react-router-dom"
import { GithubIcon, LinkedinIcon } from "../icons/Icons"
import { useTestConfiguration } from "../hooks/useTestConfiguration"
import { UI_LABELS } from "../constants/uiLabels"


export const Footer = () => {
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  return (
    <footer className="mt-auto flex flex-wrap w-full py-5 px-2 md:px-0 gap-3 max-h-24 justify-center">
      <div className="flex gap-3">
        <Link to='https://github.com/JeanCornelio' target="_blank" >
          <span className="flex gap-2 items-center text-sm hover:text-sprint-blue transition">
            <GithubIcon />
            {labels.utility.github}
          </span>
        </Link>
        <Link to='https://www.linkedin.com/in/jeancornelio/' target="_blank" >
          <span className="flex gap-2 items-center text-sm hover:text-sprint-blue transition">
            <LinkedinIcon />
            {labels.utility.linkedin}
          </span>
        </Link>
      </div>

      <span className="text-sm md:ms-auto">{labels.utility.byAuthor}</span>
    </footer>

  )
}
