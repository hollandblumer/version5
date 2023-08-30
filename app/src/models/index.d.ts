import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





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
  readonly suggestion?: string | null;
  readonly milestone?: string | null;
  readonly brandName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMilestone = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Milestone, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly suggestion?: string | null;
  readonly milestone?: string | null;
  readonly brandName?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Milestone = LazyLoading extends LazyLoadingDisabled ? EagerMilestone : LazyMilestone

export declare const Milestone: (new (init: ModelInit<Milestone>) => Milestone) & {
  copyOf(source: Milestone, mutator: (draft: MutableModel<Milestone>) => MutableModel<Milestone> | void): Milestone;
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