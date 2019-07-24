const apiEndPointHelper = require ('../framework/helper/api_urls');
const Swapi = require ('../framework/api_endpoints');
let response;

describe ('HealthCheck Suite', async () => {
  it ('@01 Should get valid endpoints information', async function () {
    response = await new Swapi ().getAllEndpoints ();
    assert.deepEqual (
      apiEndPointHelper.expectedEndpoints,
      response,
      `Responce body do not equal expected endpoints list`
    );
  });

  it ('@02 Should return 404 on invalid endpoint request', async function () {
    try {
      response = await new Swapi ().getInvalidEndpoint ();
    } catch (err) {
      console.log ('Error in sending GET Request: ', err.statusCode);
    }
  });
});
