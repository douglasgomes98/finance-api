export type HashComparerProtocol = {
  compare: (plaintext: string, digest: string) => Promise<boolean>;
};
