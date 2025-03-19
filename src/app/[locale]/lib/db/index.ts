import * as userDb from './users';
import * as profileDb from './profiles';
import * as sessionDb from './sessions';
import * as accountDb from './accounts';

export const db = {
  users: userDb,
  profiles: profileDb,
  sessions: sessionDb,
  accounts: accountDb
};

export default db;