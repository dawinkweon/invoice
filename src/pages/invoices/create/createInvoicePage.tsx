import Link from "next/link";
import Header from "@/components/ITheme/Header";
import { useState } from "react";
import Button from "@/components/ITheme/Button";
import { INVOICE_STATUSES } from "@/models";
import React from "react";
import Page from "@/components/ITheme/Page";
import { api } from "@/api";
import { useRouter } from "next/router";
import { InvoicesPath } from "..";
import { CreateInvoiceRequest, Type } from "@/models/Invoice";

const classes = {
  header: "mb-6",
  input:
    "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
  label: "block text-gray-700 text-sm font-bold mb-2",
  tagLine: "text-xs mb-4",
  form: "bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4",
  cancel:
    "font-bold text-sm text-blue-500 hover:text-blue-800 bg-white border border-blue-700",
  okButton: "w-auto bg-blue-700 text-white",
  wrapperOkCancel: "flex items-center justify-between",
};

const InvoiceFormInput = ({ name, type, invoice, placeholder, onChange }) => {
  return (
    <input
      name={name}
      id={name}
      className={`${classes.input}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={invoice[name]}
    ></input>
  );
};

const TagLine = ({ children }) => {
  return <div className={classes.tagLine}>{children}</div>;
};

const validations = {
  address: (value: string) => value.length > 0,
  cost: (value: number) => value > 0,
  email: (value: string) => value.length > 0 && value.includes("@"),
  name: () => true,
};

const initialState = {
  email: "",
  address: "",
  name: "",
  cost: 0,
  isIncludeGst: false,
  serviceDesc: "",
  emailSubject: "",
  emailBody: "",
  type: "",
};

const DEFAULT_SERVICE_DESC = `Cutting Trees`;
const DEFAULT_EMAIL_SUBJECT = `Invoice - Young's Garden Services Ltd.`;
const DEFAULT_EMAIL_BODY = `Hello,

Please find the enclosed invoice.
Thank you for doing business with us.

Regards,
Young`;

export default function CreateInvoicePage() {
  const router = useRouter();
  const [newInvoice, setNewInvoice] = useState(initialState);
  const [isBusy, setIsBusy] = useState(false);

  const onChange = (event) => {
    setNewInvoice({
      ...newInvoice,
      [event.target.name]: event.target.value,
    });
  };

  const onOk = async () => {
    if (!validate(newInvoice)) {
      alert("Invalid invoice");
      return;
    }

    const invoice: CreateInvoiceRequest = {
      id: null,
      email: newInvoice.email,
      customer: {
        name: newInvoice.name,
        address: newInvoice.address,
      },
      createdDate: null,
      totalCostNzd: newInvoice.cost.toString(),
      status: INVOICE_STATUSES.EmailInProgress,
      type: Type.INVOICE,
      isIncludeGst: false,
      serviceDesc: DEFAULT_SERVICE_DESC,
      emailSubject: DEFAULT_EMAIL_SUBJECT,
      emailBody: DEFAULT_EMAIL_BODY,
    };

    console.debug("Creating invoice: " + JSON.stringify(invoice));
    setIsBusy(true);

    const { err } = await api.createInvoice(invoice);
    setIsBusy(false);
    if (err) {
      alert("Error occurred.");
    } else {
      router.push(InvoicesPath);
    }
  };

  return (
    <Page>
      <Header className={classes.header}>New Invoice</Header>
      <form className={classes.form}>
        <div className="mb-4">
          <label className={classes.label} htmlFor="Email">
            📧 Email
          </label>
          <InvoiceFormInput
            name="email"
            type="email"
            invoice={newInvoice}
            placeholder="Email"
            onChange={onChange}
          ></InvoiceFormInput>
          <TagLine>Example: person@gmail.com</TagLine>
        </div>
        <div className="mb-4">
          <label className={classes.label} htmlFor="address">
            🏠 Address
          </label>
          <InvoiceFormInput
            name="address"
            type="text"
            invoice={newInvoice}
            placeholder="Address"
            onChange={onChange}
          ></InvoiceFormInput>
          <TagLine>Example: 156 Hillcrest Avenue, Hillcrest</TagLine>
        </div>
        <div className="mb-4">
          <label className={classes.label} htmlFor="name">
            🧍Name <span>(Optional)</span>
          </label>
          <InvoiceFormInput
            name="name"
            type="text"
            invoice={newInvoice}
            placeholder="Name"
            onChange={onChange}
          ></InvoiceFormInput>
          <TagLine>Example: Alex Smith or Contoso Ltd.</TagLine>
        </div>
        <div className="mb-4">
          <label className={classes.label} htmlFor="cost">
            💲Cost
          </label>
          <InvoiceFormInput
            name="cost"
            type="number"
            invoice={newInvoice}
            placeholder="Cost"
            onChange={onChange}
          ></InvoiceFormInput>
          <TagLine>Example: 250.00</TagLine>
        </div>
        <div className={classes.wrapperOkCancel}>
          <Button className={classes.okButton} onClick={onOk} disabled={isBusy}>
            Create
          </Button>

          <Link href="/invoices">
            <Button className={classes.cancel} href="#">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </Page>
  );
}

const hasValidation = (name: string): Boolean => {
  if (!(name in validations)) {
    console.warn(`Skipping validation as it is missing for name: ${name}`);
    return false;
  } else {
    return true;
  }
};

function validate(invoice) {
  const hasErrors =
    Object.keys(invoice)
      .filter(hasValidation)
      .filter((name) => {
        const value = invoice[name];
        const validator = validations[name];
        const isValid = validator(value);
        if (!isValid) {
          console.debug(`Invalid input: ${name} : ${value}`);
          return true;
        }
        return false;
      }).length > 0;

  return !hasErrors;
}
