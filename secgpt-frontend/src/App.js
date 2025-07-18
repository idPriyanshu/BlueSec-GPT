import React, { useState } from 'react';
import LogInputForm from './components/LogInputForm';
import SummaryInputForm from './components/SummaryInputForm';
import SPLGeneratorPage from './components/SPLGenerator';
import AnalysisResult from './components/AnalysisResult';

function App() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [result, setResult] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult(''); // Optional: clear result on tab switch
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'analyze':
        return <LogInputForm onAnalyze={setResult} />;
      case 'summarize':
        return <SummaryInputForm onSummarize={setResult} />;
      case 'generate':
        return <SPLGeneratorPage />; // No props needed now
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'analyze':
        return 'Log Analyzer';
      case 'summarize':
        return 'Log Summarizer';
      case 'generate':
        return 'SPL Generator';
      default:
        return '';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>SecGPT</h1>

      {/* Tab Buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => handleTabChange('analyze')}>
          Analyze Logs
        </button>
        <button onClick={() => handleTabChange('summarize')} style={{ marginLeft: '1rem' }}>
          Summarize Logs
        </button>
        <button onClick={() => handleTabChange('generate')} style={{ marginLeft: '1rem' }}>
          Generate SPL
        </button>
      </div>

      {/* Section Title */}
      <h2>{getSectionTitle()}</h2>

      {/* Dynamic Form Section */}
      {renderForm()}

      {/* Show Analysis Results (Not shown for SPL) */}
      {activeTab !== 'generate' && result && <AnalysisResult result={result} />}
    </div>
  );
}

export default App;
