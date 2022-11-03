export default function InvoiceTable({invoices}) {
  return (
    <table className="table w-full border-spacing-y-2">
      <thead>
        <tr>
          <td className="text-left text-sm font-semibold text-gray-500">No.</td>
          <td className="text-left text-sm font-semibold text-gray-500">
            Date
          </td>
          <td className="text-left text-sm font-semibold text-gray-500">
            Customer
          </td>
        </tr>
      </thead>
      <tbody>
        {invoices &&
          invoices.map((invoice) => {
            return (
              <tr className="bg-white h-8" key={invoice.id}>
                <td className="text-left font-semibold">#{invoice.id}</td>
                <td className="text-left">{invoice.createdDate}</td>
                <td className="text-left">{invoice.customer.name}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
