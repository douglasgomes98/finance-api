export namespace DeleteExpense {
  export type Params = {
    userId: string;
    expenseId: string;
    all?: boolean;
  };

  export type Result = void;
}
