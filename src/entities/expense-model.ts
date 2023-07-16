export type ExpenseModel = {
  id: string;
  name: string;
  value: number;
  date: Date;
  paid: boolean;
  categoryId: string;
  creditCardId: string;
  userId: string;
};
