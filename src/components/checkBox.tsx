import React, { useState } from "react";

interface CheckboxProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox = ({ isChecked, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  const handleOnChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleOnChange} />
    </label>
  );
};

export default Checkbox;
