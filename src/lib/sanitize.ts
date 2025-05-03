export function sanitizeUrl(url: string): string {
    return url.replace(/[^a-zA-Z0-9\-_/]/g, '').slice(0, 100);
}

export function sanitizeHexColor(color: string): string | null {
    return /^#([0-9A-Fa-f]{6})$/.test(color) ? color : null;
}

export function sanitizeText(text: string, maxLength: number): string {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, maxLength);
}
