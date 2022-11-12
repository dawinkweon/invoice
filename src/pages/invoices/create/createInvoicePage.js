import Link from "next/link";
import Page from "@/components/ITheme/Page";
import Header from "@/components/ITheme/Header";
import { useEffect, useState } from "react";

const InvoiceFormInput = ({ className, name, type, placeholder, onChange }) => {
  return (
    <input
      name={name}
      id={name}
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

const DOMAINS = ["@gmail.com", "@hotmail.com", "@qq.com"];

const initialState = { domain: "@gmail.com" };

export default function CreateInvoicePage() {
  const [newInvoice, setNewInvoice] = useState(initialState);

  useEffect(() => {
    console.log(newInvoice);
  }, [newInvoice]);

  const onChange = (event) => {
    setNewInvoice({
      ...newInvoice,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Page>
      <Header className="mb-2">New Invoice</Header>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <InvoiceFormInput
            className="shadow appearance-none border rounded w-56 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            onChange={onChange}
          ></InvoiceFormInput>
          <select
            className="shadow appearance-none border rounded w-auto py-2 px-3 mr-2 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="domain"
            name="domain"
            onChange={onChange}
          >
            {DOMAINS.map((dom) => (
              <option key={dom}>{dom}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="address"
          >
            Address
          </label>
          <InvoiceFormInput
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            onChange={onChange}
          ></InvoiceFormInput>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="Cost"
          >
            Cost
          </label>
          <InvoiceFormInput
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 mr-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="cost"
            name="cost"
            type="number"
            placeholder="Cost"
            onChange={onChange}
          ></InvoiceFormInput>
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white w-1/3 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Include GST
          </button>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Create
          </button>
          <Link href="/invoices">
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Cancel
            </a>
          </Link>
        </div>
      </form>
    </Page>
  );
}
