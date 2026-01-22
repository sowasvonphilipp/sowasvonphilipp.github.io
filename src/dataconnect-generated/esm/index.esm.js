import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'deepai',
  location: 'us-east4'
};

export const createUserMutationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUserMutation', inputVars);
}
createUserMutationRef.operationName = 'CreateUserMutation';

export function createUserMutation(dcOrVars, vars) {
  return executeMutation(createUserMutationRef(dcOrVars, vars));
}

export const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';

export function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
}

export const createInteractionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInteraction', inputVars);
}
createInteractionRef.operationName = 'CreateInteraction';

export function createInteraction(dcOrVars, vars) {
  return executeMutation(createInteractionRef(dcOrVars, vars));
}

export const getMyInteractionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyInteractions');
}
getMyInteractionsRef.operationName = 'GetMyInteractions';

export function getMyInteractions(dc) {
  return executeQuery(getMyInteractionsRef(dc));
}

