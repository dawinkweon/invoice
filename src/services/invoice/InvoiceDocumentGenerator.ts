import { Invoice, Type } from "@/models/Invoice";
import { timed } from "../performanceUtils";

const fs = require("fs");
const pdf = require("pdfjs");

const centerTextAlign = { textAlign: "center" };
const rightTextAlign = { textAlign: "right" };

const getBottomPadding = (units: number = 1): object => {
  return {
    paddingBottom: (units * 3).toString(),
  };
};

class InvoiceDocumentGenerator {
  public async generateInvoice(invoice: Invoice): Promise<string> {
    const fn = async () => {
      const doc = new pdf.Document({
        font: require("pdfjs/font/Times-Roman"),
        fontSize: 14,
        padding: 60,
        lineHeight: 2,
      });

      const fileName = InvoiceDocumentGenerator.generateFileName(invoice.type);
      const filePath = `/tmp/${fileName}.pdf`;
      doc.pipe(fs.createWriteStream(filePath));

      doc.cell("2/10 Mannering Place, Hillcrest, Auckland", centerTextAlign);
      doc.cell("Mobile: 027 443 4087", centerTextAlign);
      doc.cell(`Date: ${invoice.date}`, {
        ...centerTextAlign,
        ...getBottomPadding(),
      });
      doc.cell("", centerTextAlign);

      if (invoice.type === Type.INVOICE) {
        doc.cell("TAX INVOICE", centerTextAlign);
        doc.cell("GST No: 81-142-408", centerTextAlign);
      } else {
        doc.cell((invoice.type as string).toUpperCase(), centerTextAlign);
      }
      doc.cell("", getBottomPadding());

      doc.cell("Services provided to:", centerTextAlign);
      if (invoice.clientName != null) {
        doc.cell(invoice.clientName, centerTextAlign);
      }
      doc.cell(invoice.address, {
        ...centerTextAlign,
        ...getBottomPadding(),
      });

      doc.cell(`Our service: ${invoice.serviceDesc}`, {
        ...centerTextAlign,
        ...getBottomPadding(),
      });

      if (invoice.isIncludeGst) {
        doc.cell(
          `Total cost: $${invoice.cost.toFixed(2)} (incl. GST)`,
          centerTextAlign
        );
      } else {
        doc.cell(`Our Cost: $${invoice.cost.toFixed(2)}`, centerTextAlign);
        doc.cell(`GST: $${invoice.gstAmount.toFixed(2)}`, centerTextAlign);
        doc.cell(`Total: $${invoice.totalCost.toFixed(2)}`, centerTextAlign);
      }

      doc.cell("", getBottomPadding(2));

      doc.cell("Young's Garden Services Ltd", rightTextAlign);
      doc.cell("ASB: 12-3053-0466668-00", rightTextAlign);

      await doc.end();
      return filePath;
    };
    return timed(fn, "generateInvoice");
  }

  private static generateFileName(type: Type): string {
    const [date, month, year] = new Date()
      .toLocaleDateString("en-NZ")
      .split("/");

    return `${date}-${month}-${year}-${InvoiceDocumentGenerator.convertToString(
      type
    )}`;
  }

  private static convertToString(type: Type): string {
    let documentName: string;
    switch (type) {
      case Type.QUOTE:
        documentName = "quote";
        break;
      case Type.INVOICE:
        documentName = "invoice";
        break;
      case Type.RECEIPT:
        documentName = "receipt";
        break;
    }

    return documentName;
  }
}

export default InvoiceDocumentGenerator;
