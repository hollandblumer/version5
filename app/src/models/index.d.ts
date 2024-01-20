import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly about?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly about?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject

export declare const Project: (new (init: ModelInit<Project>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

type EagerFollow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Follow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users?: (FollowUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFollow = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Follow, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users: AsyncCollection<FollowUser>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Follow = LazyLoading extends LazyLoadingDisabled ? EagerFollow : LazyFollow

export declare const Follow: (new (init: ModelInit<Follow>) => Follow) & {
  copyOf(source: Follow, mutator: (draft: MutableModel<Follow>) => MutableModel<Follow> | void): Follow;
}

type EagerNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly Milestone?: Milestone | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly notificationMilestoneId?: string | null;
}

type LazyNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly Milestone: AsyncItem<Milestone | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly notificationMilestoneId?: string | null;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

type EagerVerification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Verification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly suggestion?: string | null;
  readonly milestone?: string | null;
  readonly userApprovalName?: string | null;
  readonly isVerified?: boolean | null;
  readonly filePathApproval?: string | null;
  readonly brandName?: string | null;
  readonly userDisapprovalName?: string | null;
  readonly filePathDisapproval?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVerification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Verification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly suggestion?: string | null;
  readonly milestone?: string | null;
  readonly userApprovalName?: string | null;
  readonly isVerified?: boolean | null;
  readonly filePathApproval?: string | null;
  readonly brandName?: string | null;
  readonly userDisapprovalName?: string | null;
  readonly filePathDisapproval?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Verification = LazyLoading extends LazyLoadingDisabled ? EagerVerification : LazyVerification

export declare const Verification: (new (init: ModelInit<Verification>) => Verification) & {
  copyOf(source: Verification, mutator: (draft: MutableModel<Verification>) => MutableModel<Verification> | void): Verification;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly update?: string | null;
  readonly filePath?: string | null;
  readonly strength?: number | null;
  readonly isBusiness?: boolean | null;
  readonly location?: string | null;
  readonly bio?: string | null;
  readonly isPrivate?: boolean | null;
  readonly parentBrand?: string | null;
  readonly isVerified?: boolean | null;
  readonly hasCompletedForm?: boolean | null;
  readonly industry?: string | null;
  readonly Suggestions?: (UserSuggestion | null)[] | null;
  readonly followers?: (FollowUser | null)[] | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly country?: string | null;
  readonly size?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly update?: string | null;
  readonly filePath?: string | null;
  readonly strength?: number | null;
  readonly isBusiness?: boolean | null;
  readonly location?: string | null;
  readonly bio?: string | null;
  readonly isPrivate?: boolean | null;
  readonly parentBrand?: string | null;
  readonly isVerified?: boolean | null;
  readonly hasCompletedForm?: boolean | null;
  readonly industry?: string | null;
  readonly Suggestions: AsyncCollection<UserSuggestion>;
  readonly followers: AsyncCollection<FollowUser>;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly country?: string | null;
  readonly size?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerSuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Suggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessName?: string | null;
  readonly suggestion?: string | null;
  readonly verified?: boolean | null;
  readonly icon?: string | null;
  readonly unique?: boolean | null;
  readonly show?: boolean | null;
  readonly feature?: boolean | null;
  readonly compliment?: boolean | null;
  readonly users?: (UserSuggestion | null)[] | null;
  readonly Milestones?: (Milestone | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Suggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly businessName?: string | null;
  readonly suggestion?: string | null;
  readonly verified?: boolean | null;
  readonly icon?: string | null;
  readonly unique?: boolean | null;
  readonly show?: boolean | null;
  readonly feature?: boolean | null;
  readonly compliment?: boolean | null;
  readonly users: AsyncCollection<UserSuggestion>;
  readonly Milestones: AsyncCollection<Milestone>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Suggestion = LazyLoading extends LazyLoadingDisabled ? EagerSuggestion : LazySuggestion

export declare const Suggestion: (new (init: ModelInit<Suggestion>) => Suggestion) & {
  copyOf(source: Suggestion, mutator: (draft: MutableModel<Suggestion>) => MutableModel<Suggestion> | void): Suggestion;
}

type EagerMilestone = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Milestone, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly milestone?: string | null;
  readonly brandName?: string | null;
  readonly suggestionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMilestone = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Milestone, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly milestone?: string | null;
  readonly brandName?: string | null;
  readonly suggestionID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Milestone = LazyLoading extends LazyLoadingDisabled ? EagerMilestone : LazyMilestone

export declare const Milestone: (new (init: ModelInit<Milestone>) => Milestone) & {
  copyOf(source: Milestone, mutator: (draft: MutableModel<Milestone>) => MutableModel<Milestone> | void): Milestone;
}

type EagerFollowUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FollowUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly followId?: string | null;
  readonly userId?: string | null;
  readonly follow: Follow;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFollowUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FollowUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly followId?: string | null;
  readonly userId?: string | null;
  readonly follow: AsyncItem<Follow>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FollowUser = LazyLoading extends LazyLoadingDisabled ? EagerFollowUser : LazyFollowUser

export declare const FollowUser: (new (init: ModelInit<FollowUser>) => FollowUser) & {
  copyOf(source: FollowUser, mutator: (draft: MutableModel<FollowUser>) => MutableModel<FollowUser> | void): FollowUser;
}

type EagerUserSuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSuggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly suggestionId?: string | null;
  readonly user: User;
  readonly suggestion: Suggestion;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSuggestion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSuggestion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly suggestionId?: string | null;
  readonly user: AsyncItem<User>;
  readonly suggestion: AsyncItem<Suggestion>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSuggestion = LazyLoading extends LazyLoadingDisabled ? EagerUserSuggestion : LazyUserSuggestion

export declare const UserSuggestion: (new (init: ModelInit<UserSuggestion>) => UserSuggestion) & {
  copyOf(source: UserSuggestion, mutator: (draft: MutableModel<UserSuggestion>) => MutableModel<UserSuggestion> | void): UserSuggestion;
}