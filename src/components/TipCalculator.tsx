import React, { useState, useEffect } from 'react'
import './TipCalculator.css'

const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('')
  const [tipPercentage, setTipPercentage] = useState<string>('15')
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  // Calculate tip and total whenever bill amount or tip percentage changes
  useEffect(() => {
    const bill = parseFloat(billAmount) || 0
    const tipPercent = parseFloat(tipPercentage) || 0
    const tip = (bill * tipPercent) / 100
    const total = bill + tip

    setTipAmount(tip)
    setTotalAmount(total)
  }, [billAmount, tipPercentage])

  const handleNumberInput = (value: string) => {
    if (value === 'backspace') {
      setBillAmount(prev => prev.slice(0, -1))
    } else if (value === 'clear') {
      setBillAmount('')
    } else {
      setBillAmount(prev => prev + value)
    }
  }

  const handleTipChange = (percentage: string) => {
    setTipPercentage(percentage)
  }

  return (
    <div className="tip-calculator">
      <div className="calculator-header">
        <h1>Just Tip It</h1>
        <p>Quick & Easy Tip Calculator</p>
      </div>

      <div className="input-section">
        <div className="bill-input">
          <label htmlFor="bill-amount">Bill Amount</label>
          <div className="input-field">
            <span className="currency-symbol">$</span>
            <input
              id="bill-amount"
              type="text"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              readOnly
            />
          </div>
        </div>

        <div className="tip-percentage">
          <label>Tip Percentage</label>
          <div className="tip-buttons">
            {['10', '15', '18', '20', '25'].map((percent) => (
              <button
                key={percent}
                className={`tip-button ${tipPercentage === percent ? 'active' : ''}`}
                onClick={() => handleTipChange(percent)}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="results-section">
        <div className="result-item">
          <span className="result-label">Tip Amount</span>
          <span className="result-value">${tipAmount.toFixed(2)}</span>
        </div>
        <div className="result-item total">
          <span className="result-label">Total</span>
          <span className="result-value">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="number-pad">
        <div className="number-row">
          <button onClick={() => handleNumberInput('1')}>1</button>
          <button onClick={() => handleNumberInput('2')}>2</button>
          <button onClick={() => handleNumberInput('3')}>3</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleNumberInput('4')}>4</button>
          <button onClick={() => handleNumberInput('5')}>5</button>
          <button onClick={() => handleNumberInput('6')}>6</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleNumberInput('7')}>7</button>
          <button onClick={() => handleNumberInput('8')}>8</button>
          <button onClick={() => handleNumberInput('9')}>9</button>
        </div>
        <div className="number-row">
          <button onClick={() => handleNumberInput('.')}>.</button>
          <button onClick={() => handleNumberInput('0')}>0</button>
          <button onClick={() => handleNumberInput('backspace')} className="backspace">
            ←
          </button>
        </div>
        <div className="number-row">
          <button onClick={() => handleNumberInput('clear')} className="clear">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

export default TipCalculator 