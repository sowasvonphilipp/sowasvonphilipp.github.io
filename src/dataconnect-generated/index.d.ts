import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AIInstance_Key {
  id: UUIDString;
  __typename?: 'AIInstance_Key';
}

export interface ActivationCode_Key {
  id: UUIDString;
  __typename?: 'ActivationCode_Key';
}

export interface CreateInteractionData {
  interaction_insert: Interaction_Key;
}

export interface CreateInteractionVariables {
  aiInstanceId: UUIDString;
  prompt: string;
  response: string;
}

export interface CreateUserMutationData {
  user_insert: User_Key;
}

export interface CreateUserMutationVariables {
  email: string;
  username: string;
  passwordHash: string;
}

export interface GetMyInteractionsData {
  interactions: ({
    id: UUIDString;
    aiInstanceId: UUIDString;
    prompt: string;
    response: string;
    timestamp: TimestampString;
  } & Interaction_Key)[];
}

export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    username: string;
    email: string;
    createdAt: TimestampString;
    displayName?: string | null;
  } & User_Key)[];
}

export interface GetUserByEmailVariables {
  email: string;
}

export interface Interaction_Key {
  id: UUIDString;
  __typename?: 'Interaction_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserMutationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserMutationVariables): MutationRef<CreateUserMutationData, CreateUserMutationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserMutationVariables): MutationRef<CreateUserMutationData, CreateUserMutationVariables>;
  operationName: string;
}
export const createUserMutationRef: CreateUserMutationRef;

export function createUserMutation(vars: CreateUserMutationVariables): MutationPromise<CreateUserMutationData, CreateUserMutationVariables>;
export function createUserMutation(dc: DataConnect, vars: CreateUserMutationVariables): MutationPromise<CreateUserMutationData, CreateUserMutationVariables>;

interface GetUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
  operationName: string;
}
export const getUserByEmailRef: GetUserByEmailRef;

export function getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;
export function getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface CreateInteractionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInteractionVariables): MutationRef<CreateInteractionData, CreateInteractionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInteractionVariables): MutationRef<CreateInteractionData, CreateInteractionVariables>;
  operationName: string;
}
export const createInteractionRef: CreateInteractionRef;

export function createInteraction(vars: CreateInteractionVariables): MutationPromise<CreateInteractionData, CreateInteractionVariables>;
export function createInteraction(dc: DataConnect, vars: CreateInteractionVariables): MutationPromise<CreateInteractionData, CreateInteractionVariables>;

interface GetMyInteractionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyInteractionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyInteractionsData, undefined>;
  operationName: string;
}
export const getMyInteractionsRef: GetMyInteractionsRef;

export function getMyInteractions(): QueryPromise<GetMyInteractionsData, undefined>;
export function getMyInteractions(dc: DataConnect): QueryPromise<GetMyInteractionsData, undefined>;

