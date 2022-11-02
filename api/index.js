import createApi from "./createApi";

const host = process.env.NEXT_PUBLIC_HOST;

export const api = {
  getInvoices: createApi(() => fetch(`${host}/invoices`)),
};
