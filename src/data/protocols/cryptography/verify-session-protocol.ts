export type VerifySessionProtocol = {
  verify: (digest: string) => Promise<boolean>;
};
