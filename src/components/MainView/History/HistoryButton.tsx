import React, { BiHistory } from "react-icons/bi";

type HistoryButtonProps = {
  onClick?: () => void;
};

const HistoryButton = ({ onClick }: HistoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-4xl text-primary absolute top-5 right-5"
    >
      <BiHistory />
    </button>
  );
};

export default HistoryButton;
