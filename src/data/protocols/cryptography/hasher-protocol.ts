export type HasherProtocol = {
  hash: (plaintext: string) => Promise<string>;
};
