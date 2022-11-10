import createApi from "./createApi";
import urlJoin from "./utils";
import "isomorphic-fetch";

const host = process.env.NEXT_PUBLIC_HOST;

export const api = {
  getInvoices: createApi(() => {
    return fetch(urlJoin(host, "invoices"));
  }),
};
