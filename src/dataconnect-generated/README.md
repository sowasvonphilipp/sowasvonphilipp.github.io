# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserByEmail*](#getuserbyemail)
  - [*GetMyInteractions*](#getmyinteractions)
- [**Mutations**](#mutations)
  - [*CreateUserMutation*](#createusermutation)
  - [*CreateInteraction*](#createinteraction)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserByEmail
You can execute the `GetUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserByEmail(vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByEmail(dc: DataConnect, vars: GetUserByEmailVariables): QueryPromise<GetUserByEmailData, GetUserByEmailVariables>;

interface GetUserByEmailRef {
  ...
  (dc: DataConnect, vars: GetUserByEmailVariables): QueryRef<GetUserByEmailData, GetUserByEmailVariables>;
}
export const getUserByEmailRef: GetUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByEmailRef:
```typescript
const name = getUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `GetUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByEmailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByEmailData {
  users: ({
    id: UUIDString;
    username: string;
    email: string;
    createdAt: TimestampString;
    displayName?: string | null;
  } & User_Key)[];
}
```
### Using `GetUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByEmail, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByEmail(getUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await getUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByEmail(dataConnect, getUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByEmail(getUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByEmailRef, GetUserByEmailVariables } from '@dataconnect/generated';

// The `GetUserByEmail` query requires an argument of type `GetUserByEmailVariables`:
const getUserByEmailVars: GetUserByEmailVariables = {
  email: ..., 
};

// Call the `getUserByEmailRef()` function to get a reference to the query.
const ref = getUserByEmailRef(getUserByEmailVars);
// Variables can be defined inline as well.
const ref = getUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByEmailRef(dataConnect, getUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetMyInteractions
You can execute the `GetMyInteractions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyInteractions(): QueryPromise<GetMyInteractionsData, undefined>;

interface GetMyInteractionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyInteractionsData, undefined>;
}
export const getMyInteractionsRef: GetMyInteractionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyInteractions(dc: DataConnect): QueryPromise<GetMyInteractionsData, undefined>;

interface GetMyInteractionsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyInteractionsData, undefined>;
}
export const getMyInteractionsRef: GetMyInteractionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyInteractionsRef:
```typescript
const name = getMyInteractionsRef.operationName;
console.log(name);
```

### Variables
The `GetMyInteractions` query has no variables.
### Return Type
Recall that executing the `GetMyInteractions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyInteractionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyInteractionsData {
  interactions: ({
    id: UUIDString;
    aiInstanceId: UUIDString;
    prompt: string;
    response: string;
    timestamp: TimestampString;
  } & Interaction_Key)[];
}
```
### Using `GetMyInteractions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyInteractions } from '@dataconnect/generated';


// Call the `getMyInteractions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyInteractions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyInteractions(dataConnect);

console.log(data.interactions);

// Or, you can use the `Promise` API.
getMyInteractions().then((response) => {
  const data = response.data;
  console.log(data.interactions);
});
```

### Using `GetMyInteractions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyInteractionsRef } from '@dataconnect/generated';


// Call the `getMyInteractionsRef()` function to get a reference to the query.
const ref = getMyInteractionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyInteractionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.interactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.interactions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUserMutation
You can execute the `CreateUserMutation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUserMutation(vars: CreateUserMutationVariables): MutationPromise<CreateUserMutationData, CreateUserMutationVariables>;

interface CreateUserMutationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserMutationVariables): MutationRef<CreateUserMutationData, CreateUserMutationVariables>;
}
export const createUserMutationRef: CreateUserMutationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUserMutation(dc: DataConnect, vars: CreateUserMutationVariables): MutationPromise<CreateUserMutationData, CreateUserMutationVariables>;

interface CreateUserMutationRef {
  ...
  (dc: DataConnect, vars: CreateUserMutationVariables): MutationRef<CreateUserMutationData, CreateUserMutationVariables>;
}
export const createUserMutationRef: CreateUserMutationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserMutationRef:
```typescript
const name = createUserMutationRef.operationName;
console.log(name);
```

### Variables
The `CreateUserMutation` mutation requires an argument of type `CreateUserMutationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserMutationVariables {
  email: string;
  username: string;
  passwordHash: string;
}
```
### Return Type
Recall that executing the `CreateUserMutation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserMutationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserMutationData {
  user_insert: User_Key;
}
```
### Using `CreateUserMutation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUserMutation, CreateUserMutationVariables } from '@dataconnect/generated';

// The `CreateUserMutation` mutation requires an argument of type `CreateUserMutationVariables`:
const createUserMutationVars: CreateUserMutationVariables = {
  email: ..., 
  username: ..., 
  passwordHash: ..., 
};

// Call the `createUserMutation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUserMutation(createUserMutationVars);
// Variables can be defined inline as well.
const { data } = await createUserMutation({ email: ..., username: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUserMutation(dataConnect, createUserMutationVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUserMutation(createUserMutationVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUserMutation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserMutationRef, CreateUserMutationVariables } from '@dataconnect/generated';

// The `CreateUserMutation` mutation requires an argument of type `CreateUserMutationVariables`:
const createUserMutationVars: CreateUserMutationVariables = {
  email: ..., 
  username: ..., 
  passwordHash: ..., 
};

// Call the `createUserMutationRef()` function to get a reference to the mutation.
const ref = createUserMutationRef(createUserMutationVars);
// Variables can be defined inline as well.
const ref = createUserMutationRef({ email: ..., username: ..., passwordHash: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserMutationRef(dataConnect, createUserMutationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateInteraction
You can execute the `CreateInteraction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createInteraction(vars: CreateInteractionVariables): MutationPromise<CreateInteractionData, CreateInteractionVariables>;

interface CreateInteractionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInteractionVariables): MutationRef<CreateInteractionData, CreateInteractionVariables>;
}
export const createInteractionRef: CreateInteractionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInteraction(dc: DataConnect, vars: CreateInteractionVariables): MutationPromise<CreateInteractionData, CreateInteractionVariables>;

interface CreateInteractionRef {
  ...
  (dc: DataConnect, vars: CreateInteractionVariables): MutationRef<CreateInteractionData, CreateInteractionVariables>;
}
export const createInteractionRef: CreateInteractionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInteractionRef:
```typescript
const name = createInteractionRef.operationName;
console.log(name);
```

### Variables
The `CreateInteraction` mutation requires an argument of type `CreateInteractionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInteractionVariables {
  aiInstanceId: UUIDString;
  prompt: string;
  response: string;
}
```
### Return Type
Recall that executing the `CreateInteraction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInteractionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInteractionData {
  interaction_insert: Interaction_Key;
}
```
### Using `CreateInteraction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInteraction, CreateInteractionVariables } from '@dataconnect/generated';

// The `CreateInteraction` mutation requires an argument of type `CreateInteractionVariables`:
const createInteractionVars: CreateInteractionVariables = {
  aiInstanceId: ..., 
  prompt: ..., 
  response: ..., 
};

// Call the `createInteraction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInteraction(createInteractionVars);
// Variables can be defined inline as well.
const { data } = await createInteraction({ aiInstanceId: ..., prompt: ..., response: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInteraction(dataConnect, createInteractionVars);

console.log(data.interaction_insert);

// Or, you can use the `Promise` API.
createInteraction(createInteractionVars).then((response) => {
  const data = response.data;
  console.log(data.interaction_insert);
});
```

### Using `CreateInteraction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInteractionRef, CreateInteractionVariables } from '@dataconnect/generated';

// The `CreateInteraction` mutation requires an argument of type `CreateInteractionVariables`:
const createInteractionVars: CreateInteractionVariables = {
  aiInstanceId: ..., 
  prompt: ..., 
  response: ..., 
};

// Call the `createInteractionRef()` function to get a reference to the mutation.
const ref = createInteractionRef(createInteractionVars);
// Variables can be defined inline as well.
const ref = createInteractionRef({ aiInstanceId: ..., prompt: ..., response: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInteractionRef(dataConnect, createInteractionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.interaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.interaction_insert);
});
```

