import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { api } from '../api/client';

export default function LandingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({name:'', email:'', password:''});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      const data = mode === 'login' ? await api.login({email:form.email,password:form.password}) : await api.register(form);
      localStorage.setItem('dating_jwt', data.token); localStorage.setItem('dating_user', JSON.stringify(data));
      navigate(params.get('next') || '/create');
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  if (localStorage.getItem('dating_jwt')) {
    return <Layout><section className="hero"><p className="eyebrow">A tiny question. A big answer.</p><h1>Ask someone<br/><em>something special.</em></h1><p className="hero-copy">Create a beautiful, playful request and send one private link. They answer. You find out.</p><button className="primary" onClick={() => navigate('/create')}>Create a request ♥</button></section></Layout>;
  }

  return <Layout><section className="landing-grid">
    <div className="hero compact"><p className="eyebrow">A tiny question. A big answer.</p><h1>Ask someone<br/><em>something special.</em></h1><p className="hero-copy">Turn “Will you?” into a little experience they won't forget.</p></div>
    <div className="auth-card">
      <div className="tabs"><button className={mode==='login'?'active':''} onClick={()=>setMode('login')}>Login</button><button className={mode==='register'?'active':''} onClick={()=>setMode('register')}>Create account</button></div>
      <form onSubmit={submit}>
        {mode==='register' && <label>Your name<input required maxLength="100" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>}
        <label>Email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<input required minLength="8" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
        {error && <p className="error">{error}</p>}
        <button className="primary full" disabled={busy}>{busy?'Please wait…':mode==='login'?'Login':'Create account'}</button>
      </form>
    </div>
  </section></Layout>;
}
