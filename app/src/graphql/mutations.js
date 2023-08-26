/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVerification = /* GraphQL */ `
  mutation CreateVerification(
    $input: CreateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    createVerification(input: $input, condition: $condition) {
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
export const updateVerification = /* GraphQL */ `
  mutation UpdateVerification(
    $input: UpdateVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    updateVerification(input: $input, condition: $condition) {
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
export const deleteVerification = /* GraphQL */ `
  mutation DeleteVerification(
    $input: DeleteVerificationInput!
    $condition: ModelVerificationConditionInput
  ) {
    deleteVerification(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createSuggestion = /* GraphQL */ `
  mutation CreateSuggestion(
    $input: CreateSuggestionInput!
    $condition: ModelSuggestionConditionInput
  ) {
    createSuggestion(input: $input, condition: $condition) {
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
export const updateSuggestion = /* GraphQL */ `
  mutation UpdateSuggestion(
    $input: UpdateSuggestionInput!
    $condition: ModelSuggestionConditionInput
  ) {
    updateSuggestion(input: $input, condition: $condition) {
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
export const deleteSuggestion = /* GraphQL */ `
  mutation DeleteSuggestion(
    $input: DeleteSuggestionInput!
    $condition: ModelSuggestionConditionInput
  ) {
    deleteSuggestion(input: $input, condition: $condition) {
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
export const createMilestone = /* GraphQL */ `
  mutation CreateMilestone(
    $input: CreateMilestoneInput!
    $condition: ModelMilestoneConditionInput
  ) {
    createMilestone(input: $input, condition: $condition) {
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
export const updateMilestone = /* GraphQL */ `
  mutation UpdateMilestone(
    $input: UpdateMilestoneInput!
    $condition: ModelMilestoneConditionInput
  ) {
    updateMilestone(input: $input, condition: $condition) {
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
export const deleteMilestone = /* GraphQL */ `
  mutation DeleteMilestone(
    $input: DeleteMilestoneInput!
    $condition: ModelMilestoneConditionInput
  ) {
    deleteMilestone(input: $input, condition: $condition) {
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
export const createUserSuggestion = /* GraphQL */ `
  mutation CreateUserSuggestion(
    $input: CreateUserSuggestionInput!
    $condition: ModelUserSuggestionConditionInput
  ) {
    createUserSuggestion(input: $input, condition: $condition) {
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
export const updateUserSuggestion = /* GraphQL */ `
  mutation UpdateUserSuggestion(
    $input: UpdateUserSuggestionInput!
    $condition: ModelUserSuggestionConditionInput
  ) {
    updateUserSuggestion(input: $input, condition: $condition) {
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
export const deleteUserSuggestion = /* GraphQL */ `
  mutation DeleteUserSuggestion(
    $input: DeleteUserSuggestionInput!
    $condition: ModelUserSuggestionConditionInput
  ) {
    deleteUserSuggestion(input: $input, condition: $condition) {
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
