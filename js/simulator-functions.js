//get global config here
const baseUrlForEndpointsFromJSON = JSON.parse(baseUrlForEndPoints);
let bearerToken;

function readTempIdKeyFromConfig(){
    const tempAppIdKeyForInitialTokenFromJSON = JSON.parse(tempAppIdKeyForInitialToken);
    return tempAppIdKeyForInitialTokenFromJSON;
}

function formBody(details){
    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    
    return formBody = formBody.join("&");
}

/*
 * Gets the temporary token  
 */
async function login(user) {

    //prepare the token information structure for return
    let token = { 
     "accessToken": "",
     "tokenType": "", 
     "expiresIn": 0
    };

    //get the function scope configs
    const authenticateForTokenFromJSON = JSON.parse(authenticateForToken);
    
    //construct the complete endpoint url
    const authenticateForTemporaryTokenEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        authenticateForTokenFromJSON.path;

    //construct the payload
    let payload = {
            'siriusId': user.siriusId,
            'siriusKey': user.siriusKey,
            'appId': user.appId,
            'appKey': user.appKey
    };

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        method: authenticateForTokenFromJSON.method,
        body: formBody(payload)
    };

    //call the backend endpoint for retreiving a temporary token
    let response = await fetch(authenticateForTemporaryTokenEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            token.accessToken = data.accessToken;
            token.tokenType = data.tokenType;
            token.expiresIn = data.expiresIn;
        })

    //return the response body as json
    console.log('return token.accessToken is: ' + token.accessToken);
    //console.log('return token.tokenType is: ' + token.tokenType);
    //console.log('return token.expiresIn is:  ' + token.expiresIn);
    return token;
}

async function register() {
    //prepare the user information structure for return
    let user = { 
        "id": "",
        "siriusId": "", 
        "siriusKey": "",
        "username": "",
       };

    //get the configs
    const userForCreationFromJSON = JSON.parse(userForCreation);


    //construct the complete endpoint url
    const createUserEndpoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
       baseUrlForEndpointsFromJSON.port + 
        userForCreationFromJSON.path;

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: { "Authorization": "Bearer " + bearerToken},
        method: userForCreationFromJSON.method
    }

    //call the backend endpoint for creating new user
    let response = await fetch(createUserEndpoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            user = data;
            //console.log('data: ' + data.id);
        })

    //return the response body as json
    return user;
}

async function initializeBalancing(){

    let balancing;

    //get the configs
    const balancingForCreationFromJSON = JSON.parse(balancingForCreation);


    //construct the complete endpoint url
    const balancingForCreationEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        balancingForCreationFromJSON.path;

    //construct the payload
    let payload = {
        'schemaVersion': initialBalancingSchemaVersion,
        'contents': JSON.stringify(initialBalancingContent)
    };

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: balancingForCreationFromJSON.method,
        body: JSON.stringify(payload)
    }

    //call the backend endpoint for creating new user
    let response = await fetch(balancingForCreationEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('contents: ' + data.contents);
            balancing = data;
        })

    //return the response body as json
    return balancing;
}

async function latestBalancing() {
    let latestBalancing;

    //get the configs
    const balancingForRetrievalOfLatestFromJSON = JSON.parse(balancingForRetrievalOfLatest);


    //construct the complete endpoint url
    const balancingForRetrievalOfLatestEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        balancingForRetrievalOfLatestFromJSON.path;

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: { "Authorization": "Bearer " + bearerToken},
        method: balancingForRetrievalOfLatestEndPoint.method,
    }

    //call the backend endpoint for creating new user
    let response = await fetch(balancingForRetrievalOfLatestEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('retrieved balancing: ' + data);
            latestBalancing = data;
        })

    //return the response body as json
    return latestBalancing;
}

async function latestUserInventory(userId){
    let latestInventory;

    //get the configs
    const inventoryForRetrievalByAllFromJSON = JSON.parse(inventoryForRetrievalByAll);


    //construct the complete endpoint url
    const inventoryForRetrievalByAllFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        inventoryForRetrievalByAllFromJSON.path +
        '?userId='+userId+'&page=1&size=10000'

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Authorization': 'Bearer ' + bearerToken,
          },
        method: inventoryForRetrievalByAllFromJSON.method,
    }

    //call the backend endpoint for creating new user
    let response = await fetch(inventoryForRetrievalByAllFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('retrieved inventory test...');
            //console.log(data.content);
            latestInventory = data;
        })

    //return the response body as json
    return latestInventory;
}

async function createSettlement() {
    let settlementCreated;

    //get the configs
    const settlementForCreationFromJSON = JSON.parse(settlementForCreation);

    //construct the complete endpoint url
    const settlementForCreationFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        settlementForCreationFromJSON.path;

    //construct the payload
    let payload = {
        'userId': newUserCreated.id,
        'buildings': []
    };

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: settlementForCreationFromJSON.method,
        body: JSON.stringify(payload)
    }

    //call the backend endpoint for creating new user
    let response = await fetch(settlementForCreationFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('settlement created: ' + data);
            settlementCreated = data;
        })

    //return the response body as json
    return settlementCreated;
}

async function createBuilding(settlementId, balancingContentId) {
    let buildingCreated;

    //get the configs
    const settlementForCreationFromJSON = JSON.parse(settlementForCreation);
    const buildingForCreationFromJSON = JSON.parse(buildingForCreation);

    //construct the complete endpoint url
    const buildingForCreationFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        settlementForCreationFromJSON.path + '/' + settlementId +
        buildingForCreationFromJSON.path


    //construct the payload
    let payload = {
        'balancingContentId': balancingContentId
    };

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: buildingForCreationFromJSON.method,
        body: JSON.stringify(payload)
    }

    //call the backend endpoint for creating new user
    let response = await fetch(buildingForCreationFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('settlement created: ' + data);
            buildingCreated = data;
        })

    //return the response body as json
    return buildingCreated;
}

async function getBuilding(buildingId) {
    
    let buildingRetrieved;

    //get the configs
    const buildingForRetrievalFromJSON = JSON.parse(buildingForRetrieval);

    //construct the complete endpoint url
    const buildingForRetrievalFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        buildingForRetrievalFromJSON.path + '/' + buildingId

    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: buildingForRetrieval.method,
    }

    //call the backend endpoint for creating new user
    let response = await fetch(buildingForRetrievalFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('settlement created: ' + data);
            buildingRetrieved = data;
        })

    //return the response body as json
    return buildingRetrieved;
}

async function createProduction(buildingId, produceId, productionType) {
    console.log('parameters for createProduction(...)');
    console.log('buildingId:  ' + buildingId);
    console.log('produceId:' + produceId);
    console.log('productionType:' + productionType);
    
    let productionStarted;

    //get the configs
    const productionForCreationFromJSON = JSON.parse(productionForCreation);

    //construct the complete endpoint url
    const productionForCreationFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        productionForCreationFromJSON.path

    console.log('create production URL: ' + productionForCreationFromJSONEndPoint);

    //construct the payload
    let payload = {
        'type': productionType,
        'balancingVersion': 0,
        'buildingId': buildingId,
        'meta': {
            'produceId': produceId
        }
    };


    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: productionForCreationFromJSON.method,
        body: JSON.stringify(payload)
    }

    //call the backend endpoint for creating new user
    let response = await fetch(productionForCreationFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            console.log('production created' );
            console.log(data);
            productionStarted = data;
        })

    //return the response body as json
    return productionStarted;
}

async function retrieveProduction(productionId) {
    
    let retrievedProduction;

    //get the configs
    const productionForRetrievalFromJSON = JSON.parse(productionForRetrieval);

    //construct the complete endpoint url
    const productionForRetrievalFromJSONEndpoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        productionForRetrievalFromJSON.path + '/' + productionId


    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: productionForRetrievalFromJSON.method,
    }

    //call the backend endpoint for creating new user
    let response = await fetch(productionForRetrievalFromJSONEndpoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            //console.log('settlement created: ' + data);
            retrievedProduction = data;
        })

    //return the response body as json
    return retrievedProduction;
}

async function collectProduction(buildingId) {
    console.log('parameters for collectProduction(...)');
    console.log('buildingId:  ' + buildingId);
    
    let collectedProduction;

    //get the configs
    const productionForCreationFromJSON = JSON.parse(productionForCreation);

    //construct the complete endpoint url
    const productionForCreationFromJSONEndPoint = baseUrlForEndpointsFromJSON.protocol +  
        baseUrlForEndpointsFromJSON.host +  
        baseUrlForEndpointsFromJSON.port + 
        productionForCreationFromJSON.path

    console.log('collect production URL: ' + productionForCreationFromJSONEndPoint);

    //construct the payload
    let payload = {
        'type': 'collect',
        'balancingVersion': 0,
        'buildingId': buildingId,
        
    };


    //construct the headers, body, and set the method
    let requestOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
          },
        method: productionForCreationFromJSON.method,
        body: JSON.stringify(payload)
    }

    //call the backend endpoint for creating new user
    let response = await fetch(productionForCreationFromJSONEndPoint, requestOptions)
        .then(response=>response.json())
        .then(data=> { 
            console.log('production collected' );
            console.log(data);
            collectedProduction = data;
        })

    //return the response body as json
    return collectedProduction;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



