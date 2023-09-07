// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Notification, Verification, User, Suggestion, Milestone, UserSuggestion } = initSchema(schema);

export {
  Notification,
  Verification,
  User,
  Suggestion,
  Milestone,
  UserSuggestion
};