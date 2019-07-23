const request = require('request-promise-native');
const logResponce = require('../framework/helper/log_decorator');

class Request {
  /**
 * Represents request.
 * @constructor
 * @param {string} url - The absolute url of the API.
 */
  constructor(url) {
    this.options = {
      url,
      method: 'GET',
    };

    this.client = request.defaults({
      json: true,
      time: true,
      resolveWithFullResponse: true,
      followAllRedirects: true,
    });
  }

  /**
     *
     * @param method - string(GET/POST)
     */
  method(method) {
    this.options.method = method;
    return this;
  }

  /**
     * adds query parameters to request
     * @param queryParameters - string(GET/POST)
     */
  queryParameters(queryParameters) {
    this.options.qs = queryParameters;
    return this;
  }

  /**
     * adds headers to request
     * @param headers
     */
  headers(headers) {
    this.options.headers = headers;
    return this;
  }

  /**
     * Sending request
     * @return {response}
     */
  async send() {
    const response = this.client(this.options);
    logResponce(response);
    return response;
  }
}

module.exports = Request;
