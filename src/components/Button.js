import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

//props Button style
const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    "*": "opt",
    "+": "opt",
    "-": "opt",
    "/": "opt",
  };

  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  //user click comma function
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // user click C button
  const resetClick = () => {
    setCalc({ sign: "", num: 0, res: 0 });
  };

  //user click number button
  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const moduloClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick, //call function
      C: resetClick, //call function
      "/": signClick, //call function
      "*": signClick, //call function
      "-": signClick, //call function
      "+": signClick, //call function
      "=": equalsClick, //call function
      "%": moduloClick, //call function
      "+-": invertClick, //call function
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  //call props to get style button
  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>
      {value}
    </button>
  );
};

export default Button;
