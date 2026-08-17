import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/client';
import { THEMES } from '../theme';

const presets = [
  'Will you be my Valentine today?',
  'Will you come to dinner with me tonight?',
  'Will you go on a movie date with me?',
  'Can I steal you for coffee this weekend?'
];

export default function CreateRequestPage() {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState('');
  const [question, setQuestion] = useState(presets[0]);
  const [theme, setTheme] = useState('cherry');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const selectedTheme = THEMES.find((item) => item.id === theme) || THEMES[0];

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const data = await api.createRequest({ recipientName, question, theme });
      navigate(`/created/${data.token}`, { state: data });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout theme={selectedTheme}>
      <section className="form-page">
        <div className="section-heading">
          <p className="eyebrow">Create your little moment</p>
          <h1>What do you want<br /><em>to ask?</em></h1>
        </div>

        <form className="request-form" onSubmit={submit}>
          <label>
            Recipient's name <span>optional</span>
            <input maxLength="100" placeholder="e.g. Priya" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
          </label>

          <label>
            Your question
            <textarea required maxLength="300" rows="4" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>

          <div className="presets">
            {presets.map((preset) => (
              <button type="button" key={preset} onClick={() => setQuestion(preset)}>{preset}</button>
            ))}
          </div>

          <div className="theme-section">
            <div className="theme-heading">
              <div>
                <label className="theme-label">Choose a look</label>
                <p className="theme-help">The recipient will see this background and color theme.</p>
              </div>
              <span className="theme-current">{selectedTheme.name}</span>
            </div>

            <div className="theme-grid">
              {THEMES.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`theme-option ${theme === item.id ? 'selected' : ''}`}
                  onClick={() => setTheme(item.id)}
                  aria-label={`Choose ${item.name}`}
                >
                  <span className="theme-swatch" style={{ background: item.background }}>
                    <span style={{ color: item.accent }}>♥</span>
                  </span>
                  <strong>{item.name}</strong>
                  <small>{item.description}</small>
                </button>
              ))}
            </div>

          </div>

          {error && <p className="error">{error}</p>}
          <button className="primary full curved-button" disabled={busy}>{busy ? 'Creating…' : 'Create my request ♥'}</button>
        </form>
      </section>
    </Layout>
  );
}
