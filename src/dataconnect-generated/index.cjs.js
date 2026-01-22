const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'deepai',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserMutationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUserMutation', inputVars);
}
createUserMutationRef.operationName = 'CreateUserMutation';
exports.createUserMutationRef = createUserMutationRef;

exports.createUserMutation = function createUserMutation(dcOrVars, vars) {
  return executeMutation(createUserMutationRef(dcOrVars, vars));
};

const getUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByEmail', inputVars);
}
getUserByEmailRef.operationName = 'GetUserByEmail';
exports.getUserByEmailRef = getUserByEmailRef;

exports.getUserByEmail = function getUserByEmail(dcOrVars, vars) {
  return executeQuery(getUserByEmailRef(dcOrVars, vars));
};

const createInteractionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInteraction', inputVars);
}
createInteractionRef.operationName = 'CreateInteraction';
exports.createInteractionRef = createInteractionRef;

exports.createInteraction = function createInteraction(dcOrVars, vars) {
  return executeMutation(createInteractionRef(dcOrVars, vars));
};

const getMyInteractionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyInteractions');
}
getMyInteractionsRef.operationName = 'GetMyInteractions';
exports.getMyInteractionsRef = getMyInteractionsRef;

exports.getMyInteractions = function getMyInteractions(dc) {
  return executeQuery(getMyInteractionsRef(dc));
};
