const fs = require('fs');

// SCSS 파일 경로
const scssFilePath = './src/styles/_colors.scss';
// 생성할 TypeScript 파일 경로
const tsFilePath = './src/types/colors.ts';

// SCSS 변수 추출 정규식
const cssVariableRegex = /--([\w-]+):\s*(.+);/g;

// SCSS 파일에서 변수 추출 및 TypeScript 파일 생성
function generateColors() {
    try {
        const scssContent = fs.readFileSync(scssFilePath, 'utf-8');
        const variables = Array.from(scssContent.matchAll(cssVariableRegex)).map(match => ({
            name: match[1],
            value: match[2].trim(),
        }));

        const tsContent = `// This file is auto-generated from ${scssFilePath}

export const colors = {
${variables.map(variable => `    '${variable.name}': '${variable.value}',`).join('\n')}
} as const;

export type Color = keyof typeof colors;
`;

        fs.writeFileSync(tsFilePath, tsContent);
        console.log(`✅ Color object and type generated in ${tsFilePath}`);
    } catch (error) {
        console.error('❌ Error generating colors:', error);
    }
}

// 실행
if (require.main === module) {
    generateColors();
}

// 모듈로 export
module.exports = generateColors;
