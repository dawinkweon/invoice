import { randomInvoice } from "@/pages/invoices/tests/fixtures";
import _ from "underscore";

export default function handler(req, res) {
  return res.status(200).json(_.range(5).map(randomInvoice));
}
