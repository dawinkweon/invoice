import Link from "next/link";
import Page from "../../components/common/Page";
import classes from "../../styles";

export default function CreateInvoice() {
  return (
    <Page>
      <Link href="/invoices">
        <button className={classes.button}>Go Back</button>
      </Link>
    </Page>
  );
}
