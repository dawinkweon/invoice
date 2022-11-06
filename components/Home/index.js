import useInvoices from "hooks/useInvoices";
import InvoiceCard from "components/InvoiceCard";
import InvoiceTable from "components/InvoiceTable";
import { INVOICE_STATUSES } from "../../models";

const classes = {
  page: "bg-gray-50 w-screen h-screen p-8",
  header: "flex flex-row",
  title: "text-xl mb-1 font-semibold w-full",
  addButton:
    "rounded bg-blue-700 self-end w-36 h-8 sm:h-10 text-white text-xs uppercase",
  description: "text-sm mb-10",
  invoice: {
    section: "mb-4",
    header: "text-sm font-semibold mb-1",
    wrapperTable: "hidden sm:block",
    wrapperCards: "flex flex-col sm:hidden",
  },
};

export default function Home() {
  const { error, invoices, isLoadingInvoices } = useInvoices();

  if (isLoadingInvoices) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error occurred while loading the page.</div>;
  }

  return (
    <div className={classes.page}>
      <section className={classes.header}>
        <p className={classes.title}>Invoices</p>
        <button className={classes.addButton}>Add Invoice</button>
      </section>

      <p className={classes.description}>
        List of all your recent transactions.
      </p>

      {invoices &&
        Object.values(INVOICE_STATUSES).map((status) => {
          const matchedInvoices = invoices.filter((inv) => inv.status === status.name);

          return (
            <section className={classes.invoice.section} key={status.name}>
              <h1 className={classes.invoice.header}>{status.displayName}</h1>
              <div className={classes.invoice.wrapperTable}>
                <InvoiceTable invoices={matchedInvoices} />
              </div>
              <div className={classes.invoice.wrapperCards} data-testid="invoice-card-section">
                {matchedInvoices &&
                  matchedInvoices.map((inv) => (
                    <InvoiceCard key={inv.id} invoice={inv} />
                  ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}
