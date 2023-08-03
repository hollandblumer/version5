// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Verification, User, Suggestion, Milestone, UserSuggestion } = initSchema(schema);

export {
  Verification,
  User,
  Suggestion,
  Milestone,
  UserSuggestion
};