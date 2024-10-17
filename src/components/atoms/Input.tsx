import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input as ShadInput } from "../ui/input";

const Input = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <ShadInput type="number" />
    </div>
  );
};

export default Input;
