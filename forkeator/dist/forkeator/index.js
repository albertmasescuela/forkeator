"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forkeator = forkeator;
exports.prompt = prompt;
exports.prompt2 = prompt2;
exports.prompt3 = prompt3;
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function forkeator(_options) {
    return (tree, _context) => {
        _context.logger.info('Schematic forkeator executat!');
        tree.create('nou-fitxer.txt', 'Hola des de forkeator!');
        return tree;
    };
}
// export function prompt(options: any): Rule {
//   return (tree: Tree, context: SchematicContext) => {
//     context.logger.info('🛠️ Executant el forkeator!');
//     const filePath = options.fileName || 'nou-fitxer.txt';
//     if (tree.exists(filePath) && !options.overwrite) {
//       context.logger.warn(`⚠️ El fitxer "${filePath}" ja existeix i no es sobreescriurà.`);
//     } else {
//       tree.overwrite(filePath, 'Contingut generat per forkeator!');
//       context.logger.info(`✅ Fitxer "${filePath}" creat o sobreescrit correctament.`);
//     }
//     return tree;
//   };
// }
function prompt(options) {
    return (tree, context) => {
        context.logger.info('🛠️ Executant el forkeator!');
        const filePath = options.fileName || 'nou-fitxer.txt';
        if (tree.exists(filePath)) {
            if (!options.overwrite) {
                context.logger.warn(`⚠️ El fitxer "${filePath}" ja existeix i no es sobreescriurà.`);
            }
            else {
                tree.overwrite(filePath, 'Contingut generat per forkeator!');
                context.logger.info(`✅ Fitxer "${filePath}" sobreescrit correctament.`);
            }
        }
        else {
            tree.create(filePath, 'Contingut generat per forkeator!');
            context.logger.info(`✅ Fitxer "${filePath}" creat correctament.`);
        }
        return tree;
    };
}
function prompt2(options) {
    return (tree, context) => {
        const responses = {
            fileName: options.fileName || 'nou-fitxer.txt',
            overwrite: options.overwrite || false,
        };
        context.logger.info(`📥 Respostes recibidas: ${JSON.stringify(responses)}`);
        // Guarda les respostes en un fitxer
        const responseFile = 'respuestas.json';
        if (tree.exists(responseFile)) {
            const existingResponses = JSON.parse(tree.read(responseFile).toString('utf-8'));
            tree.overwrite(responseFile, JSON.stringify(Object.assign(Object.assign({}, existingResponses), responses), null, 2));
        }
        else {
            tree.create(responseFile, JSON.stringify(responses, null, 2));
        }
        context.logger.info(`✅ Respuestas "${responseFile}".`);
        return tree;
    };
}
function prompt3(options) {
    return (tree, context) => {
        const responses = {
            fileName: options.fileName || 'nou-fitxer.txt',
            overwrite: options.overwrite || false,
            destinationPath: options.destinationPath || '' // 🆕 Afegim la ruta de destí
        };
        context.logger.info(`📥 Respostes rebudes: ${JSON.stringify(responses)}`);
        // Guarda les respostes en un fitxer
        const responseFile = 'respuestas.json';
        if (tree.exists(responseFile)) {
            const existingResponses = JSON.parse(tree.read(responseFile).toString('utf-8'));
            tree.overwrite(responseFile, JSON.stringify(Object.assign(Object.assign({}, existingResponses), responses), null, 2));
        }
        else {
            tree.create(responseFile, JSON.stringify(responses, null, 2));
        }
        context.logger.info(`✅ Respostes guardades a "${responseFile}".`);
        return tree;
    };
}
//# sourceMappingURL=index.js.map