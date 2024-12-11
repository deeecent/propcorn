import { Text, Input, InputProps } from "@chakra-ui/react";
import { useState } from "react";
import { Hex, isAddress } from "viem";
import { normalize } from "viem/ens";
import { getEnsAddress } from "@wagmi/core";
import { config } from "./wagmi";

type AddressInputProps = InputProps & {
  onAddressChange: (address: Hex) => void;
};

const AddressInput = ({ onAddressChange, ...props }: AddressInputProps) => {
  const [ensName, setEnsName] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(props.value);

  const handleChangeAddress = (value: string) => {
    setValue(value);
    if (isAddress(value)) {
      setAddress(value);
      onAddressChange(value);
    } else if (value.endsWith(".eth")) {
      const name = normalize(ensName);
      getEnsAddress(config, {
        name,
      }).then((v) => {
        if (v) {
          setEnsName(name);
          setAddress(v);
          onAddressChange(v);
        }
      });
      setEnsName(value);
    }
  };

  return (
    <>
      <Input
        {...props}
        value={value}
        onChange={(e) => handleChangeAddress(e.target.value)}
        placeholder="address"
      />
      {ensName && <Text>{address}</Text>}
    </>
  );
};

export default AddressInput;
