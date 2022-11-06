import { INVOICE_STATUSES } from "../../models";

export const randomInvoice = () => {
  return {
    id: Math.random() * 100 + 1,
    customer: {
      name: "Earl Construction Ltd.",
      address: "197 Sunnynook Road",
    },
    createdDate: "2022-11-02",
    totalCostNzd: "800",
    status: "EMAIL_IN_PROGRESS",
  };
};

export const getInProgressInvoice = () => {
  const invoice = randomInvoice();
  invoice.status = INVOICE_STATUSES.EmailInProgress.name;
  return invoice;
};

export const getCompletedInvoice = () => {
  const invoice = randomInvoice();
  invoice.status = INVOICE_STATUSES.EmailCompleted.name;
  return invoice;
};
