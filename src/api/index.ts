import createApi from "./createApi";
import urlJoin from "./utils";
import "isomorphic-fetch";
import { CreateInvoiceRequest } from "@/models/Invoice";

const host = process.env.NEXT_PUBLIC_HOST;

export const api = {
  getInvoices: () =>
    createApi(() => {
      return fetch(urlJoin(host, "invoices"));
    }),
  createInvoice: (invoice: CreateInvoiceRequest) => {
    return createApi(() =>
      fetch(urlJoin(host, "invoices"), {
        method: "POST",
        body: JSON.stringify(invoice),
        headers: [["Content-Type", "application/json"]],
      })
    );
  },
};
