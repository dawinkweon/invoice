import { STATUSES } from "./constants";

const InvoiceCard = ({invoice}) => {
  const { text, bgColor } = STATUSES[invoice.status];

  return (
    <div key={invoice.id} className={`my-2 px-4 py-2 ${bgColor}`}>
      <div className="flex flex-row justify-between my-1">
        <div>
          <div className="text-sm">{text}</div>
          <div className="font-bold">{invoice.customer.address}</div>
        </div>
        <div>
          <div className="text-xs mb-2">{invoice.createdDate}</div>
          <div className="text-sm font-bold float-right">
            ${invoice.totalCostNzd}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCard;