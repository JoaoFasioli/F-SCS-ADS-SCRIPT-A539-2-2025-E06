// About page small enhancements
(function(){
  // Smooth scroll for in-page anchors if navigated with hash
  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(()=>{
    // If opened with #hash, focus the section for accessibility
    const id = location.hash.slice(1);
    if(id){ const el = document.getElementById(id); if(el){ el.setAttribute('tabindex','-1'); el.focus({preventScroll:true}); el.scrollIntoView({behavior:'smooth', block:'start'}); }}
  });
})();