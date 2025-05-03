export function generateShieldsBadge(label: string, message: string, color: string): string {
    const charWidth = 7;
    const labelWidth = Math.max(40, label.length * charWidth);
    const messageWidth = Math.max(40, message.length * charWidth);
    const totalWidth = labelWidth + messageWidth;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
      <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      <mask id="a">
        <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
      </mask>
      <g mask="url(#a)">
        <rect width="${labelWidth}" height="20" fill="#555"/>
        <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${color}"/>
        <rect width="${totalWidth}" height="20" fill="url(#b)"/>
      </g>
      <g fill="#fff" text-anchor="middle"
         font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
         font-size="11">
        <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
        <text x="${labelWidth / 2}" y="14">${label}</text>
        <text x="${labelWidth + messageWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${message}</text>
        <text x="${labelWidth + messageWidth / 2}" y="14">${message}</text>
      </g>
    </svg>
  `;
}
