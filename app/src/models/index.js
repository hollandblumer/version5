// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Follow, Notification, Verification, User, Suggestion, Milestone, FollowUser, UserSuggestion } = initSchema(schema);

export {
  Follow,
  Notification,
  Verification,
  User,
  Suggestion,
  Milestone,
  FollowUser,
  UserSuggestion
};