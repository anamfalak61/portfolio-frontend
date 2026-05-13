
import { useState } from 'react';

function Contact({ API_URL }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.message) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setForm({ name: '', email: '', message: '' }); // Reset form
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="text" 
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})} 
        required
      />
      <input 
        type="email" 
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})} 
        required
      />
      <textarea 
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({...form, message: e.target.value})} 
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}