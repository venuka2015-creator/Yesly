import { Link, useNavigate } from 'react-router-dom';
import FloatingHearts from './FloatingHearts';

export default function Layout({ children, showNav = true, theme }) {
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('dating_jwt');
  const logout = () => { localStorage.removeItem('dating_jwt'); localStorage.removeItem('dating_user'); navigate('/'); };
  return <div className={`app-shell ${theme ? 'themed-shell' : ''}`} style={theme ? { '--theme-bg': theme.background, '--theme-accent': theme.accent, '--theme-text': theme.text, '--theme-card': theme.card } : undefined}>
    <FloatingHearts />
    {showNav && <header className="topbar">
      <Link className="brand" to="/">DateMe <span>♥</span></Link>
      <nav>
        {loggedIn ? <><Link to="/dashboard">My requests</Link><button className="link-btn" onClick={logout}>Logout</button></> : <Link to="/">Login</Link>}
      </nav>
    </header>}
    <main className="page">{children}</main>
  </div>;
}
