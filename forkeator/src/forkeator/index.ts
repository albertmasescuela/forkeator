import { Rule, SchematicContext, Tree, externalSchematic } from '@angular-devkit/schematics';
import * as path from 'path';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function forkeator(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
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

export function prompt(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('🛠️ Executant el forkeator!');

    const filePath = options.fileName || 'nou-fitxer.txt';

    if (tree.exists(filePath)) {
      if (!options.overwrite) {
        context.logger.warn(`⚠️ El fitxer "${filePath}" ja existeix i no es sobreescriurà.`);
      } else {
        tree.overwrite(filePath, 'Contingut generat per forkeator!');
        context.logger.info(`✅ Fitxer "${filePath}" sobreescrit correctament.`);
      }
    } else {
      tree.create(filePath, 'Contingut generat per forkeator!');
      context.logger.info(`✅ Fitxer "${filePath}" creat correctament.`);
    }

    return tree;
  };
}

export function prompt2(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const responses = {
      fileName: options.fileName || 'nou-fitxer.txt',
      overwrite: options.overwrite || false,
    };

    context.logger.info(`📥 Respostes recibidas: ${JSON.stringify(responses)}`);

    // Guarda les respostes en un fitxer
    const responseFile = 'respuestas.json';

    if (tree.exists(responseFile)) {
      const existingResponses = JSON.parse(tree.read(responseFile)!.toString('utf-8'));
      tree.overwrite(responseFile, JSON.stringify({ ...existingResponses, ...responses }, null, 2));
    } else {
      tree.create(responseFile, JSON.stringify(responses, null, 2));
    }

    context.logger.info(`✅ Respuestas "${responseFile}".`);

    return tree;
  };
}

// export function prompt3(options: any): Rule {
//   return (tree: Tree, context: SchematicContext) => {
//     const responses = {
//       fileName: options.fileName || 'nou-fitxer.txt',
//       overwrite: options.overwrite || false,
//       destinationPath: options.destinationPath || '' // 🆕 Afegim la ruta de destí
//     };

//     context.logger.info(`📥 Respostes rebudes: ${JSON.stringify(responses)}`);

//     // Guarda les respostes en un fitxer
//     const responseFile = 'respuestas.json';

//     if (tree.exists(responseFile)) {
//       const existingResponses = JSON.parse(tree.read(responseFile)!.toString('utf-8'));
//       tree.overwrite(responseFile, JSON.stringify({ ...existingResponses, ...responses }, null, 2));
//     } else {
//       tree.create(responseFile, JSON.stringify(responses, null, 2));
//     }

//     context.logger.info(`✅ Respostes guardades a "${responseFile}".`);

//     return tree;
//   };
// }

export function prompt3(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const responses = {
      fileName: options.fileName || 'nou-fitxer.txt',
      overwrite: options.overwrite || false,
      destinationPath: options.destinationPath || ''
    };

    context.logger.info(`📥 Respostes rebudes: ${JSON.stringify(responses)}`);

    // Guarda les respostes en un fitxer
    const responseFile = 'respuestas.json';
    if (tree.exists(responseFile)) {
      const existingResponses = JSON.parse(tree.read(responseFile)!.toString('utf-8'));
      tree.overwrite(responseFile, JSON.stringify({ ...existingResponses, ...responses }, null, 2));
    } else {
      tree.create(responseFile, JSON.stringify(responses, null, 2));
    }

    if (!responses.destinationPath) {
      context.logger.warn(`⚠️ No s'ha especificat cap ruta de destí.`);
      return tree;
    }

    const targetPath = path.resolve(responses.destinationPath);

    // 🏗️ Genera un projecte Angular a la ruta especificada
    return externalSchematic('@schematics/angular', 'ng-new', {
      name: 'nou-projecte',
      directory: targetPath,
      version: '18.0.0',
      routing: true,
      style: 'scss'
    });
  };
}





