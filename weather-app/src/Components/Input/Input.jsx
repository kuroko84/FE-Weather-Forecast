import React from "react";

// Input.jsx
const Input = React.forwardRef((props, ref) => {
  return (
    <input
      className="w-full h-10 px-3 my-3 border border-gray-300 rounded-md"
      type={props.type}
      placeholder="E.g., New York, London, Tokyo"
      ref={ref}
      defaultValue={props.value}
    />
  );
});
export default Input;
