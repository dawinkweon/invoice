import { Invoice } from "@/models";
import { randomInvoice } from "pages-tests/fixtures";
import _ from "underscore";

const invoices = _.range(5).map(randomInvoice);

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(invoices);
  } else if (req.method === "POST") {
    const invoice: Invoice = req.body;
    invoices.push(invoice);
    return res.status(200).json(invoice);
  }
}
