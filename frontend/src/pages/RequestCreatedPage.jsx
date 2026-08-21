import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';
import { getTheme } from '../theme';

export default function RequestCreatedPage() {
  const {token}=useParams(); const {state}=useLocation(); const navigate=useNavigate();
  const shareUrl=state?.shareUrl || `${window.location.origin}/request/${token}`; const [copied,setCopied]=useState(false);
  const theme = getTheme(state?.theme);
  const copy=async()=>{await navigator.clipboard.writeText(shareUrl);setCopied(true);setTimeout(()=>setCopied(false),1800)};
  const share=async()=>{if(navigator.share) await navigator.share({title:'A little question for you ♥',text:state?.question||'I have a question for you ♥',url:shareUrl}); else copy()};
  return <Layout theme={theme}><section className="success-page"><div className="seal">♥</div><p className="eyebrow">Your request is ready</p><h1>Now send them<br/><em>the question.</em></h1><div className="created-theme-preview" style={{background:theme.background,color:theme.text}}><span className="preview-label">Recipient preview</span><p>“{state?.question || 'Your question'}”</p><div className="preview-buttons"><span style={{background:theme.accent,color:theme.card}}>YES ♥</span><span style={{borderColor:theme.accent,color:theme.accent}}>No</span></div></div><div className="share-box"><input readOnly value={shareUrl}/><button onClick={copy}>{copied?'Copied!':'Copy'}</button></div><div className="button-row"><button className="primary" onClick={share}>Share ♥</button><button className="secondary" onClick={()=>navigate('/dashboard')}>View dashboard</button></div></section></Layout>;
}
