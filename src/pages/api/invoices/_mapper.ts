import { CreateInvoiceRequest, Invoice } from "@/models/Invoice";

export const mapToInvoice = (request: CreateInvoiceRequest): Invoice => {
  const newInvoice = new Invoice();
  newInvoice.email = request.email;
  newInvoice.address = request.customer.address;
  newInvoice.clientName = request.customer.name;
  newInvoice.cost = parseFloat(request.totalCostNzd);
  newInvoice.isIncludeGst = request.isIncludeGst;
  newInvoice.serviceDesc = request.serviceDesc;
  newInvoice.emailSubject = request.emailSubject;
  newInvoice.emailBody = request.emailBody;
  newInvoice.type = request.type;
  return newInvoice;
};

export const mapToRequest = (invoice: Invoice): CreateInvoiceRequest => {
  const newInvoice: CreateInvoiceRequest = {
    email: invoice.email,
    customer: {
      address: invoice.address,
      name: invoice.clientName,
    },
    createdDate: invoice.date,
    status: invoice.status,
    totalCostNzd: invoice.cost.toString(),
    isIncludeGst: invoice.isIncludeGst,
    serviceDesc: invoice.serviceDesc,
    emailSubject: invoice.emailSubject,
    emailBody: invoice.emailBody,
    type: invoice.type,
  };

  return newInvoice;
};

export const mapper = {
  mapToInvoice,
  mapToRequest,
};
