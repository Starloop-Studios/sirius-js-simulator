const baseUrlForEndPoints = '{"protocol":"https://","host":"el0zw5orgg.execute-api.us-east-1.amazonaws.com/dev", "port":""}';
//const baseUrlForEndPoints = '{"protocol":"http://","host":"localhost", "port":":3000"}';

const tempAppIdKeyForInitialToken = '{"siriusId": "", "siriusKey":"", "appId":"applicationId", "appKey": "applicationKey"}';
const tempClientIdKeyForInitialToken = '{"appId":"clientId", "appKey": "clientSecret"}';

const authenticateForToken = '{"path":"/auth/token", "method":"POST"}';
const authenticateForAuthorize = '{"path":"/auth/authorize", "method":"GET"}';
const authenticateForVerify = '{"path":"/auth/verify", "method":"GET"}';
const authenticateForInfo = '{"path":"/auth/info", "method":"GET"}';

const userForCreation = '{"path":"/api/v1/users", "method":"POST"}';
const userForCollection = '{"path":"/api/v1/users", "method":"GET"}';
const userForUpdate = '{"path":"/api/v1/users", "method":"PUT"}';
const userForRetrieval = '{"path":"/api/v1/users", "method":"GET"}';

const balancingForCreation = '{"path":"/api/v1/balancing", "method":"POST"}';
const balancingForRetrievalOfLatest = '{"path":"/api/v1/balancing/version/latest", "method":"GET"}';

const inventoryForRetrievalById = '{"path":"/api/v1/inventory", "method":"GET"}';
const inventoryForRetrievalByAll = '{"path":"/api/v1/inventory", "method":"GET"}';

const settlementForCreation = '{"path":"/api/v1/settlement", "method":"POST"}';

const buildingForCreation = '{"path":"/buildings", "method":"POST"}';
const buildingForRetrieval = '{"path":"/api/v1/settlement/buildings", "method":"GET"}';

const productionForCreation = '{"path":"/api/v1/production", "method":"POST"}';
const productionForRetrieval = '{"path":"/api/v1/production", "method":"GET"}';

const millisecondTickForTimer = 1000;

