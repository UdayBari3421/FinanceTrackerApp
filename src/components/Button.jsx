import React from "react";

const Button = ({ text, onClick, blue, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${
        blue ? "hover:bg-[var(--white)] hover:rounded-md hover:text-blue-500 bg-[var(--theme)] text-[var(--white)]" : "text-[var(--theme)] hover:bg-[var(--theme)] hover:text-[var(--white)]"
      } text-sm m-0 text-center w-full p-2 border-2 border-[var(--theme)] rounded text-[var(--theme)] cursor-pointer flex justify-center items-center h-auto`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
