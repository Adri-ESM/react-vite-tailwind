import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function Back() {
  return (
    <div>
      <FontAwesomeIcon
      className="arrow text-2xl cursor-pointer mt-10"
      icon={faArrowLeft}
      onClick={ () => window.history.back()}
    />
    </div>
  )
}
