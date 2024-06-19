// https://api.frankfurter.app/latest?amount=100&from=EUROto=USE

import { useEffect, useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("EUR");
  const [toCurr, setToCurr] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetCurrency = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurr]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (fromCurr === toCurr) {
      setConverted(amount);
    }

    fetCurrency();
  }, [amount, fromCurr, toCurr]);

  return (
    <div className="currency">
      <div>
        <form className="form">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
          <select
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
            <option value="NGN">NGN</option>
          </select>
          <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
            <option value="NGN">NGN</option>
          </select>
        </form>
      </div>

      <p>
        {converted} {toCurr}
      </p>
    </div>
  );
};

export default CurrencyConverter;
