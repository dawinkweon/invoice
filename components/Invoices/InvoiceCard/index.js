import { STATUSES } from "./constants";

const classes = {
  card: "my-2 px-4 py-2 bg-white shadow-md hover:shadow-lg",
  wrapper: "flex flex-row justify-between my-1",
  status: "text-xs mb-2",
  date: "text-xs mb-2",
  address: "font-bold text-sm",
  cost: "text-sm font-bold float-right",
};

const InvoiceCard = ({ invoice }) => {
  const { text: statusText } = STATUSES[invoice.status];

  return (
    <div key={invoice.id} className={classes.card} data-testid="invoice-card">
      <div className={classes.wrapper}>
        <div>
          <p className={classes.status}>{statusText}</p>
          <p className={classes.address}>{invoice.customer.address}</p>
        </div>
        <div>
          <div className={classes.date}>{invoice.createdDate}</div>
          <div className={classes.cost}>${invoice.totalCostNzd}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
