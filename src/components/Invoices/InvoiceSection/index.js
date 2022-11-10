import InvoiceCard from "../InvoiceCard";
import { DISPLAY_TEXTS } from "./constants";

const classes = {
  section: "mb-4",
  header: "text-sm font-semibold mb-1",
  wrapperTable: "hidden sm:block",
  wrapperCards: "flex flex-col",
};

export default function InvoiceSection({ invoices, status }) {
  const statusText = DISPLAY_TEXTS[status];

  return (
    <section className={classes.section} key={status}>
      <h1 className={classes.header}>{statusText}</h1>
      <div
        className={classes.wrapperCards}
        data-testid="invoice-card-section"
      >
        {invoices &&
          invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)}
      </div>
    </section>
  );
}
