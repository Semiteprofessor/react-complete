// https://api.frankfurter.app/latest?amount=100&from=EUROto=USE

import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [converted, setConverted] = useState("");

  useEffect(() => {
    const fetCurrency = async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurr]);
      } catch (error) {
        console.log(error);
      }
    };

    fetCurrency();
  }, []);

  return (
    <div className="currency">
      <div>
        <form className="form">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
          >
            <option value="USD"></option>
            <option value="EUR"></option>
            <option value="CAD"></option>
            <option value="INR"></option>
          </select>
          <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
            <option value="USD"></option>
            <option value="EUR"></option>
            <option value="CAD"></option>
            <option value="INR"></option>
          </select>
        </form>
      </div>

      <p>{converted}</p>
    </div>
  );
};

export default CurrencyConverter;
