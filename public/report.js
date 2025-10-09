// Reportar Problema — comportamento da página
// Objetivo: validar campo obrigatório e exibir um toast de confirmação no envio.
// Mantém o JS encapsulado via módulo e utiliza utilitários reutilizáveis (utils.js).

import {qs, showToast} from './js/utils.js';

function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn)
}

ready(() => {
    const textarea = qs('#issue-text');
    const sendBtn = qs('#send-issue');

    // Acessibilidade: anunciar obrigatório
    textarea.setAttribute('aria-required', 'true');

    sendBtn.addEventListener('click', () => {
        const value = (textarea.value || '').trim();
        if (!value) {
            // feedback visual discreto para erro
            textarea.focus();
            textarea.style.borderColor = '#ef4444';
            showToast('Descreva o problema antes de enviar.', {type: 'err', timeout: 3000});
            setTimeout(() => textarea.style.borderColor = '', 800);
            return;
        }

        // Aqui futuramente poderíamos fazer um POST para a API.
        // Por enquanto apenas simulamos sucesso e limpamos o campo.
        showToast('Seu problema foi enviado para nós. Obrigado!', {type: 'ok', timeout: 4200});
        textarea.value = '';
        textarea.blur();
    });
});
