export const STATUS_TO_LABEL = {
  0: "Invalid",
  1: "Funding",
  2: "Working on the issue",
  3: "Paid",
  4: "Canceled",
};

export type PropcornProposal = {
  index: bigint;
  url: string;
  secondsToUnlock: bigint;
  startedAt: bigint;
  minAmountRequested: bigint;
  balance: bigint;
  feeBasisPoints: bigint;
  author: `0x${string}`;
  status: keyof typeof STATUS_TO_LABEL;
};
