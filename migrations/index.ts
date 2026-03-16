import * as migration_20260316_014410 from './20260316_014410';
import * as migration_20260316_183412 from './20260316_183412';

export const migrations = [
  {
    up: migration_20260316_014410.up,
    down: migration_20260316_014410.down,
    name: '20260316_014410',
  },
  {
    up: migration_20260316_183412.up,
    down: migration_20260316_183412.down,
    name: '20260316_183412'
  },
];
