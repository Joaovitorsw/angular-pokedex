import * as dotenv from 'dotenv';
import { writeFile } from 'fs';
import { argv } from 'yargs';
dotenv.config({ path: __dirname + '/.env' });

const environment = (argv as any).environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.dev.ts`;

const environmentFileContent = `export const environment = {
  production: ${isProduction},
};
`;

writeFile(targetPath, environmentFileContent, (err) => {
  if (err) console.log(err);

  console.log(`Wrote variables to ${targetPath}`);
});
