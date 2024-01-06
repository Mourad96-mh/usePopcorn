import { useState } from "react";

const Box = ({ children }) => {
  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="box">
      <button onClick={toggleHandler} className="btn-toggle">
        {toggle ? "-" : "+"}
      </button>
      {toggle && children}
    </div>
  );
};

export default Box;
