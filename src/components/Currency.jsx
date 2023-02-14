import React, { useEffect, useState } from "react"
import axios from 'axios'

const Currency = () => {
  const [state, setState] = useState([]);
 
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://api.currencyfreaks.com/latest?apikey=22e0c3d21eca49c3bbf4dd4d23ac2aa5&symbols=CAD,EUR,IDR,JPY,CHF,GBP",
 
        {
          "Content-Type": "application/xml; charset=utf-8",
        }
      );
 
      setState(await response.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    getData();
  }, []);
 
  console.log(state.rates);
 
  return (
    <div>
      { state.length === 0 && state ?
        <>Loading...</>
       : 
        <div>
          <table>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
              {Object.keys(state.rates).map((attr) => {
                return (
                  <tr>
                    <td>{attr}</td>
                    <td>{state.rates[attr]*1.05}</td>
                    <td>{state.rates[attr]}</td>
                    <td>{state.rates[attr]*0.95}</td>
                  </tr>
                );
              })}
          </table>
          <p>Rates are based from 1 USD.</p>
          <p>This application uses API from https:://currencyfreaks.com</p>
        </div>
      }
    </div>
  );
}

export default Currency;
