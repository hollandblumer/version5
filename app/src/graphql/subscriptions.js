/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVerification = /* GraphQL */ `
  subscription OnCreateVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onCreateVerification(filter: $filter) {
      id
      suggestion
      milestone
      userApprovalName
      isVerified
      filePathApproval
      brandName
      userDisapprovalName
      filePathDisapproval
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateVerification = /* GraphQL */ `
  subscription OnUpdateVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onUpdateVerification(filter: $filter) {
      id
      suggestion
      milestone
      userApprovalName
      isVerified
      filePathApproval
      brandName
      userDisapprovalName
      filePathDisapproval
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteVerification = /* GraphQL */ `
  subscription OnDeleteVerification(
    $filter: ModelSubscriptionVerificationFilterInput
  ) {
    onDeleteVerification(filter: $filter) {
      id
      suggestion
      milestone
      userApprovalName
      isVerified
      filePathApproval
      brandName
      userDisapprovalName
      filePathDisapproval
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      email
      update
      filePath
      strength
      isBusiness
      location
      bio
      isPrivate
      parentBrand
      isVerified
      hasCompletedForm
      industry
      Suggestions {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      email
      update
      filePath
      strength
      isBusiness
      location
      bio
      isPrivate
      parentBrand
      isVerified
      hasCompletedForm
      industry
      Suggestions {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      email
      update
      filePath
      strength
      isBusiness
      location
      bio
      isPrivate
      parentBrand
      isVerified
      hasCompletedForm
      industry
      Suggestions {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateSuggestion = /* GraphQL */ `
  subscription OnCreateSuggestion(
    $filter: ModelSubscriptionSuggestionFilterInput
  ) {
    onCreateSuggestion(filter: $filter) {
      id
      businessName
      suggestion
      verified
      icon
      unique
      show
      compliment
      users {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateSuggestion = /* GraphQL */ `
  subscription OnUpdateSuggestion(
    $filter: ModelSubscriptionSuggestionFilterInput
  ) {
    onUpdateSuggestion(filter: $filter) {
      id
      businessName
      suggestion
      verified
      icon
      unique
      show
      compliment
      users {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteSuggestion = /* GraphQL */ `
  subscription OnDeleteSuggestion(
    $filter: ModelSubscriptionSuggestionFilterInput
  ) {
    onDeleteSuggestion(filter: $filter) {
      id
      businessName
      suggestion
      verified
      icon
      unique
      show
      compliment
      users {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateMilestone = /* GraphQL */ `
  subscription OnCreateMilestone(
    $filter: ModelSubscriptionMilestoneFilterInput
  ) {
    onCreateMilestone(filter: $filter) {
      id
      suggestion
      milestone
      brandName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateMilestone = /* GraphQL */ `
  subscription OnUpdateMilestone(
    $filter: ModelSubscriptionMilestoneFilterInput
  ) {
    onUpdateMilestone(filter: $filter) {
      id
      suggestion
      milestone
      brandName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteMilestone = /* GraphQL */ `
  subscription OnDeleteMilestone(
    $filter: ModelSubscriptionMilestoneFilterInput
  ) {
    onDeleteMilestone(filter: $filter) {
      id
      suggestion
      milestone
      brandName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateUserSuggestion = /* GraphQL */ `
  subscription OnCreateUserSuggestion(
    $filter: ModelSubscriptionUserSuggestionFilterInput
  ) {
    onCreateUserSuggestion(filter: $filter) {
      id
      userId
      suggestionId
      user {
        id
        name
        email
        update
        filePath
        strength
        isBusiness
        location
        bio
        isPrivate
        parentBrand
        isVerified
        hasCompletedForm
        industry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      suggestion {
        id
        businessName
        suggestion
        verified
        icon
        unique
        show
        compliment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateUserSuggestion = /* GraphQL */ `
  subscription OnUpdateUserSuggestion(
    $filter: ModelSubscriptionUserSuggestionFilterInput
  ) {
    onUpdateUserSuggestion(filter: $filter) {
      id
      userId
      suggestionId
      user {
        id
        name
        email
        update
        filePath
        strength
        isBusiness
        location
        bio
        isPrivate
        parentBrand
        isVerified
        hasCompletedForm
        industry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      suggestion {
        id
        businessName
        suggestion
        verified
        icon
        unique
        show
        compliment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteUserSuggestion = /* GraphQL */ `
  subscription OnDeleteUserSuggestion(
    $filter: ModelSubscriptionUserSuggestionFilterInput
  ) {
    onDeleteUserSuggestion(filter: $filter) {
      id
      userId
      suggestionId
      user {
        id
        name
        email
        update
        filePath
        strength
        isBusiness
        location
        bio
        isPrivate
        parentBrand
        isVerified
        hasCompletedForm
        industry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      suggestion {
        id
        businessName
        suggestion
        verified
        icon
        unique
        show
        compliment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
