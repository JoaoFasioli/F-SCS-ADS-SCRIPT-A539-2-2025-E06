// Tech page interactions: smooth scroll from tree to cards
(function () {
    function qsa(sel, el = document) {
        return [...el.querySelectorAll(sel)];
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(() => {
        qsa('.tree-nav a').forEach(a => {
            a.addEventListener('click', (e) => {
                const id = a.getAttribute('href').slice(1);
                const el = document.getElementById(id);
                if (el) {
                    e.preventDefault();
                    el.setAttribute('tabindex', '-1');
                    el.focus({preventScroll: true});
                    el.scrollIntoView({behavior: 'smooth', block: 'start'});
                    history.replaceState(null, '', '#' + id);
                }
            });
        });
    });
})();