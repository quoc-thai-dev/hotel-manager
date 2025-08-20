import React from "react";
import { Label } from "./ui/label";

interface InputGroupProp {
  inputName: string;
  text: string;
}
const InputGroup = ({ text, inputName }: InputGroupProp) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 items-center">
        <Label className="col-span-1 text-md" htmlFor={inputName}>{text}</Label>
      <div className="col-span-2">
        <input type="text" className="w-full hover:bg-white outline-2 outline-gray-300 focus:bg-violet-100 focus:outline-orange-500 px-4 py-2 bg-sky-100 rounded" id={inputName} />
      </div>
    </div>
  );
};

export default InputGroup;
