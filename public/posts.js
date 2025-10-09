// Bem Usado — Interações da página de lista de postagens
(function(){
  function qs(sel, el=document){return el.querySelector(sel)}
  function qsa(sel, el=document){return [...el.querySelectorAll(sel)]}

  function setupLikes(){
    qsa('.v-actions .like').forEach(btn => {
      btn.addEventListener('click', ()=>{
        const pressed = btn.getAttribute('aria-pressed') === 'true'
        const countEl = qs('.count', btn)
        const base = parseInt(countEl?.textContent || '0', 10)
        btn.setAttribute('aria-pressed', String(!pressed))
        if(countEl){ countEl.textContent = String(Math.max(0, base + (pressed ? -1 : 1))) }
      })
    })
  }

  function setupStickySubnav(){
    const subnav = qs('.subnav')
    if(!subnav) return
    const stickyTop = 56 // must match CSS .subnav top
    const origin = subnav.offsetTop
    function onScroll(){
      const y = window.scrollY || window.pageYOffset
      if(y + stickyTop >= origin) subnav.classList.add('is-stuck')
      else subnav.classList.remove('is-stuck')
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
  }

  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn) }

  ready(()=>{
    setupLikes()
    setupStickySubnav()
  })
})()
