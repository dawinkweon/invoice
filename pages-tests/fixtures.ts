import { faker } from "@faker-js/faker";
import _ from "underscore";
import { INVOICE_STATUSES } from "@/models";
import { CreateInvoiceRequest, Type } from "@/models/Invoice";

const statuses = Object.values(INVOICE_STATUSES);

export function randomInvoice(): CreateInvoiceRequest {
  return {
    id: faker.random.numeric(2),
    customer: {
      name: faker.company.name(),
      address: faker.address.streetAddress(),
    },
    createdDate: faker.date.recent(10).toLocaleDateString(),
    totalCostNzd: faker.random.numeric(3),
    status: _.sample(statuses),
    email: faker.internet.email(),
    isIncludeGst: faker.seed() % 2 == 0 ? false : true,
    type: Type.INVOICE,
    serviceDesc: faker.lorem.words(10),
    emailSubject: faker.lorem.words(10),
    emailBody: faker.lorem.words(20),
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
