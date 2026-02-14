import skillsData from "../assets/skills.json";
import "./Bodies.css";

import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaBrain } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import { AiOutlineOpenAI } from "react-icons/ai";

/* react-icons */
import {
  FaPython,
  FaJava,
  FaHandshake,
  FaArrowRight,
  FaClock,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
  FaRecycle,
} from "react-icons/fa";
import { SiTmux } from "react-icons/si";
import {
  FaGitAlt,
  FaXmark,
  FaPiggyBank,
  FaTaxi,
  FaBook,
  FaEarthAfrica,
  FaNewspaper,
} from "react-icons/fa6";
import {
  SiTypescript,
  SiJupyter,
  SiGodotengine,
  SiAseprite,
  SiLatex,
} from "react-icons/si";
import { RiTeamFill, RiTerminalBoxFill } from "react-icons/ri";
import { GiBrain, GiCaptainHatProfile, GiAcorn } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { MdMovieCreation } from "react-icons/md";
import { BiSolidChess } from "react-icons/bi";
import { VscSnake } from "react-icons/vsc";

/* ---------- Types ---------- */

type UsedInRef = { category: string; id: string };

type PointLink = { name: string; link: string; icon?: string };
type PointText = { text: string };
type PointImage = { src: string; caption?: string };
type Point = PointLink | PointText | PointImage;

type SkillItem = {
  name: string;
  id: string;
  icon?: string;
  timeframe?: string;
  brief?: string;
  points?: Point[];
  usedIn?: UsedInRef[];
};

type ExperienceItem = {
  name: string;
  id: string;
  icon?: string;
  timeframe?: string;
  brief?: string;
  points?: Point[];
};

type SkillsJson = {
  skills: Record<string, SkillItem[]>;
  experience: Record<string, ExperienceItem[]>;
};

type Params = { category?: string; detail?: string };

const skills = skillsData as SkillsJson;

/* ---------- Icon map ---------- */

const componentMap: Record<string, React.ComponentType<any>> = {
  PYTHON: FaPython,
  JAVA: FaJava,
  TS: SiTypescript,
  GODOT: SiGodotengine,
  C: RiTerminalBoxFill,
  GIT: FaGitAlt,
  TEAMWORK: RiTeamFill,
  ADAPT: FaArrowRight,
  CT: GiBrain,
  INCL: FaHandshake,
  RESOURCE: GrResources,
  LEADERSHIP: GiCaptainHatProfile,
  TM: FaClock,
  PIX: SiAseprite,
  VIDEO: FaVideo,
  TMUX: SiTmux,
  INVEST: FaPiggyBank,
  TAXI: FaTaxi,
  BOOK: FaBook,
  MOVIE: MdMovieCreation,
  BOARD: BiSolidChess,
  JUPYTER: SiJupyter,
  WILDLIFE: FaEarthAfrica,
  MEDIA: FaNewspaper,
  ART: FaRecycle,
  SNAKE: VscSnake,
  LATEX: SiLatex,
  NUT: GiAcorn,
  BRAIN: FaBrain,
  DEMI: IoMdSchool,
  AI: AiOutlineOpenAI,
};

function getIcon(iconKey?: string) {
  if (!iconKey) return null;
  return componentMap[iconKey] ?? null;
}

/* ---------- Category display names ---------- */

const catMap: Record<string, string> = {
  // skills
  languages: "Languages",
  web_mobile: "Web & Mobile",
  tooling_workflow: "Tooling & Workflow",
  data_ml: "Data & ML",
  gamedev_creative: "Game Dev & Creative",
  soft: "Soft Skills",

  // experience
  teaching_assistant: "Teaching Assistant",
  hackathons_competitions: "Hackathons & Competitions",
  scholarships_mentorship: "Scholarships & Mentorship",
  projects_personal: "Personal Projects",
  projects_university: "University Projects",
  creative_nontech: "Creative / Non-tech",
  leadership_community: "Leadership & Community",
};

function titleCaseWords(s: string) {
  return s
    .split(" ")
    .filter(Boolean)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function prettyCategoryKey(key: string) {
  const cleaned = key.replaceAll("_", " ").replaceAll("-", " ");
  return titleCaseWords(cleaned);
}

function displayCategory(key: string) {
  return catMap[key] ?? prettyCategoryKey(key);
}

/* ---------- Point type guards ---------- */

function isPointLink(p: Point): p is PointLink {
  return (p as any).link !== undefined;
}
function isPointText(p: Point): p is PointText {
  return (p as any).text !== undefined;
}
function isPointImage(p: Point): p is PointImage {
  return (p as any).src !== undefined;
}

/* ---------- UX helpers ---------- */

/**
 * IMPORTANT: Only call this ONCE (in the parent).
 * If you call it again inside each modal, you can end up "stuck" with no scrolling.
 */
function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    // avoid layout shift when scrollbar disappears
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0)
      document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [locked]);
}

function useCloseOnEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
}

function scrollTop() {
  const scroller = document.querySelector(".body");
  scroller?.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Build maps from skills.usedIn ---------- */

function buildSkillsByExperience(data: SkillsJson) {
  const map = new Map<string, SkillItem[]>();

  Object.keys(data.skills ?? {}).forEach((skillCat) => {
    (data.skills[skillCat] ?? []).forEach((sk) => {
      (sk.usedIn ?? []).forEach((ref) => {
        const key = `${ref.category}:${ref.id}`;
        const arr = map.get(key) ?? [];
        if (!arr.some((x) => x.id === sk.id)) arr.push(sk);
        map.set(key, arr);
      });
    });
  });

  map.forEach((arr, k) => {
    arr.sort((a, b) => a.name.localeCompare(b.name));
    map.set(k, arr);
  });

  return map;
}

function buildExperienceIndex(data: SkillsJson) {
  const idx = new Map<string, ExperienceItem>();
  Object.keys(data.experience ?? {}).forEach((cat) => {
    (data.experience[cat] ?? []).forEach((e) => {
      idx.set(`${cat}:${e.id}`, e);
    });
  });
  return idx;
}

/* =======================================================================
   Main component
======================================================================= */

export default function Skills() {
  const { category: categoryParam, detail } = useParams<Params>();
  const location = useLocation();
  const navigate = useNavigate();

  const tab: "skills" | "experience" = location.pathname.includes("/experience")
    ? "experience"
    : "skills";

  const categories = Object.keys((skills as any)?.[tab] ?? {});
  const category =
    categoryParam && categories.includes(categoryParam)
      ? categoryParam
      : categories[0];

  const list: Array<SkillItem | ExperienceItem> = ((skills as any)?.[tab]?.[
    category
  ] ?? []) as any[];

  const isModalOpen = Boolean(detail);

  // Body scroll lock only here (parent)
  useLockBodyScroll(isModalOpen);
  useCloseOnEscape(isModalOpen, () => navigate(-1));

  const experienceIndex = useMemo(() => buildExperienceIndex(skills), []);
  const skillsByExperience = useMemo(() => buildSkillsByExperience(skills), []);

  // Mobile prev/next category
  const activeIndex = Math.max(0, categories.indexOf(category));
  const prevCategory = categories.length
    ? categories[(activeIndex - 1 + categories.length) % categories.length]
    : category;
  const nextCategory = categories.length
    ? categories[(activeIndex + 1) % categories.length]
    : category;

  const selectedEntry = useMemo(() => {
    if (!detail) return null;
    return (list as any[]).find((x) => x.id === detail) ?? null;
  }, [detail, list]);

  const switchTarget =
    tab === "skills"
      ? "/skills/experience/teaching_assistant"
      : "/skills/skills/languages";
  const switchLabel = tab === "skills" ? "Experience" : "Skills";

  const openModal = (id: string) => {
    navigate(`/skills/${tab}/${category}/${id}`, {
      state: { background: location },
    });
    scrollTop();
  };

  const closeModal = () => {
    navigate(-1);
    scrollTop();
  };

  return (
    <div className="skillsPage">
      {/* Header */}
      <div className="skillsHeaderBar">
        <div className="skillsHeaderTitle">
          <h2 className="sectionHeading">
            {tab === "skills" ? "Skills" : "Experience"}
          </h2>
        </div>

        <div className="skillsTabSwitchDesktop">
          <button
            className="outerButton skillsSwitchButton"
            onClick={() => navigate(switchTarget)}
          >
            {switchLabel}
          </button>
        </div>
      </div>

      <div className="skillsPanel">
        {/* Desktop category pills */}
        <div className="skillsCategoryBar skillsCategoryBarDesktop">
          {categories.map((catKey) => {
            const active = catKey === category;
            return (
              <button
                key={catKey}
                className={`outerButton skillsCategoryButton ${
                  active ? "skillsCategoryButtonActive" : ""
                }`}
                onClick={() => {
                  navigate(`/skills/${tab}/${catKey}`);
                  scrollTop();
                }}
              >
                {displayCategory(catKey)}
              </button>
            );
          })}
        </div>

        {/* Mobile category nav */}
        <div className="skillsCategoryNavMobile">
          <button
            className="outerButton skillsCategoryNavArrow"
            onClick={() => {
              navigate(`/skills/${tab}/${prevCategory}`);
              scrollTop();
            }}
            aria-label="Previous category"
            title="Previous category"
          >
            <FaChevronLeft />
          </button>

          <h3 className="sectionHeading skillsCategoryNavTitle">
            {displayCategory(category)}
          </h3>

          <button
            className="outerButton skillsCategoryNavArrow"
            onClick={() => {
              navigate(`/skills/${tab}/${nextCategory}`);
              scrollTop();
            }}
            aria-label="Next category"
            title="Next category"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Desktop title row */}
        <div className="skillsCategoryTitleRow skillsCategoryTitleRowDesktop">
          <h3 className="sectionHeading skillsCategoryTitle">
            {displayCategory(category)}
          </h3>
        </div>

        {/* Mobile bottom switch */}
        <div className="skillsTabSwitchMobile">
          <button
            className="outerButton skillsTabButton skillsSwitchButton"
            onClick={() => navigate(switchTarget)}
          >
            {switchLabel}
          </button>
        </div>

        {/* Grid */}
        <div className="skillSet">
          {list.map((entry: any) => (
            <Card
              key={entry.id ?? entry.name}
              tab={tab}
              entry={entry}
              onOpen={() => openModal(entry.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      {isModalOpen && detail && selectedEntry && (
        <div
          className="skillsModalBackdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {tab === "skills" ? (
            <SkillUsedInModal
              skill={selectedEntry as SkillItem}
              experienceIndex={experienceIndex}
              onClose={closeModal}
              onOpenExperience={(ref) => {
                navigate(`/skills/experience/${ref.category}/${ref.id}`, {
                  state: { background: location },
                });
                scrollTop();
              }}
            />
          ) : (
            <ExperienceModal
              exp={selectedEntry as ExperienceItem}
              expCategory={category}
              skillsByExperience={skillsByExperience}
              onClose={closeModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

/* =======================================================================
   Cards
======================================================================= */

function Card({
  tab,
  entry,
  onOpen,
}: {
  tab: "skills" | "experience";
  entry: SkillItem | ExperienceItem;
  onOpen: () => void;
}) {
  const Icon = getIcon(entry.icon);

  const isSkill = tab === "skills";
  const usedInCount = isSkill ? ((entry as SkillItem).usedIn?.length ?? 0) : 0;

  // Skills: only show button if it has usedIn
  const showButton = isSkill ? usedInCount > 0 : true;

  return (
    <div className="skillBlock">
      <div className="skillsCardHeader">
        <div className="skillsCardTitleRow">
          {Icon && (
            <span className="skillsIcon">
              <Icon />
            </span>
          )}
          <h3 className="skillsCardTitle">{entry.name}</h3>
        </div>
        {entry.timeframe && (
          <div className="skillsCardMeta">{entry.timeframe}</div>
        )}
      </div>

      {entry.brief && <p className="skillsCardBrief">{entry.brief}</p>}

      <div className="skillsCardActions">
        {showButton && (
          <button className="outerButton skillsCardButton" onClick={onOpen}>
            {isSkill ? "Where this skill was used" : "More"}
          </button>
        )}
      </div>
    </div>
  );
}

/* =======================================================================
   Skill Used In Modal
======================================================================= */

function SkillUsedInModal({
  skill,
  experienceIndex,
  onClose,
  onOpenExperience,
}: {
  skill: SkillItem;
  experienceIndex: Map<string, ExperienceItem>;
  onClose: () => void;
  onOpenExperience: (ref: UsedInRef) => void;
}) {
  // Do NOT lock body scroll here (parent already does it)
  useCloseOnEscape(true, onClose);

  const Icon = getIcon(skill.icon);
  const used = skill.usedIn ?? [];

  return (
    <div
      className="skillsModal"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Sticky bar that contains close + title + subtitle */}
      <div className="skillsModalTopBar">
        <div className="skillsModalHeaderText">
          <h3 className="skillsModalTitle">
            {Icon && <Icon />}
            {skill.name}
          </h3>
          <div className="skillsModalSubtitle">Where this skill was used</div>
        </div>

        <button
          className="skillsModalClose"
          onClick={onClose}
          aria-label="Close"
        >
          <FaXmark />
        </button>
      </div>

      {/* scrollable body content */}
      <div className="skillsModalBody">
        <div className="skillsModalIntroRow">
          {skill.brief && <p className="skillsModalBrief">{skill.brief}</p>}
        </div>

        {used.length === 0 ? (
          <div className="skillsEmptyHint">No linked experiences yet.</div>
        ) : (
          <div className="skillsUsedInList">
            {used.map((ref) => {
              const exp = experienceIndex.get(`${ref.category}:${ref.id}`);
              if (!exp) return null;
              const ExpIcon = getIcon(exp.icon);

              return (
                <button
                  key={`${ref.category}:${ref.id}`}
                  className="outerButton skillsUsedInButton"
                  onClick={() => onOpenExperience(ref)}
                >
                  {ExpIcon && (
                    <span className="skillsUsedInIcon">
                      <ExpIcon />
                    </span>
                  )}
                  <span className="skillsUsedInText">
                    <span className="skillsUsedInName">{exp.name}</span>
                    <span className="skillsUsedInMeta">
                      {exp.timeframe ?? displayCategory(ref.category)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =======================================================================
   Experience Modal
======================================================================= */

function ExperienceModal({
  exp,
  expCategory,
  skillsByExperience,
  onClose,
}: {
  exp: ExperienceItem;
  expCategory: string;
  skillsByExperience: Map<string, SkillItem[]>;
  onClose: () => void;
}) {
  // Do NOT lock body scroll here (parent already does it)
  useCloseOnEscape(true, onClose);

  const Icon = getIcon(exp.icon);

  const key = `${expCategory}:${exp.id}`;
  const linkedSkills = skillsByExperience.get(key) ?? [];

  return (
    <div
      className="skillsModal"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Sticky bar that contains close + title + subtitle */}
      <div className="skillsModalTopBar">
        <div className="skillsModalHeaderText">
          <h3 className="skillsModalTitle">
            {Icon && <Icon />}
            {exp.name}
          </h3>
          <div className="skillsModalSubtitle">
            {exp.timeframe ?? displayCategory(expCategory)}
          </div>
        </div>

        <button
          className="skillsModalClose"
          onClick={onClose}
          aria-label="Close"
        >
          <FaXmark />
        </button>
      </div>

      {/* scrollable body content */}
      <div className="skillsModalBody">
        <div className="skillsModalIntroRow">
          {exp.brief && <p className="skillsModalBrief">{exp.brief}</p>}
        </div>

        {(exp.points ?? []).length > 0 && (
          <div className="skillsPoints">
            {(exp.points ?? []).map((p, idx) => (
              <PointView key={idx} point={p} />
            ))}
          </div>
        )}

        {linkedSkills.length > 0 && (
          <div className="skillsExperienceSkills">
            <div className="skillsExperienceSkillsTitle">Skills used</div>
            <ul className="skillsExperienceSkillsList">
              {linkedSkills.map((s) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* =======================================================================
   Point renderer
======================================================================= */

function PointView({ point }: { point: Point }) {
  if (isPointText(point)) {
    return (
      <div className="skillsPoint">
        <p>{point.text}</p>
      </div>
    );
  }

  if (isPointLink(point)) {
    const Icon = getIcon(point.icon);
    return (
      <div className="skillsPoint">
        <a
          className="outerButton skillsLinkButton"
          href={point.link}
          target="_blank"
          rel="noreferrer"
        >
          {Icon && <Icon />}
          {point.name}
        </a>
      </div>
    );
  }

  if (isPointImage(point)) {
    return (
      <div className="skillsPoint">
        {point.caption && (
          <div className="skillsImageCaption">{point.caption}</div>
        )}
        <div className="skillsPointImage">
          <img
            className="blogPicture"
            src={`/${point.src}`}
            alt={point.caption ?? "Experience image"}
          />
        </div>
      </div>
    );
  }

  return null;
}
