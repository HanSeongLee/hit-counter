const chokidar = require('chokidar');
const generateColors = require('./generateColors');
const generateTypographyTypes = require('./generateTypographyTypes');

const colorsFilePath = './src/styles/_colors.scss';
chokidar.watch(colorsFilePath).on('change', () => {
    console.log('🔄 SCSS file changed. Regenerating colors...');
    generateColors();
});

const typographyFilePath = './src/styles/_typography.scss';
chokidar.watch(typographyFilePath).on('change', () => {
    console.log('🔄 SCSS file changed. Regenerating typography types...');
    generateTypographyTypes();
});
