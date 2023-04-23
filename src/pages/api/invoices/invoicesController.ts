import { INVOICE_STATUSES } from "@/models";
import { CreateInvoiceRequest, Invoice } from "@/models/Invoice";
import InvoiceDocumentGenerator from "@/services/invoice/InvoiceDocumentGenerator";
import InvoiceEntityGenerator from "@/services/invoice/InvoiceEntityGenerator";
import InvoiceService from "@/services/InvoiceService";
import EmailService from "@/services/mail/EmailService";
import { NextApiRequest, NextApiResponse } from "next";
import _ from "underscore";
import { mapper } from "./_mapper";

const invoiceService = new InvoiceService(
  new InvoiceEntityGenerator(),
  new InvoiceDocumentGenerator(),
  new EmailService()
);

const invoices: CreateInvoiceRequest[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.status(200).json(getInvoices());
  } else if (req.method === "POST") {
    const request: CreateInvoiceRequest = req.body;
    const updatedRequest = await createInvoice(request);
    return res.status(200).json(updatedRequest);
  }
}

const getInvoices = (): CreateInvoiceRequest[] => {
  return invoices;
};

const storeRequest = (request: CreateInvoiceRequest): CreateInvoiceRequest => {
  const savedRequest = {
    ...request,
    status: INVOICE_STATUSES.EmailInProgress,
  };
  invoices.push(savedRequest);
  return savedRequest;
};

const createInvoice = async (
  request: CreateInvoiceRequest
): Promise<CreateInvoiceRequest> => {
  const savedRequest = storeRequest(request);

  try {
    console.log(`Received invoice from body: ${JSON.stringify(request)}`);
    const invoiceNew = mapper.mapToInvoice(request);
    console.log(
      `Mapped create invoice request to model: ${JSON.stringify(invoiceNew)}`
    );
    await invoiceService.createInvoice(invoiceNew);

    savedRequest.status = INVOICE_STATUSES.EmailCompleted;
    console.log("Created invoice.");
  } catch (err) {
    savedRequest.status = INVOICE_STATUSES.Error;
    console.error(`Failed to create invoice due to error: ${err}`);
  }
  return savedRequest;
};
