// Small utilities to encourage reuse across pages without coupling
// Query helpers
export function qs(sel, el = document) { return el.querySelector(sel); }
export function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

// Clipboard helpers
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Fallback for older browsers: temporary textarea
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return !!ok;
  }
}

// Share API with graceful fallback to clipboard (returns 'shared' | 'copied' | 'failed')
export async function shareOrCopy({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (e) {
      // user canceled or share failed; fall through to copy
    }
  }
  const ok = await copyToClipboard(url);
  return ok ? 'copied' : 'failed';
}

// Lightweight toast notification (top-right). No external CSS dependency besides basic classes.
// Usage: showToast('Mensagem enviada!');
export function showToast(message, { timeout = 4000, type = 'ok' } = {}) {
  // Find or create a container (aria-live polite to announce to SRs)
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.role = 'status';
  toast.textContent = message;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));

  // Auto dismiss
  const remove = () => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };
  if (timeout > 0) setTimeout(remove, timeout);

  return remove; // allow manual dismissal
}
