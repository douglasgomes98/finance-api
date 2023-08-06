export type ExpenseModel = {
  id: string;
  name: string;
  value: number;
  date: Date;
  isPaid: boolean;
  isIgnored: boolean;
  isFixed: boolean;
  installmentsIdentifier: string;
  categoryId: string;
  creditCardId: string;
  userId: string;
};
