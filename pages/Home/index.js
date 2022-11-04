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

  const statuses = {
    EMAIL_COMPLETED: { friendlyName: "Completed" },
    EMAIL_IN_PROGRESS: { friendlyName: "In Progress" },
  };

  return (
    <div className="bg-gray-50 w-screen h-screen p-8">
      <div className="flex flex-row">
        <p className="text-xl mb-1 font-semibold w-full">Invoices</p>
        <button className="rounded bg-blue-700 self-end w-36 h-8 sm:h-10 text-white text-xs uppercase">
          Add Invoice
        </button>
      </div>

      <p className="text-sm mb-10">List of all your recent transactions.</p>

      {invoices &&
        Object.keys(statuses).map((status) => {
          const matchingInvoices = invoices.filter(
            (inv) => inv.status === status
          );

          const friendlyName = statuses[status].friendlyName;

          return (
            <div className="mb-4" key={status}>
              <p className="text-sm font-semibold mb-1">{friendlyName}</p>
              <div className="hidden sm:block">
                <InvoiceTable invoices={matchingInvoices} />
              </div>
              <div className="flex flex-col sm:hidden">
                {matchingInvoices &&
                  matchingInvoices.map((inv) => (
                    <InvoiceCard key={inv.id} invoice={inv} />
                  ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
