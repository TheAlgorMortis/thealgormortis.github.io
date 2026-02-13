import "./Bodies.css";
import { TiWorld } from "react-icons/ti";
import { MdDarkMode } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { FaFireAlt } from "react-icons/fa";
/**
 * The home component for the Dylan Reid Personal website.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Home() {
  return (
    <>
      <h1 className="sectionHeading">
        Welcome to Dylan Reid's Personal Website!
        <RiRobot3Fill />
      </h1>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          Tomorrow Is My Canvas
          <FaFireAlt />
        </h2>
        <p>
          I am a passionate creator, whether it be through developing software,
          writing novels, or producing video games. I am constantly learning new
          skills, which I intend to use with my out-of-the-box thinking to solve
          real world problems. I strive to create media and tools that will aid
          or entertain others. I am enthusiastic, buoyant, and optimistic, with
          relentless determination and ambition. I am reliable and responsible,
          and I care deeply about others. I aim to work towards a green and
          progressive future.
        </p>
        <h2 className="sectionBlockHeading">
          Current Endeavours
          <HiAcademicCap />
        </h2>
        <p>
          I am currently studying my Honours in Computer Science at Stellenbosch
          Universtiy. Next year, I will be working as a Software Engineer at
          Investec Bank.
        </p>
      </div>
    </>
  );
}
