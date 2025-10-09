import { qs, copyToClipboard, shareOrCopy } from './js/utils.js';

function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

function setupFloatingActions(){
  const likeBtn = qs('.af-btn.like');
  const countSpan = qs('.af-count');
  const copyBtn = qs('.af-btn.copy');
  const shareBtn = qs('.af-btn.share');
  const kebabBtn = qs('.af-btn.kebab');
  const menu = qs('#kebab-menu');

  // Like toggle
  likeBtn?.addEventListener('click', () => {
    const pressed = likeBtn.getAttribute('aria-pressed') === 'true';
    likeBtn.setAttribute('aria-pressed', String(!pressed));
    likeBtn.classList.toggle('is-on', !pressed);
    // naive count mutation for mock
    const raw = (countSpan?.textContent || '0').trim().toLowerCase();
    let base;
    if(raw.endsWith('k')) base = Math.round(parseFloat(raw) * 1000);
    else base = parseInt(raw.replace(/\D/g,'')) || 0;
    base += pressed ? -1 : 1;
    // format
    const formatted = base >= 1000 ? (Math.round(base/100)/10)+'k' : String(base);
    if(countSpan) countSpan.textContent = formatted;
  });

  // Copy link
  copyBtn?.addEventListener('click', async () => {
    const ok = await copyToClipboard(location.href);
    copyBtn.classList.add(ok ? 'ok' : 'err');
    copyBtn.title = ok ? 'Link copiado!' : 'Falha ao copiar';
    setTimeout(()=>{ copyBtn.classList.remove('ok','err'); copyBtn.title = ''; }, 1200);
  });

  // Share
  shareBtn?.addEventListener('click', async () => {
    const res = await shareOrCopy({ title: qs('#post-title')?.textContent?.trim() || 'Bem Usado', text: 'Veja este post do Bem Usado', url: location.href });
    shareBtn.classList.add(res === 'shared' || res === 'copied' ? 'ok' : 'err');
    setTimeout(()=>shareBtn.classList.remove('ok','err'), 1200);
  });

  // Kebab menu
  function closeMenu(){
    kebabBtn?.setAttribute('aria-expanded','false');
    menu?.classList.remove('open');
  }
  kebabBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu?.classList.toggle('open');
    kebabBtn?.setAttribute('aria-expanded', String(!!isOpen));
  });
  document.addEventListener('click', (e)=>{
    if(!menu?.classList.contains('open')) return;
    const within = menu.contains(e.target) || kebabBtn.contains(e.target);
    if(!within) closeMenu();
  });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeMenu(); });

  // Menu actions (mock)
  menu?.querySelector('.k-item.report')?.addEventListener('click', ()=>{ alert('Obrigado por reportar. Vamos analisar.'); closeMenu(); });
  menu?.querySelector('.k-item.save')?.addEventListener('click', async ()=>{
    // Simple save mock: bookmark via copy
    const ok = await copyToClipboard(location.href);
    alert(ok ? 'Link copiado para você salvar.' : 'Não foi possível copiar o link.');
    closeMenu();
  });
}

ready(()=>{
  setupFloatingActions();
});
