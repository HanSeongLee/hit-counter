export function generateShieldsBadge(
  label: string,
  message: string,
  color: string,
  borderStyle: 'square' | 'round' | 'none' = 'round',
  labelBg: string = '#555',
  idSuffix: string = Math.random().toString(36).substring(2, 8),
  labelColor: string = '#FFFFFF',
  messageColor: string = '#FFFFFF'
): string {
  const charWidth = 7;
  const labelWidth = Math.max(40, label.length * charWidth);
  const messageWidth = Math.max(40, message.length * charWidth);
  const totalWidth = labelWidth + messageWidth;

  const outerRx = borderStyle === 'round' ? 3 : 0;
  const useMask = borderStyle !== 'none';

  const maskId = `mask-${idSuffix}`;
  const gradientId = `gradient-${idSuffix}`;

  const maskTag = useMask
    ? `<mask id="${maskId}">
        <rect width="${totalWidth}" height="20" rx="${outerRx}" fill="#fff"/>
      </mask>`
    : '';
  const maskAttr = useMask ? `mask="url(#${maskId})"` : '';

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
      <linearGradient id="${gradientId}" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>
      ${maskTag}
      <g ${maskAttr}>
        <rect width="${labelWidth}" height="20" fill="${labelBg}"/>
        <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${color}"/>
        <rect width="${totalWidth}" height="20" fill="url(#${gradientId})"/>
      </g>
      <g text-anchor="middle"
         font-family="DejaVu Sans,Verdana,Geneva,sans-serif"
         font-size="11">
        <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
        <text x="${labelWidth / 2}" y="14" fill="${labelColor}">${label}</text>
        <text x="${labelWidth + messageWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${message}</text>
        <text x="${labelWidth + messageWidth / 2}" y="14" fill="${messageColor}">${message}</text>
      </g>
    </svg>
  `;
}
