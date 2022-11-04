import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const STATUSES = {
  EMAIL_COMPLETED: {
    text: "✅ Email Sent",
  },
  EMAIL_IN_PROGRESS: {
    text: (
      <>
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
        Sending Email
      </>
    ),
  },
};
