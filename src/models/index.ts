export const INVOICE_STATUSES = Object.freeze({
  EmailInProgress: "EMAIL_IN_PROGRESS",
  EmailCompleted: "EMAIL_COMPLETED",
});

export type Invoice = {
  customer: {
    name: string;
    address: string;
  };
  createdDate: string;
  totalCostNzd: number;
  status: string;
};
