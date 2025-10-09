// Bem Usado — JS para interações da página inicial

// Utilitários
function qs(sel, el = document) {
    return el.querySelector(sel)
}

function qsa(sel, el = document) {
    return [...el.querySelectorAll(sel)]
}

// 3 R's: textos
const textosR = {
    1: {
        titulo: "R1 — Reduzir",
        texto: "Este precisa ser sua maior prioridade. Diminua o consumo desnecessário e a geração de resíduos no cotidiano."
    },
    2: {
        titulo: "R2 — Reutilizar",
        texto: "Estenda a vida útil dos produtos dando novos usos aos seus materiais, mas apenas quando não for possível reduzir."
    },
    3: {
        titulo: "R3 — Reciclar",
        texto: "Transforme resíduos em novos produtos através da reciclagem, mas apenas quando não for possível reutilizar."
    }
}

function setupRButtons() {
    const desc = qs('#r-desc')
    qsa('.leaf').forEach(leaf => {
        function activate() {
            const r = leaf.getAttribute('data-r')
            const t = textosR[r]
            if (!t) return
            desc.innerHTML = `<div class="r-grid"><div class="r-copy"><div class="r-title">${t.titulo}</div><p>${t.texto}</p><div style="margin-top:.5rem"><a href="./learn.html" class="primary" role="button">Saiba Mais</a></div></div><div class="r-fig"><img src="./assets/Rpyramid.png" alt="Pirâmide dos 3 R's: prioridade para Reduzir, depois Reutilizar e por último Reciclar."></div></div>`
            desc.classList.add('show')
        }

        leaf.addEventListener('click', activate)
        leaf.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate()
            }
        })
    })
}

// Assistente Inteligente
function setupAssistant() {
    const panes = qs('#assistantPanes')
    const toggles = qsa('.toggle')
    const textarea = qs('#assist-input')
    const btnBuscar = qs('#buscarAjuda')
    const btnReset = qs('#reiniciarAssistente')
    const resp = qs('#resumo-resposta')

    let intent = null

    function selectIntent(id) {
        intent = id
        toggles.forEach(b => b.classList.toggle('selected', b.dataset.intent === id))
        textarea.disabled = false
        textarea.focus()
    }

    toggles.forEach(b => b.addEventListener('click', () => selectIntent(b.dataset.intent)))

    btnBuscar.addEventListener('click', () => {
        const material = textarea.value.trim()
        if (!intent || material.length === 0) {
            // feedback simples
            textarea.focus()
            textarea.style.borderColor = '#ef4444'
            setTimeout(() => textarea.style.borderColor = '', 700)
            return
        }
        // gera uma resposta curta simulada
        const mapa = {
            reduzir: 'reduzir o consumo',
            reutilizar: 'reutilizar o material',
            reciclar: 'reciclar corretamente'
        }
        resp.textContent = `Você escolheu ${mapa[intent]} para "${material}".\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel metus orci. Cras nec metus dui. Fusce interdum risus ut nisi dictum bibendum. Aliquam eu iaculis lectus. Curabitur eros arcu, porttitor ut tellus vitae, varius sollicitudin metus. Fusce iaculis congue leo, a pretium ante aliquet eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam et condimentum nunc.`
        panes.style.transform = 'translateX(-50%)'
    })

    btnReset.addEventListener('click', () => {
        intent = null
        toggles.forEach(b => b.classList.remove('selected'))
        textarea.value = ''
        textarea.disabled = true
        panes.style.transform = 'translateX(0)'
        resp.textContent = 'Preencha os dados para visualizar uma resposta.'
    })
}

function ready(fn) {
    if (document.readyState !== 'loading') fn()
    else document.addEventListener('DOMContentLoaded', fn)
}

ready(() => {
    setupRButtons()
    setupAssistant()
})
