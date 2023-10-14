import React from "react";

export default function Inputfield({
  type,
  name,
  placeholder,
  value,
  onChange,
  checked,
  required,
}) {
  return (
    <div className="input-field">
      Inputfield
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        valu={value}
        onChange={onChange}
        checked={checked}
        required={required}
      />
    </div>
  );
}
