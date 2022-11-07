import { randomInvoice } from "../../tests/helpers/fixtures";
import _ from "underscore";

export default function handler(req, res) {
  return res.status(200).json(_.range(5).map(randomInvoice));
}
