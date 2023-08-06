export type ExpenseModel = {
  id: string;
  name: string;
  value: number;
  purchaseDate: Date;
  invoiceDate: Date;
  isPaid: boolean;
  isIgnored: boolean;
  isFixed: boolean;
  installmentsIdentifier: string;
  categoryId: string;
  creditCardId: string;
  userId: string;
};
