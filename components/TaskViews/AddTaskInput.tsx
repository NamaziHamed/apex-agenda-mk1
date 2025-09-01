import React from "react";
import { Input } from "../ui/input";

const AddTaskInput = () => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Pay the bills"
        className="absolute bottom-2 w-[97%]"
      />
    </div>
  );
};

export default AddTaskInput;
