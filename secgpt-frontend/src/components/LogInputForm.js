import React, { useState } from 'react';

function LogInputForm({ onAnalyze }) {
  const [mode, setMode] = useState('log');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);

    const payload =
      mode === 'spl'
        ? { mode: 'spl', query: input }
        : { mode: 'log', log_data: input };

    try {
      const response = await fetch('http://localhost:8001/api/analyze/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      onAnalyze(data.analysis || JSON.stringify(data));
    } catch (err) {
      onAnalyze('❌ Error communicating with the API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label>
          <input
            type="radio"
            name="mode"
            value="log"
            checked={mode === 'log'}
            onChange={() => setMode('log')}
          />{' '}
          Raw Log
        </label>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="radio"
            name="mode"
            value="spl"
            checked={mode === 'spl'}
            onChange={() => setMode('spl')}
          />{' '}
          SPL Query
        </label>
      </div>

      <textarea
        rows="10"
        placeholder={mode === 'spl' ? 'Enter SPL query here...' : 'Paste log data here...'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginTop: '1rem' }}
      />

      <br />
      <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
}

export default LogInputForm;
