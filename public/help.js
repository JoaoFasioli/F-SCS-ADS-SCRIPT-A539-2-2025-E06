// Me Ajude! — interações da página
// Fornece um comportamento de “accordion”: ao abrir um item, os demais fecham.
// Usa <details> nativo por acessibilidade; este javascript apenas melhora UX.

function qsa(sel, el = document) {
    return [...el.querySelectorAll(sel)]
}

function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn)
}

ready(() => {
    const items = qsa('.faq-item');
    items.forEach(item => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                // fecha demais para manter comportamento de acordeão
                items.forEach(other => {
                    if (other !== item) other.open = false;
                });
            }
        });
    });
});
