import moduleAlias from 'module-alias';
import path from 'path';
import fs from 'fs';

const SRC_DIR = path.resolve(__dirname, '..', '..', '..');

const configuration = JSON.parse(
  fs.readFileSync(path.resolve(SRC_DIR, '..', 'tsconfig.json'), 'utf-8'),
);

const aliasArray = Object.keys(configuration.compilerOptions.paths);

const aliasWithPath = aliasArray.map(alias => ({
  alias: alias.replace('/*', ''),
  path: alias.replace(/[^a-z]/g, ''),
}));

const aliasMounted = Object.assign(
  {},
  ...aliasWithPath.map(config => ({
    [config.alias]: path.resolve(SRC_DIR, config.path),
  })),
);

moduleAlias.addAliases(aliasMounted);
