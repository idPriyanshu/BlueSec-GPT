import React, { useState } from 'react';

function SummaryInputForm({ onSummarize }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/api/summarize/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'log', log_data: input }),
      });

      const data = await response.json();
      onSummarize(data.summary || JSON.stringify(data));
    } catch (err) {
      onSummarize('❌ Error communicating with the API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSummarize}>
      <textarea
        rows="10"
        placeholder="Paste log data here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <br />
      <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
    </form>
  );
}

export default SummaryInputForm;
