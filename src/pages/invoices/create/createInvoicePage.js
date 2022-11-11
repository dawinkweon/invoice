import Link from "next/link";
import Page from "@/components/ITheme/Page";
import classes from "@/styles";

export default function CreateInvoicePage() {
  return (
    <Page>
      <Link href="/invoices">
        <button className={classes.button}>Go Back</button>
      </Link>
    </Page>
  );
}
