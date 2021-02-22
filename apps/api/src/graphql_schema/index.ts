import { resolve } from 'path';
import { makeSchema } from 'nexus';
import { allow, nexusShield } from 'nexus-shield';
import { paljs } from '@paljs/nexus';

import * as GenericResponses from './types/generic_response_types';
import * as Models from './models';
import * as Services from './services';

export const schema = makeSchema({
  types: [GenericResponses, Models, Services],

  plugins: [
    paljs(),
    nexusShield({
      defaultError: new Error('Not allowed'),
      defaultRule: allow,
    }),
  ],

  contextType: {
    module: '@monotonous/types',
    export: 'Context',
  },
  outputs: {
    typegen: resolve(process.cwd(), 'typings/schema/index.d.ts'),
    schema: resolve(process.cwd(), '../../', 'schema.graphql'),
  },
  sourceTypes: {
    modules: [{ module: '@prisma/client', alias: 'prisma' }],
  },
  // prettierConfig: resolve(process.cwd(), '../../', '.prettierrc.json'),
  nonNullDefaults: {
    input: false,
    output: false,
  },
});

export const resolvers = {};
