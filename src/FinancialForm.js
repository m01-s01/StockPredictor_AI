import React, { useState } from 'react'
import './FinancialForm.css';

const API_KEY = process.env.REACT_APP_GEMINI_API;
const FinancialForm = ({setResult}) => {

    const [values, setValues] = useState({
        marketPrice : "10",
        eps : "34",
        bookValue : "67",
        sales : "34",
        annualDividends : "23",
        priviousEps : "89",
        currentEps : "45",
        totalDebt : "23",
        totalEquity : "78",
        netIncome : "68"
    })

    const [isSent, setIsSent] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(values);

        const trainingPrompt = [
              {
                "parts": [
                    {
                        "text": "From next prompt I am gonna send you some parameters for predicting stock market share, tell me is it overvalued or undervalued, buy or not"
                    }
                ],
                "role": "user"
              },
              {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
              },
              {
                "role": "user",
                "parts": [{
                    "text": "and also calculate - P/E ratio, P/B ratio, P/S ratio, Dividend yield, Earnings growth in %, Debt-to-equity ratio, ROE % and give as a response "
                }]
              },
              {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
              },
              {
                "role": "model",
                "parts": [{
                    "text": "always give response in form of HTML div and table tag"
                }]
              },
              {
                "role": "model",
                "parts": [{
                    "text": "okay"
                }]
              },
        ]

        let url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`
    
        let messagesToSend = [
            ...trainingPrompt,
            {
                "role": "user",
                "parts": [{
                    "text": JSON.stringify(values)
                }]
            }
        ]
        setIsSent(false)
        let res = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": messagesToSend
            })
        })
        let resjson = await res.json()
        setIsSent(true)
        let responseMessage = resjson.candidates[0].content.parts[0].text
        console.log(responseMessage)
        setResult(responseMessage)

    }
  return (
    <form className="form-container" onSubmit={handleSubmit}>
        <div>
            <lable>Market Price Per Share:</lable>
            <input type='number' name='marketPrice' value={values.marketPrice} onChange={handleChange} />
        </div>
        <div>
            <lable>Earnings Per Share(EPS):</lable>
            <input type='number' name='eps' value={values.eps} onChange={handleChange} required/>
        </div>
        <div>
            <lable>BookValue Per Share:</lable>
            <input type='number' name='bookValue' value={values.bookValue} onChange={handleChange} required/>
        </div>
        <div>
            <lable>Sales Per Share:</lable>
            <input type='number' name='sales' value={values.sales} onChange={handleChange} required/>
        </div>
        <div>
            <lable>Annual Dividends Per Share:</lable>
            <input type='number' name='annualDividends' value={values.annualDividends} onChange={handleChange} required/>
        </div>
        {/* <div>
            <lable>Previous Year's EPS:</lable>
            <input type='number' name='previousEps' value={values.priviousEps} onChange={handleChange} required/>
        </div> */}
        <div>
            <lable>Current Year's EPS:</lable>
            <input type='number' name='currentEps' value={values.currentEps} onChange={handleChange} required/>
        </div>
        <div>
            <lable>Total Debt:</lable>
            <input type='number' name='totalDebt' value={values.totalDebt} onChange={handleChange} required/>
        </div>
        <div>
            <lable>Total Equity:</lable>
            <input type='number' name='totalEquity' value={values.totalEquity} onChange={handleChange} required/>
        </div>
        <div>
            <lable>Net Income:</lable>
            <input type='number' name='netIncome' value={values.netIncome} onChange={handleChange} required/>
        </div>

       {

        isSent ?
        <button type='submit'>Submit</button>
        :
        // <DotLoader  className='loader'/>
        <button type='submit'>Submit</button>


       }
    </form>
  )
}

export default FinancialForm