import { ConnectButton as RainbowkitButton } from "@rainbow-me/rainbowkit";

function ConnectButton() {
  return (
    <RainbowkitButton
      label="Connect"
      accountStatus="address"
      chainStatus="full"
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  );
}

export default ConnectButton;
