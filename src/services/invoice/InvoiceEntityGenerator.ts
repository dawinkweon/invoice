import { Invoice } from "@/models/Invoice";

const getGst = (cost: number): number => {
  return cost * 0.15;
};

const getCostAfterGst = (cost: number): number => {
  return cost + getGst(cost);
};

class InvoiceEntityGenerator {
  public calculateInvoice(invoice: Invoice): Invoice {
    if (invoice.isIncludeGst) {
      invoice.withGstAmount(0);
      invoice.withTotalCost(invoice.cost);
    } else {
      invoice.withGstAmount(getGst(invoice.cost));
      invoice.withTotalCost(getCostAfterGst(invoice.cost));
    }
    console.log(
      `Calculated from cost of ${invoice.cost} to be total of ${invoice.totalCost}`
    );

    return invoice;
  }
}
export default InvoiceEntityGenerator;
