import { faker } from "@faker-js/faker";
import _ from "underscore";
import { INVOICE_STATUSES, Invoice } from "@/models";

const statuses = Object.values(INVOICE_STATUSES);

export function randomInvoice(): Invoice {
  return {
    id: faker.random.numeric(2),
    customer: {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    },
    createdDate: faker.date.recent(10).toLocaleDateString(),
    totalCostNzd: parseInt(faker.random.numeric(3)),
    status: _.sample(statuses),
  };
}

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
