import { useState } from 'react'

export default function Calculator() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const evaluate = () => {
    setError('')
    try {
      const evalResult = Function(`"use strict"; return (${expression})`)()
      setResult(evalResult)
    } catch (err) {
      setError('Invalid expression')
      setResult('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      evaluate()
    }
  }

  return (
    <div className="calculator">
      <h2>Calculator</h2>
      
      <div className="expression-display">
        <label>Expression:</label>
        <div className="display">{expression || '0'}</div>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter mathematical expression (e.g., 2 + 2)"
        />
      </div>

      <div className="controls">
        <button onClick={evaluate} className="evaluate-btn">
          Evaluate
        </button>
        <button onClick={() => { setExpression(''); setResult(''); setError(''); }} className="clear-btn">
          Clear
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      
      {result !== '' && (
        <div className="result">
          <label>Result:</label>
          <span>{result}</span>
        </div>
      )}
    </div>
  )
}