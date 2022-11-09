import InvoiceTable from "../InvoiceTable";
import InvoiceCard from "../InvoiceCard";
import { DISPLAY_TEXTS } from "./constants";

export default function InvoiceSection({ invoices, status, classes }) {
  const statusText = DISPLAY_TEXTS[status];

  return (
    <section className={classes.invoice.section} key={status}>
      <h1 className={classes.invoice.header}>{statusText}</h1>
      <div className={classes.invoice.wrapperTable}>
        <InvoiceTable invoices={invoices} />
      </div>
      <div
        className={classes.invoice.wrapperCards}
        data-testid="invoice-card-section"
      >
        {invoices &&
          invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)}
      </div>
    </section>
  );
}
