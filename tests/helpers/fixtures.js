import { faker } from "@faker-js/faker";
import { INVOICE_STATUSES } from "models";
import _ from "underscore";

const statuses = Object.values(INVOICE_STATUSES).map((v) => v.name);

export const randomInvoice = () => {
  return {
    id: faker.random.numeric(2),
    customer: {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    },
    createdDate: faker.date.recent(10).toLocaleDateString(),
    totalCostNzd: faker.random.numeric(3),
    status: _.sample(statuses),
  };
};

export const getInProgressInvoice = () => {
  const invoice = randomInvoice();
  invoice.status = INVOICE_STATUSES.EmailInProgress;
  return invoice;
};

export const getCompletedInvoice = () => {
  const invoice = randomInvoice();
  invoice.status = INVOICE_STATUSES.EmailCompleted;
  return invoice;
};
