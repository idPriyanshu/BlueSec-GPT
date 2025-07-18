import React, { useState } from 'react';

function SPLGeneratorPage() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
  const trimmedInput = userInput.trim();
  if (!trimmedInput) return;

  const newUserMessage = { role: 'user', content: trimmedInput };
  const updatedChat = [...chatHistory, newUserMessage];

  setChatHistory(updatedChat);
  setUserInput('');
  setLoading(true);

  try {
    const cleanChat = updatedChat.filter(
      (msg) => msg.role === 'user' || msg.role === 'assistant'
    );

    const isFirstUserMessage = cleanChat.filter((m) => m.role === 'user').length === 1;

    const payload = isFirstUserMessage
      ? { prompt: trimmedInput } 
      : { messages: cleanChat }; 

    const res = await fetch('http://localhost:8001/api/generate_spl/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setChatHistory([
      ...updatedChat,
      {
        role: 'assistant',
        content: data.spl?.trim() || 'No SPL generated',
      },
    ]);
  } catch (err) {
    setChatHistory([
      ...updatedChat,
      { role: 'assistant', content: 'Error generating SPL' },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{maxWidth: '800px', margin: 'auto' }}>
      <div
        style={{
          background: '#f9f9f9',
          padding: '1rem',
          height: '300px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          marginBottom: '1rem',
        }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '1rem',
              textAlign: msg.role === 'user' ? 'right' : 'left',
              whiteSpace: 'pre-wrap',
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'SPL Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <textarea
        rows="3"
        style={{ width: '100%' }}
        placeholder="Type your query or follow-up..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        style={{ marginTop: '1rem' }}
        disabled={loading || !userInput.trim()}
      >
        {loading ? 'Generating...' : 'Send'}
      </button>
    </div>
  );
}

export default SPLGeneratorPage;
