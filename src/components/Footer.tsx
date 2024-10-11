import { Link } from "react-router-dom"
import {  GithubIcon, LinkedinIcon } from "../icons/Icons"


export const Footer = () => {
  return (
    <footer className="mt-auto flex w-full p-5 gap-3 ">
        <Link to='https://github.com/JeanCornelio' target="_blank" >
             <span className="flex gap-2 items-center text-sm">  
             <GithubIcon/>
                Github 
             </span>
        </Link>
        <Link to='https://www.linkedin.com/in/jeancornelio/' target="_blank" >
             <span className="flex gap-2 items-center text-sm">  
             <LinkedinIcon/>
                Linkedin 
             </span>
        </Link>
        <span className="text-sm ms-auto">By: Jean Cornelio with 💓</span>
    </footer>
   
  )
}
