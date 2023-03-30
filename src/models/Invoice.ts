export type CreateInvoiceRequest = {
  id?: null | string | number;
  customer: {
    name: string;
    address: string;
  };
  createdDate: string | null;
  totalCostNzd: string;
  status: string;
  email: string;
  isIncludeGst: boolean;
  type: Type;
  serviceDesc: string;
  emailSubject: string;
  emailBody: string;
};

export enum Type {
  INVOICE = "Invoice",
  QUOTE = "Quote",
  RECEIPT = "Receipt",
}

export class Invoice {
  public date: string = getTodaysDate();
  public email: string;
  public address: string;
  public clientName: string | null;
  public cost: number;
  public isIncludeGst: boolean;
  public serviceDesc: string;
  public emailSubject: string;
  public emailBody: string;
  public type: Type;
  public status: string;

  public gstAmount: number = 0;
  public totalCost: number = 0;

  public withGstAmount(gstAmount: number) {
    this.gstAmount = gstAmount;
    return this;
  }

  public withTotalCost(totalCost: number) {
    this.totalCost = totalCost;
    return this;
  }
}

const getTodaysDate = (): string => {
  return new Date().toLocaleDateString("en-NZ");
};
