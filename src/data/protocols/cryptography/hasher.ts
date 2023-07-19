export type Hasher = {
  hash: (plaintext: string) => Promise<string>;
};
