import React from "react";

const classes = {
  table: "table w-full border-spacing-y-2",
  headerCell: "text-left text-sm font-semibold text-gray-500",
  row: "bg-white h-8",
  cell: "text-left",
  cellId: "text-left font-semi-bold",
};

export default function InvoiceTable({ invoices }) {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td className={classes.headerCell}>No.</td>
          <td className={classes.headerCell}>Date</td>
          <td className={classes.headerCell}>Customer</td>
        </tr>
      </thead>
      <tbody>
        {invoices &&
          invoices.map((invoice) => {
            return (
              <tr className={classes.row} key={invoice.id}>
                <td className={classes.cellId}>#{invoice.id}</td>
                <td className={classes.cell}>{invoice.createdDate}</td>
                <td className={classes.cell}>{invoice.customer.name}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
