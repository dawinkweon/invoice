import useInvoices from "hooks/useInvoices";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceTable from "../../components/InvoiceTable.js";

export default function Home() {
  const { error, invoices, isLoadingInvoices } = useInvoices();

  if (isLoadingInvoices) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while loading the page.</div>;
  }

  return (
    <div className="bg-gray-50 w-screen h-screen p-8">
      <div className="flex flex-row">
        <p className="text-xl mb-1 font-semibold w-full">Invoices</p>
        <button className="rounded bg-blue-700 self-end w-36 h-8 sm:h-10 text-white text-xs uppercase">
          Add Invoice
        </button>
      </div>

      <p className="text-sm mb-6">List of all your recent transactions.</p>
      <div className="hidden sm:block">
        <InvoiceTable invoices={invoices} />
      </div>

      <div className="flex flex-col sm:hidden">
        {invoices && invoices.map((inv) => <InvoiceCard key={inv.id} invoice={inv} />)}
      </div>
    </div>
  );
}
