import React from 'react';

/**
 * Renders instructor-authored HTML (Filament's rich editor) as real markup
 * instead of escaped text.
 *
 * Course overviews are stored as HTML — "<p>This comprehensive course…</p>" —
 * so interpolating them as a React child prints the tags on screen. They have
 * to be parsed, but they are also written by instructor accounts, which makes
 * a raw dangerouslySetInnerHTML a stored-XSS hole. So the markup is run
 * through a tag+attribute allowlist first, using the browser's own parser.
 * No extra dependency, and nothing executable survives.
 */

const ALLOWED_TAGS = new Set([
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre',
    'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'span', 'a',
]);

// Only <a href> survives, and only with a safe scheme.
const SAFE_HREF = /^(https?:|mailto:|tel:|#|\/)/i;

function sanitize(html) {
    if (typeof window === 'undefined' || !window.DOMParser) return '';

    const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
    const root = doc.body.firstElementChild;
    if (!root) return '';

    const walk = (node) => {
        // Iterate over a copy: the list mutates as we unwrap/remove.
        [...node.childNodes].forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) return;

            if (child.nodeType !== Node.ELEMENT_NODE) {
                child.remove(); // comments, processing instructions
                return;
            }

            const tag = child.tagName.toLowerCase();

            // script/style carry executable or layout-breaking payloads even
            // when emptied of attributes, so drop them subtree and all.
            if (tag === 'script' || tag === 'style' || tag === 'iframe' || tag === 'object' || tag === 'embed') {
                child.remove();
                return;
            }

            if (!ALLOWED_TAGS.has(tag)) {
                // Keep the words, lose the wrapper.
                while (child.firstChild) node.insertBefore(child.firstChild, child);
                child.remove();
                return;
            }

            // Strip every attribute, then re-add the one we permit. This kills
            // on* handlers and style payloads without having to enumerate them.
            [...child.attributes].forEach((attr) => child.removeAttribute(attr.name));

            if (tag === 'a') {
                const href = child.getAttribute('href');
                if (href && SAFE_HREF.test(href.trim())) {
                    child.setAttribute('href', href.trim());
                    child.setAttribute('rel', 'noopener noreferrer');
                    child.setAttribute('target', '_blank');
                }
            }

            walk(child);
        });
    };

    // Re-parse strips attributes that the first pass could not see on <a>.
    walk(root);
    return root.innerHTML;
}

export default function RichText({ html, className = '', fallback = null }) {
    const clean = React.useMemo(() => sanitize(html || ''), [html]);

    // Guard against markup that sanitises down to nothing (e.g. "<script>…").
    if (!clean.replace(/<[^>]*>/g, '').trim()) return fallback;

    return <div className={`prose-doc ${className}`} dangerouslySetInnerHTML={{ __html: clean }} />;
}
