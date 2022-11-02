import createApi from "./createApi";

const host =
  process.env.NODE_ENV == "production" ? "/api" : process.env.NEXT_PUBLIC_HOST;

export const api = {
  getInvoices: createApi(() => fetch(`${host}/invoices`)),
};
