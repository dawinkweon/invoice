import useInvoices from "hooks/useInvoices";

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
        <button className="rounded bg-blue-700 self-end w-36 h-10 text-white text-xs uppercase">
          + New Invoice
        </button>
      </div>
      <p className="text-sm mb-6">List of all your recent transactions.</p>
      <div className="table w-full border-spacing-y-2">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell text-left text-sm font-semibold text-gray-500">
              No.
            </div>
            <div className="table-cell text-left text-sm font-semibold text-gray-500">
              Date
            </div>
            <div className="table-cell text-left text-sm font-semibold text-gray-500">
              Customer
            </div>
          </div>
        </div>
        <div className="table-row-group">
          {invoices &&
            invoices.map((inv) => {
              return (
                <div className="table-row bg-white h-8" key={inv.id}>
                  <div className="table-cell text-left font-semibold">
                    #{inv.id}
                  </div>
                  <div className="table-cell text-left">{inv.createdDate}</div>
                  <div className="table-cell text-left">
                    {inv.customer.name}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
