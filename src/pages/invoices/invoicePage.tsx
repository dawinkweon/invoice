import Link from "next/link";
import useInvoices from "@/hooks/useInvoices";
import LoadingIcon from "@/components/ITheme/LoadingIcon";
import _ from "underscore";
import InvoiceSection from "@/components/Invoice/InvoiceSection";
import { INVOICE_STATUSES } from "@/models/";
import Page from "@/components/ITheme/Page";
import Header from "@/components/ITheme/Header";
import Button from "@/components/ITheme/Button";
import React from "react";

const classes = {
  loadingWrapper: "flex flex-col items-center",
  loading: "text-sm",
  header: "flex flex-row",
  description: "text-sm mb-10",
  createButton: "bg-blue-700 text-white",
};

export default function InvoicePage() {
  const { error, invoices, isLoadingInvoices } = useInvoices();

  const invoicesByStatus = _.groupBy(invoices, (inv) => inv.status);

  return (
    <Page>
      <section className={classes.header}>
        <Header className="mb-2">Invoices</Header>
        <Link href="/invoices/create">
          <Button className={classes.createButton}>Create Invoice</Button>
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
            <InvoiceSection
              status={INVOICE_STATUSES.Error}
              invoices={invoicesByStatus[INVOICE_STATUSES.Error]}
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
