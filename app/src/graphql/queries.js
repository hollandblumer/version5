/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVerification = /* GraphQL */ `
  query GetVerification($id: ID!) {
    getVerification(id: $id) {
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
export const listVerifications = /* GraphQL */ `
  query ListVerifications(
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVerifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncVerifications = /* GraphQL */ `
  query SyncVerifications(
    $filter: ModelVerificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVerifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSuggestion = /* GraphQL */ `
  query GetSuggestion($id: ID!) {
    getSuggestion(id: $id) {
      id
      businessName
      suggestion
      verified
      icon
      unique
      show
      feature
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
export const listSuggestions = /* GraphQL */ `
  query ListSuggestions(
    $filter: ModelSuggestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSuggestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        businessName
        suggestion
        verified
        icon
        unique
        show
        feature
        compliment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSuggestions = /* GraphQL */ `
  query SyncSuggestions(
    $filter: ModelSuggestionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSuggestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        businessName
        suggestion
        verified
        icon
        unique
        show
        feature
        compliment
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMilestone = /* GraphQL */ `
  query GetMilestone($id: ID!) {
    getMilestone(id: $id) {
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
export const listMilestones = /* GraphQL */ `
  query ListMilestones(
    $filter: ModelMilestoneFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMilestones(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMilestones = /* GraphQL */ `
  query SyncMilestones(
    $filter: ModelMilestoneFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMilestones(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserSuggestion = /* GraphQL */ `
  query GetUserSuggestion($id: ID!) {
    getUserSuggestion(id: $id) {
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
        feature
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
export const listUserSuggestions = /* GraphQL */ `
  query ListUserSuggestions(
    $filter: ModelUserSuggestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSuggestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        suggestionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserSuggestions = /* GraphQL */ `
  query SyncUserSuggestions(
    $filter: ModelUserSuggestionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserSuggestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userId
        suggestionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userSuggestionsByUserId = /* GraphQL */ `
  query UserSuggestionsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSuggestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSuggestionsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        suggestionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const userSuggestionsBySuggestionId = /* GraphQL */ `
  query UserSuggestionsBySuggestionId(
    $suggestionId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserSuggestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userSuggestionsBySuggestionId(
      suggestionId: $suggestionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        suggestionId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
