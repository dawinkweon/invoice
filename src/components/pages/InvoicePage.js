import Link from "next/link";
import useInvoices from "@/hooks/useInvoices";
import LoadingIcon from "@/components/LoadingIcon";
import _ from "underscore";
import InvoiceSection from "@/components/Invoices/InvoiceSection";
import { INVOICE_STATUSES } from "@/models/";
import { default as cls } from "@/styles";
import Page from "@/components/common/Page";

const classes = {
  loadingWrapper: "flex flex-col items-center",
  loading: "text-sm",
  header: "flex flex-row",
  title: "text-xl mb-1 font-semibold w-full",
  addButton:
    "rounded bg-blue-700 self-end w-36 h-8 sm:h-10 text-white text-xs uppercase",
  description: "text-sm mb-10",
};

export default function InvoicePage() {
  const { error, invoices, isLoadingInvoices } = useInvoices();

  const invoicesByStatus = _.groupBy(invoices, (inv) => inv.status);

  return (
    <Page>
      <section className={classes.header}>
        <p className={classes.title}>Invoices</p>
        <Link href="/invoices/create">
          <button className={cls.button}>Add Invoice</button>
        </Link>
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
              status={INVOICE_STATUSES.EmailInProgress}
              invoices={invoicesByStatus[INVOICE_STATUSES.EmailInProgress]}
            />
            <InvoiceSection
              status={INVOICE_STATUSES.EmailCompleted}
              invoices={invoicesByStatus[INVOICE_STATUSES.EmailCompleted]}
            />
          </>
        )
      )}
    </Page>
  );
}

const LoadingSection = () => (
  <div className={classes.loadingWrapper}>
    <LoadingIcon />
    <span className={classes.loading}>Loading...</span>
  </div>
);
