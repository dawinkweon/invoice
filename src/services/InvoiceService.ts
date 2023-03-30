import { Invoice } from "@/models/Invoice";
import InvoiceDocumentGenerator from "./invoice/InvoiceDocumentGenerator";
import InvoiceEntityGenerator from "./invoice/InvoiceEntityGenerator";
import EmailService from "./mail/EmailService";

class InvoiceService {
  private invoiceEntityGenerator: InvoiceEntityGenerator;
  private invoiceDocumentGenerator: InvoiceDocumentGenerator;
  private emailerService: EmailService;

  constructor(
    invoiceEntityGenerator: InvoiceEntityGenerator,
    invoiceDocumentGenerator: InvoiceDocumentGenerator,
    emailerService: EmailService
  ) {
    this.invoiceEntityGenerator = invoiceEntityGenerator;
    this.invoiceDocumentGenerator = invoiceDocumentGenerator;
    this.emailerService = emailerService;
  }

  public async createInvoice(invoice: Invoice): Promise<Invoice> {
    const invoiceAfterCalculation: Invoice =
      this.invoiceEntityGenerator.calculateInvoice(invoice);

    let filePath: string;
    try {
      filePath = await this.invoiceDocumentGenerator.generateInvoice(
        invoiceAfterCalculation
      );
      console.log("Document created");
    } catch (err) {
      throw new Error(`Failed to create document. Error: ${err}`, {
        cause: err,
      });
    }

    try {
      await this.emailerService.sendMail(filePath, invoiceAfterCalculation);
      console.log("Mail sent");
    } catch (err) {
      throw new Error(`Failed to send mail. Error: ${err}`, { cause: err });
    }

    return invoiceAfterCalculation;
  }
}
export default InvoiceService;
