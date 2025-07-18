import React from 'react';

function AnalysisResult({ result }) {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🧠 GPT Analysis Result</h3>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '1rem',
          whiteSpace: 'pre-wrap',
          borderRadius: '5px',
        }}
      >
        {result}
      </pre>
    </div>
  );
}

export default AnalysisResult;
