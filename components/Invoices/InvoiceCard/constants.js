import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { INVOICE_STATUSES } from "models";

export const STATUSES = {
  [INVOICE_STATUSES.EmailCompleted]: {
    text: "✅ Email Sent",
  },
  [INVOICE_STATUSES.EmailInProgress]: {
    text: (
      <>
        <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
        Sending Email
      </>
    ),
  },
};
