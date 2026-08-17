import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { api } from '../api/client';
import { getTheme } from '../theme';

const messages = [
  'Are you sure? Think about it again 😌',
  'Hmm… I think you clicked the wrong button 👀',
  'The YES button is looking really cute right now ❤️',
  'Okay… but I’m not giving up that easily 😏',
  'That sounded like a maybe disguised as a no.',
  'One more thought before you decide…',
  'I feel like that was a mistake 😂',
  'The universe is clearly asking for YES ✨'
];

export default function RecipientPage() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.publicRequest(token).then(setData).catch((e) => setError(e.message));
  }, [token]);

  const message = useMemo(
    () => data?.noClickCount ? messages[Math.min(data.noClickCount - 1, messages.length - 1)] : '',
    [data?.noClickCount]
  );

  const respond = (answer) => {
  if (busy || data?.status !== 'PENDING') return;

  // YES
  if (answer === 'YES') {
    // Show YES result immediately
    setData((prev) => ({
      ...prev,
      status: 'ACCEPTED'
    }));

    // Save in background
    api.respond(token, 'YES').catch((e) => {
      console.error('Failed to save YES response:', e);
    });

    return;
  }

  // NO
  setData((prev) => ({
    ...prev,
    noClickCount: (prev.noClickCount || 0) + 1
  }));

  // Save NO response in background
  api.respond(token, 'NO').catch((e) => {
    console.error('Failed to save NO response:', e);
  });
};

  if (error) return <div className="recipient-screen"><FloatingHearts /><div className="recipient-card"><h1>Oops.</h1><p>{error}</p></div></div>;
  if (!data) return <div className="recipient-screen"><FloatingHearts /><div className="loader">♥</div></div>;

  const theme = getTheme(data.theme);
  const themeVars = {
    '--theme-bg': theme.background,
    '--theme-accent': theme.accent,
    '--theme-text': theme.text,
    '--theme-card': theme.card,
  };

  const accepted = data.status === 'ACCEPTED';

  return (
    <div className={`recipient-screen theme-${theme.id}`} style={themeVars}>
      <FloatingHearts />
      <div className="recipient-card">
        {accepted ? (
          <>
            <div className="big-heart">♥</div>
            <p className="eyebrow">A very important answer</p>
            <h1>You said<br /><em>YES!</em></h1>
            <p className="recipient-copy">Okay. It's officially a date. ✨</p>
          </>
        ) : (
          <>
            <p className="eyebrow">A little question for you</p>
            <h1>{data.recipientName ? `${data.recipientName}, ` : ''}<span>{data.question}</span></h1>
            <p className="recipient-copy">No pressure. But choose carefully… 😉</p>
            <div className="answer-area">
              <button
                className="yes-button curved-button"
                onClick={() => respond('YES')}
                style={{ transform: `scale(${1 + Math.min(data.noClickCount, 8) * 0.11})` }}
              >YES ♥</button>
              <button className="no-button curved-button"  onClick={() => respond('NO')}>No</button>
            </div>
            {message && <p className="funny-message">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}
