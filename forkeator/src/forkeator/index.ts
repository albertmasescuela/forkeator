import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


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

    context.logger.info(`📥 Respostes rebudes: ${JSON.stringify(responses)}`);

    // Guarda les respostes en un fitxer
    const responseFile = 'respostes.json';

    if (tree.exists(responseFile)) {
      const existingResponses = JSON.parse(tree.read(responseFile)!.toString('utf-8'));
      tree.overwrite(responseFile, JSON.stringify({ ...existingResponses, ...responses }, null, 2));
    } else {
      tree.create(responseFile, JSON.stringify(responses, null, 2));
    }

    context.logger.info(`✅ Respostes desades al fitxer "${responseFile}".`);

    // Executa accions segons les respostes
    if (tree.exists(responses.fileName)) {
      if (!responses.overwrite) {
        context.logger.warn(`⚠️ El fitxer "${responses.fileName}" ja existeix i no es sobreescriurà.`);
      } else {
        tree.overwrite(responses.fileName, 'Contingut generat per forkeator!');
        context.logger.info(`✅ Fitxer "${responses.fileName}" sobreescrit correctament.`);
      }
    } else {
      tree.create(responses.fileName, 'Contingut generat per forkeator!');
      context.logger.info(`✅ Fitxer "${responses.fileName}" creat correctament.`);
    }

    return tree;
  };
}



