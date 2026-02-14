import "./Bodies.css";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
/**
 * The home component for the Dylan Reid Personal website.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Contact() {
  return (
    <>
      <h1 className="sectionHeading">
        Get In Touch
        <FaEnvelope />
      </h1>

      <a
        className="outerButton"
        href="https://wa.me/27837037502"
        target="_blank"
        rel="noreferrer"
      >
        <FaWhatsapp />
        WhatsApp me (Preferred)
      </a>
      <a className="outerButton" href="mailto:ddylanrreid@gmail.com">
        <FaEnvelope />
        Email me (ddylanrreid@gmail.com)
      </a>

      <a className="outerButton" href="tel:+27837037502">
        <FaPhone />
        Call me (083 703 7502)
      </a>
    </>
  );
}
