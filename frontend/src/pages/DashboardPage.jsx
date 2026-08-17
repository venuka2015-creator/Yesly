import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/client';
import { getTheme } from '../theme';

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState(null);
  const previousStatuses = useRef(new Map());
  const firstLoad = useRef(true);

  const refresh = async () => {
    try {
      const next = await api.mine();
      if (!firstLoad.current) {
        const accepted = next.find((item) => item.status === 'ACCEPTED' && previousStatuses.current.get(item.id) === 'PENDING');
        if (accepted) {
          const message = `${accepted.recipientName || 'They'} said YES! ❤️`;
          setNotification({ id: Date.now(), message });
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Your answer is here ❤️', { body: message });
          }
          window.setTimeout(() => setNotification(null), 6500);
        }
      }
      previousStatuses.current = new Map(next.map((item) => [item.id, item.status]));
      firstLoad.current = false;
      setItems(next);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    refresh();
    const interval = window.setInterval(refresh, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const enableNotifications = async () => {
    if (!('Notification' in window)) {
      setNotification({ id: Date.now(), message: 'Your browser does not support desktop notifications.' });
      return;
    }
    const permission = await Notification.requestPermission();
    setNotification({
      id: Date.now(),
      message: permission === 'granted' ? 'Desktop notifications are enabled ❤️' : 'Notifications were not enabled.'
    });
    window.setTimeout(() => setNotification(null), 3500);
  };

  const copy = async (url) => {
    await navigator.clipboard.writeText(url);
    setNotification({ id: Date.now(), message: 'Request link copied ❤️' });
    window.setTimeout(() => setNotification(null), 2200);
  };

  return (
    <Layout>
      {notification && <div className="toast-notification" role="status"><span>♥</span><div>{notification.message}</div><button onClick={() => setNotification(null)}>×</button></div>}
      <section className="dashboard">
        <div className="dashboard-head">
          <div>
            <p className="eyebrow">Your requests</p>
            <h1>Your little<br /><em>moments.</em></h1>
          </div>
          <div className="dashboard-actions">
            <button className="secondary curved-button" onClick={enableNotifications}>Enable notifications</button>
            <Link className="primary curved-button" to="/create">New request ♥</Link>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {items.length === 0 ? (
          <div className="empty">
            <div>♥</div>
            <h2>No requests yet</h2>
            <p>Create your first question and send it to someone special.</p>
            <Link className="primary curved-button" to="/create">Create one</Link>
          </div>
        ) : (
          <div className="request-list">
            {items.map((x) => (
              <article className="request-item" key={x.id}>
                <div>
                  <span className="request-meta-row"><span className={`status ${x.status.toLowerCase()}`}>{x.status === 'ACCEPTED' ? 'YES ♥' : x.status === 'PENDING' ? 'WAITING' : 'NO'}</span><span className="theme-dot" title={getTheme(x.theme).name} style={{background:getTheme(x.theme).background, borderColor:getTheme(x.theme).accent}}>♥</span></span>
                  <h2>{x.question}</h2>
                  <p>{x.recipientName || 'Someone special'} · {new Date(x.createdAt).toLocaleString()}</p>
                  {x.noClickCount > 0 && <small>{x.noClickCount} “No” click{x.noClickCount > 1 ? 's' : ''}</small>}
                </div>
                <div className="item-actions">
                  <button className="secondary curved-button" onClick={() => copy(x.shareUrl)}>Copy link</button>
                  <Link className="secondary curved-button" to={`/request/${x.token}`} target="_blank">Open</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
