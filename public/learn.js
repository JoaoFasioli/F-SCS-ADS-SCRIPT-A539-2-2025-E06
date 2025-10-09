// Learn page: focus section via hash and allow deep links from index
(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(() => {
        const id = location.hash.slice(1);
        if (id) {
            const el = document.getElementById(id);
            if (el) {
                el.setAttribute('tabindex', '-1');
                el.focus({preventScroll: true});
                el.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
    });
})();