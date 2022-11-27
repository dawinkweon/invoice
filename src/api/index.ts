import createApi, { ApiResponse } from "./createApi";
import urlJoin from "./utils";
import "isomorphic-fetch";
import { Invoice } from "@/models";

const host = process.env.NEXT_PUBLIC_HOST;

export const api = {
  getInvoices: () =>
    createApi(() => {
      return fetch(urlJoin(host, "invoices"));
    }),
  createInvoice: (invoice: Invoice) => {
    return createApi(() =>
      fetch(urlJoin(host, "invoices"), {
        method: "POST",
        body: JSON.stringify(invoice),
        headers: [["Content-Type", "application/json"]],
      })
    );
  },
};
