# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUserMutation, getUserByEmail, createInteraction, getMyInteractions } from '@dataconnect/generated';


// Operation CreateUserMutation:  For variables, look at type CreateUserMutationVars in ../index.d.ts
const { data } = await CreateUserMutation(dataConnect, createUserMutationVars);

// Operation GetUserByEmail:  For variables, look at type GetUserByEmailVars in ../index.d.ts
const { data } = await GetUserByEmail(dataConnect, getUserByEmailVars);

// Operation CreateInteraction:  For variables, look at type CreateInteractionVars in ../index.d.ts
const { data } = await CreateInteraction(dataConnect, createInteractionVars);

// Operation GetMyInteractions: 
const { data } = await GetMyInteractions(dataConnect);


```