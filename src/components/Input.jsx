import React, { useState } from "react";

const Input = ({ type, label, state, setState, placeholder }) => {
  const [fontColor, setFontColor] = useState("text-black");
  return (
    <div className="text-sm ">
      <p className={`${fontColor} capitalize mb-0 px-2`}>{label}</p>
      <input
        type={type}
        className="-tracking-tighter text-black border-b-2 py-2 px-2 outline-none focus:opacity-[1] transition-all duration-[0.2s] w-full"
        value={state}
        onFocus={() => setFontColor("text-[#8679ffe8]")}
        onBlur={() => setFontColor("text-black")}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
