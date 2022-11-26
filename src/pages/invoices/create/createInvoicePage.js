import Link from "next/link";
import Page from "@/components/ITheme/Page";
import Header from "@/components/ITheme/Header";
import { useEffect, useState } from "react";
import OkButton from "@/components/ITheme/OkButton";

const classes = {
  header: "mb-6",
  input:
    "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
  label: "block text-gray-700 text-sm font-bold mb-2",
  tagLine: "text-xs mb-4",
  form: "bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4",
  cancel:
    "inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800",
  okButton: "w-auto px-4",
  wrapperOkButton: "flex items-center justify-between",
};

const InvoiceFormInput = ({
  className,
  name,
  type,
  invoice,
  placeholder,
  onChange,
}) => {
  return (
    <input
      name={name}
      id={name}
      className={`${classes.input} ${className}`}
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

const initialState = {
  address: "",
  cost: 0,
  email: "",
  name: "",
};

export default function CreateInvoicePage() {
  const [newInvoice, setNewInvoice] = useState(initialState);

  useEffect(() => {
    console.log(JSON.stringify(newInvoice));
  }, [newInvoice]);

  const onChange = (event) => {
    setNewInvoice({
      ...newInvoice,
      [event.target.name]: event.target.value,
    });
  };

  const onOk = () => {
    alert("OK clicked." + JSON.stringify(newInvoice));
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
        <div className={classes.wrapperOkButton}>
          <OkButton className={classes.okButton} onClick={onOk}>
            Create
          </OkButton>
          <Link href="/invoices">
            <a className={classes.cancel} href="#">
              Cancel
            </a>
          </Link>
        </div>
      </form>
    </Page>
  );
}
