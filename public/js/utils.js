// Small utilities to encourage reuse across pages without coupling
export function qs(sel, el = document) { return el.querySelector(sel); }
export function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // Fallback for older browsers
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
