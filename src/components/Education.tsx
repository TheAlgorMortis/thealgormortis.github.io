import fullMarks from "../assets/marks.json";
import "./Bodies.css";

/* Icon imports */
import { HiAcademicCap } from "react-icons/hi2";
import { FaUniversity } from "react-icons/fa";
import { BiSolidBusSchool } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { FaPython } from "react-icons/fa";
import { TbMathIntegralX } from "react-icons/tb";
import { FaDice } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { PiVectorTwoFill } from "react-icons/pi";
import { MdOutlineScience } from "react-icons/md";
import { FaJava } from "react-icons/fa";
import { TbMatrix } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import { SiTmux } from "react-icons/si";
import {
  SiNeovim,
  SiJupyter,
  SiDelphi,
  SiRstudioide,
  SiTypescript,
} from "react-icons/si";
import { MdCellWifi } from "react-icons/md";
import { TiFlowParallel } from "react-icons/ti";
import { AiFillOpenAI } from "react-icons/ai";
import { PiGraphBold } from "react-icons/pi";
import { FaGitlab, FaCalculator, FaHeart } from "react-icons/fa6";
import { BsRegex } from "react-icons/bs";
import { PiWaveSine } from "react-icons/pi";
import { FaPenAlt } from "react-icons/fa";
import { GiAfrica } from "react-icons/gi";
import { FaDna } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";
import { SiHaskell } from "react-icons/si";
import { FaGear } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { LuCodeXml } from "react-icons/lu";

/* Icon map for marks */
const componentMap = {
  CS1: FaPython,
  M: TbMathIntegralX,
  PTS: FaDice,
  PHY: FaBalanceScale,
  DS1: SiRstudioide,
  AM1: PiVectorTwoFill,
  SIC: MdOutlineScience,
  DSA: FaJava,
  MS: ImStatsDots,
  AM2: TbMatrix,
  CA: SiNeovim,
  DS2: SiJupyter,
  NET: MdCellWifi,
  CONC: TiFlowParallel,
  ML: AiFillOpenAI,
  AMD: PiGraphBold,
  WEB: SiTypescript,
  SE: FaGitlab,
  AUTO: BsRegex,
  FOU: PiWaveSine,
  ENG: FaPenAlt,
  AFR: GiAfrica,
  PRE: FaCalculator,
  LO: FaHeart,
  IT: SiDelphi,
  BIO: FaDna,
  CV: IoEyeSharp,
  FP: SiHaskell,
  PILER: FaGear,
  VDE: FaLock,
  AA: LuCodeXml,
};

/* Marks type */
type Marks = {
  id: number;
  name: string;
  mark: string;
  icon: string;
};

/**
 * The Education component
 */
export default function Education() {
  return (
    <>
      <h1 className="sectionHeading">
        University <FaUniversity />
      </h1>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">BSc (Hons) Computer Science</h2>
        <p>
          In 2026, I am studying my honours in Computer Science at Stellenbosch
          University. I am being funded through the Investec Tech Scholarship,
          as I was during the latter two years of my undergraduate degree.
        </p>
        <p>
          In my honours year, I will be doing a year-long Software Engineering
          project under the Supervision of Professor Lynette can Zijl. In this
          project, I will be using Computer Vision to scan images of LEGO
          instruction manuals, then generate animations of the LEGO set
          construction in Unity.
        </p>
        <p>
          This year, I will be working as a head project demi for a first year
          computer science, as well as a general demi for a third year machine
          learning module. Click the links below for more details on this.
        </p>
        <div className="flexRow">
          <a
            href="http://localhost:5173/skills/experience/employment/demi-project"
            className="outerButton"
          >
            Project Demi Experience
          </a>
          <a
            href="http://localhost:5173/skills/experience/employment/demi-ml"
            className="outerButton"
          >
            Machine Learning Demi Experience
          </a>
        </div>
      </div>
      <UniMarksPanel
        year={"Honours Modules"}
        marks1={fullMarks.Honours1}
        marks2={fullMarks.Honours2}
      />
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">
          BSc Computer Science (cum laude)
        </h2>
        <p>
          I currently hold a BSc Computer science (cum laude) from Stellenbosch
          university. Throughout my bachelors, I learned many skills that can be
          viewed on the Skills/Experience section of the website. Below I list
          the modules that I have done during the course, and their respective
          marks.
        </p>
        <p>
          During my studies, I was awarded a full cost scholarship by Investec
          Bank for my high academic achievement, allowing me to continue my
          studies from my second year onwards. After finishing my honours year,
          I will also be working for them.
        </p>
        <div className="flexRow">
          <a
            className="outerButton flexRow"
            href="./AcademicRecord.pdf"
            download="Academic-Record-Dylan-Reid"
          >
            <FaFileDownload />
            Download my Academic Record{" "}
          </a>
          <a
            className="outerButton flexRow"
            href="./BSC.pdf"
            download="BSC-Dylan-Reid"
          >
            <FaFileDownload />
            Download my BSc Certificate{" "}
          </a>
        </div>
      </div>
      <UniMarksPanel
        year={"3rd Year"}
        marks1={fullMarks.year3sem1}
        marks2={fullMarks.year3sem2}
      />
      <UniMarksPanel
        year={"2nd Year"}
        marks1={fullMarks.year2sem1}
        marks2={fullMarks.year2sem2}
      />
      <UniMarksPanel
        year={"1st Year"}
        marks1={fullMarks.year1sem1}
        marks2={fullMarks.year1sem2}
      />
      <h1 className="sectionHeading">
        High School <BiSolidBusSchool />
      </h1>
      <div className="sectionBlock">
        <h2 className="sectionBlockHeading">School Experience</h2>
        <p>
          I attended Fairmont High School, where I was first exposed to software
          development through Information Technology. From then, I always knew I
          was going to study software engineering.
        </p>
        <p>
          I came 7th place in my school for my matric result with an average of
          88,4%. I was awarded academic honours in Gr 12 and 11, and academic
          colours in Gr 10. My marks are shown below.
        </p>
        <a className="outerButton" href="./NSC.pdf" download="NSC-Dylan-Reid">
          <FaFileDownload />
          Download my NSC{" "}
        </a>
      </div>
      <NscMarks marks={fullMarks.NSC} />
    </>
  );
}

/** types for the Uni marks panel */
type UniMarksPanelProps = {
  year: string;
  marks1: Marks[];
  marks2: Marks[];
};

/**
 * A panel for university marks
 */
function UniMarksPanel({ year, marks1, marks2 }: UniMarksPanelProps) {
  return (
    <div className="sectionBlock">
      <h2 className="sectionBlockHeading"> {year}</h2>
      <div className="semesterGroup">
        <SemesterMarksPanel number={"1"} marks={marks1} />
        <SemesterMarksPanel number={"2"} marks={marks2} />
      </div>
    </div>
  );
}

/** Props for university semester marks */
type SemesterMarksPanelProps = {
  number: string;
  marks: Marks[];
};

/**
 * A panel for university semester marks
 */
function SemesterMarksPanel({ number, marks }: SemesterMarksPanelProps) {
  return (
    <div className="semester">
      <h3 className="sectionBlockHeading">Semester {number}</h3>
      <MarksMap marks={marks} />
    </div>
  );
}

/**
 * A panel for school marks
 */
function NscMarks({ marks }: MarksMapProps) {
  return (
    <div className="sectionBlock">
      <h2 className="sectionBlockHeading">NSC Final Marks</h2>
      <div className="semester">
        <MarksMap marks={marks} />
      </div>
    </div>
  );
}

/** Props for marks */
type MarksMapProps = {
  marks: Marks[];
};

/**
 * An individual marks list
 */
function MarksMap({ marks }: MarksMapProps) {
  return (
    <ul>
      {marks.map((mark) => {
        const Icon = componentMap[mark.icon];
        return (
          <li
            key={mark.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className="flexRow">
              {Icon && <Icon />} &nbsp; {mark.name}
            </span>
            <span>({mark.mark})</span>
          </li>
        );
      })}
    </ul>
  );
}
