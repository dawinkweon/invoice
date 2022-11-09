import useInvoices from "hooks/useInvoices";
import { INVOICE_STATUSES } from "../../models";
import LoadingIcon from "components/LoadingIcon";
import _ from "underscore";
import InvoiceSection from "../InvoiceSection";

const classes = {
  loadingWrapper: "flex flex-col items-center",
  loading: "text-sm",
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

  const invoicesByStatus = _.groupBy(invoices, (inv) => inv.status);

  return (
    <div className={classes.page}>
      <section className={classes.header}>
        <p className={classes.title}>Invoices</p>
        <button className={classes.addButton}>Add Invoice</button>
      </section>

      <p className={classes.description}>
        List of all your recent transactions.
      </p>

      {isLoadingInvoices ? (
        <LoadingSection />
      ) : error ? (
        <div>Error occurred.</div>
      ) : (
        invoicesByStatus && (
          <>
            <InvoiceSection
              classes={classes}
              status={INVOICE_STATUSES.EmailInProgress}
              invoices={invoicesByStatus[INVOICE_STATUSES.EmailInProgress]}
            />
            <InvoiceSection
              classes={classes}
              status={INVOICE_STATUSES.EmailCompleted}
              invoices={invoicesByStatus[INVOICE_STATUSES.EmailCompleted]}
            />
          </>
        )
      )}
    </div>
  );
}

const LoadingSection = () => (
  <div className={classes.loadingWrapper}>
    <LoadingIcon />
    <span className={classes.loading}>Loading...</span>
  </div>
);