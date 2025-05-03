const fs = require('fs');

// SCSS 파일 경로
const scssFilePath = './src/styles/_typography.scss';
// 생성할 TypeScript 파일 경로
const tsFilePath = './src/types/typography.d.ts';

// 정규식: 믹스인 이름 추출
const mixinRegex = /@mixin\s+(text-preset-[\w-]+)/g;

// SCSS 파일에서 믹스인 이름 추출 및 TypeScript 타입 생성
function generateTypographyTypes() {
    try {
        const scssContent = fs.readFileSync(scssFilePath, 'utf-8');
        const presetNames = Array.from(scssContent.matchAll(mixinRegex)).map(match => match[1]);

        const tsContent = `// This file is auto-generated from ${scssFilePath}

export type TypographyPreset = ${presetNames.map(name => `'${name}'`).join(' | ')};
`;

        fs.writeFileSync(tsFilePath, tsContent);
        console.log(`✅ TypographyPreset type generated in ${tsFilePath}`);
    } catch (error) {
        console.error('❌ Error generating TypographyPreset type:', error);
    }
}

// 실행
if (require.main === module) {
    generateTypographyTypes();
}

// 모듈로 export
module.exports = generateTypographyTypes;
