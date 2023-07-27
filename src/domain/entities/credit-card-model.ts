export type CreditCardModel = {
  id: string;
  name: string;
  dueDay: number;
  closingDay: number;
  limit: number;
  limitAvailable: number;
  limitUsed: number;
  percentLimitUsed: number;
  userId: string;
  bankId: string;
};
