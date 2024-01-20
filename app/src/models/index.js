// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project, Follow, Notification, Verification, User, Suggestion, Milestone, FollowUser, UserSuggestion } = initSchema(schema);

export {
  Project,
  Follow,
  Notification,
  Verification,
  User,
  Suggestion,
  Milestone,
  FollowUser,
  UserSuggestion
};