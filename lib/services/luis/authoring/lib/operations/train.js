/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

const msRest = require('ms-rest');
const WebResource = msRest.WebResource;

/**
 * Sends a training request for a version of a specified LUIS app. This POST
 * request initiates a request asynchronously. To determine whether the
 * training request is successful, submit a GET request to get training status.
 * Note: The application version is not fully trained unless all the models
 * (intents and entities) are trained successfully or are up to date. To verify
 * training success, get the training status at least once after training is
 * complete.
 *
 * @param {uuid} appId The application ID.
 *
 * @param {string} versionId The version ID.
 *
 * @param {object} [options] Optional Parameters.
 *
 * @param {object} [options.customHeaders] Headers that will be added to the
 * request
 *
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *
 *                      {Error}  err        - The Error object if an error occurred, null otherwise.
 *
 *                      {object} [result]   - The deserialized result object if an error did not occur.
 *                      See {@link EnqueueTrainingResponse} for more
 *                      information.
 *
 *                      {object} [request]  - The HTTP Request object if an error did not occur.
 *
 *                      {stream} [response] - The HTTP Response stream if an error did not occur.
 */
function _trainVersion(appId, versionId, options, callback) {
   /* jshint validthis: true */
  let client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  // Validate
  try {
    if (this.client.endpoint === null || this.client.endpoint === undefined || typeof this.client.endpoint.valueOf() !== 'string') {
      throw new Error('this.client.endpoint cannot be null or undefined and it must be of type string.');
    }
    if (appId === null || appId === undefined || typeof appId.valueOf() !== 'string' || !msRest.isValidUuid(appId)) {
      throw new Error('appId cannot be null or undefined and it must be of type string and must be a valid uuid.');
    }
    if (versionId === null || versionId === undefined || typeof versionId.valueOf() !== 'string') {
      throw new Error('versionId cannot be null or undefined and it must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  let baseUrl = this.client.baseUri;
  let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'apps/{appId}/versions/{versionId}/train';
  requestUrl = requestUrl.replace('{Endpoint}', this.client.endpoint);
  requestUrl = requestUrl.replace('{appId}', encodeURIComponent(appId.toString()));
  requestUrl = requestUrl.replace('{versionId}', encodeURIComponent(versionId));

  // Create HTTP transport objects
  let httpRequest = new WebResource();
  httpRequest.method = 'POST';
  httpRequest.url = requestUrl;
  httpRequest.headers = {};
  // Set Headers
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  if(options) {
    for(let headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.body = null;
  // Send Request
  return client.pipeline(httpRequest, (err, response, responseBody) => {
    if (err) {
      return callback(err);
    }
    let statusCode = response.statusCode;
    if (statusCode !== 202) {
      let error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = msRest.stripRequest(httpRequest);
      error.response = msRest.stripResponse(response);
      if (responseBody === '') responseBody = null;
      let parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        if (parsedErrorResponse) {
          let internalError = null;
          if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
          error.code = internalError ? internalError.code : parsedErrorResponse.code;
          error.message = internalError ? internalError.message : parsedErrorResponse.message;
        }
        if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
          let resultMapper = new client.models['ErrorResponse']().mapper();
          error.body = client.deserialize(resultMapper, parsedErrorResponse, 'error.body');
        }
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                         `- "${responseBody}" for the default response.`;
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    let result = null;
    if (responseBody === '') responseBody = null;
    // Deserialize Response
    if (statusCode === 202) {
      let parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          let resultMapper = new client.models['EnqueueTrainingResponse']().mapper();
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
        deserializationError.request = msRest.stripRequest(httpRequest);
        deserializationError.response = msRest.stripResponse(response);
        return callback(deserializationError);
      }
    }

    return callback(null, result, httpRequest, response);
  });
}

/**
 * Gets the training status of all models (intents and entities) for the
 * specified LUIS app. You must call the train API to train the LUIS app before
 * you call this API to get training status. "appID" specifies the LUIS app ID.
 * "versionId" specifies the version number of the LUIS app. For example,
 * "0.1".
 *
 * @param {uuid} appId The application ID.
 *
 * @param {string} versionId The version ID.
 *
 * @param {object} [options] Optional Parameters.
 *
 * @param {object} [options.customHeaders] Headers that will be added to the
 * request
 *
 * @param {function} callback - The callback.
 *
 * @returns {function} callback(err, result, request, response)
 *
 *                      {Error}  err        - The Error object if an error occurred, null otherwise.
 *
 *                      {array} [result]   - The deserialized result object if an error did not occur.
 *
 *                      {object} [request]  - The HTTP Request object if an error did not occur.
 *
 *                      {stream} [response] - The HTTP Response stream if an error did not occur.
 */
function _getStatus(appId, versionId, options, callback) {
   /* jshint validthis: true */
  let client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  // Validate
  try {
    if (this.client.endpoint === null || this.client.endpoint === undefined || typeof this.client.endpoint.valueOf() !== 'string') {
      throw new Error('this.client.endpoint cannot be null or undefined and it must be of type string.');
    }
    if (appId === null || appId === undefined || typeof appId.valueOf() !== 'string' || !msRest.isValidUuid(appId)) {
      throw new Error('appId cannot be null or undefined and it must be of type string and must be a valid uuid.');
    }
    if (versionId === null || versionId === undefined || typeof versionId.valueOf() !== 'string') {
      throw new Error('versionId cannot be null or undefined and it must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  let baseUrl = this.client.baseUri;
  let requestUrl = baseUrl + (baseUrl.endsWith('/') ? '' : '/') + 'apps/{appId}/versions/{versionId}/train';
  requestUrl = requestUrl.replace('{Endpoint}', this.client.endpoint);
  requestUrl = requestUrl.replace('{appId}', encodeURIComponent(appId.toString()));
  requestUrl = requestUrl.replace('{versionId}', encodeURIComponent(versionId));

  // Create HTTP transport objects
  let httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.url = requestUrl;
  httpRequest.headers = {};
  // Set Headers
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  if(options) {
    for(let headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.body = null;
  // Send Request
  return client.pipeline(httpRequest, (err, response, responseBody) => {
    if (err) {
      return callback(err);
    }
    let statusCode = response.statusCode;
    if (statusCode !== 200) {
      let error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = msRest.stripRequest(httpRequest);
      error.response = msRest.stripResponse(response);
      if (responseBody === '') responseBody = null;
      let parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        if (parsedErrorResponse) {
          let internalError = null;
          if (parsedErrorResponse.error) internalError = parsedErrorResponse.error;
          error.code = internalError ? internalError.code : parsedErrorResponse.code;
          error.message = internalError ? internalError.message : parsedErrorResponse.message;
        }
        if (parsedErrorResponse !== null && parsedErrorResponse !== undefined) {
          let resultMapper = new client.models['ErrorResponse']().mapper();
          error.body = client.deserialize(resultMapper, parsedErrorResponse, 'error.body');
        }
      } catch (defaultError) {
        error.message = `Error "${defaultError.message}" occurred in deserializing the responseBody ` +
                         `- "${responseBody}" for the default response.`;
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    let result = null;
    if (responseBody === '') responseBody = null;
    // Deserialize Response
    if (statusCode === 200) {
      let parsedResponse = null;
      try {
        parsedResponse = JSON.parse(responseBody);
        result = JSON.parse(responseBody);
        if (parsedResponse !== null && parsedResponse !== undefined) {
          let resultMapper = {
            required: false,
            serializedName: 'parsedResponse',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ModelTrainingInfoElementType',
                  type: {
                    name: 'Composite',
                    className: 'ModelTrainingInfo'
                  }
              }
            }
          };
          result = client.deserialize(resultMapper, parsedResponse, 'result');
        }
      } catch (error) {
        let deserializationError = new Error(`Error ${error} occurred in deserializing the responseBody - ${responseBody}`);
        deserializationError.request = msRest.stripRequest(httpRequest);
        deserializationError.response = msRest.stripResponse(response);
        return callback(deserializationError);
      }
    }

    return callback(null, result, httpRequest, response);
  });
}

/** Class representing a Train. */
class Train {
  /**
   * Create a Train.
   * @param {LUISAuthoringClient} client Reference to the service client.
   */
  constructor(client) {
    this.client = client;
    this._trainVersion = _trainVersion;
    this._getStatus = _getStatus;
  }

  /**
   * Sends a training request for a version of a specified LUIS app. This POST
   * request initiates a request asynchronously. To determine whether the
   * training request is successful, submit a GET request to get training status.
   * Note: The application version is not fully trained unless all the models
   * (intents and entities) are trained successfully or are up to date. To verify
   * training success, get the training status at least once after training is
   * complete.
   *
   * @param {uuid} appId The application ID.
   *
   * @param {string} versionId The version ID.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse<EnqueueTrainingResponse>} - The deserialized result object.
   *
   * @reject {Error} - The error object.
   */
  trainVersionWithHttpOperationResponse(appId, versionId, options) {
    let client = this.client;
    let self = this;
    return new Promise((resolve, reject) => {
      self._trainVersion(appId, versionId, options, (err, result, request, response) => {
        let httpOperationResponse = new msRest.HttpOperationResponse(request, response);
        httpOperationResponse.body = result;
        if (err) { reject(err); }
        else { resolve(httpOperationResponse); }
        return;
      });
    });
  }

  /**
   * Sends a training request for a version of a specified LUIS app. This POST
   * request initiates a request asynchronously. To determine whether the
   * training request is successful, submit a GET request to get training status.
   * Note: The application version is not fully trained unless all the models
   * (intents and entities) are trained successfully or are up to date. To verify
   * training success, get the training status at least once after training is
   * complete.
   *
   * @param {uuid} appId The application ID.
   *
   * @param {string} versionId The version ID.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {EnqueueTrainingResponse} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link EnqueueTrainingResponse} for more
   *                      information.
   *
   *                      {object} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {stream} [response] - The HTTP Response stream if an error did not occur.
   */
  trainVersion(appId, versionId, options, optionalCallback) {
    let client = this.client;
    let self = this;
    if (!optionalCallback && typeof options === 'function') {
      optionalCallback = options;
      options = null;
    }
    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self._trainVersion(appId, versionId, options, (err, result, request, response) => {
          if (err) { reject(err); }
          else { resolve(result); }
          return;
        });
      });
    } else {
      return self._trainVersion(appId, versionId, options, optionalCallback);
    }
  }

  /**
   * Gets the training status of all models (intents and entities) for the
   * specified LUIS app. You must call the train API to train the LUIS app before
   * you call this API to get training status. "appID" specifies the LUIS app ID.
   * "versionId" specifies the version number of the LUIS app. For example,
   * "0.1".
   *
   * @param {uuid} appId The application ID.
   *
   * @param {string} versionId The version ID.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse<Array>} - The deserialized result object.
   *
   * @reject {Error} - The error object.
   */
  getStatusWithHttpOperationResponse(appId, versionId, options) {
    let client = this.client;
    let self = this;
    return new Promise((resolve, reject) => {
      self._getStatus(appId, versionId, options, (err, result, request, response) => {
        let httpOperationResponse = new msRest.HttpOperationResponse(request, response);
        httpOperationResponse.body = result;
        if (err) { reject(err); }
        else { resolve(httpOperationResponse); }
        return;
      });
    });
  }

  /**
   * Gets the training status of all models (intents and entities) for the
   * specified LUIS app. You must call the train API to train the LUIS app before
   * you call this API to get training status. "appID" specifies the LUIS app ID.
   * "versionId" specifies the version number of the LUIS app. For example,
   * "0.1".
   *
   * @param {uuid} appId The application ID.
   *
   * @param {string} versionId The version ID.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {object} [options.customHeaders] Headers that will be added to the
   * request
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Array} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {array} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {object} [request]  - The HTTP Request object if an error did not occur.
   *
   *                      {stream} [response] - The HTTP Response stream if an error did not occur.
   */
  getStatus(appId, versionId, options, optionalCallback) {
    let client = this.client;
    let self = this;
    if (!optionalCallback && typeof options === 'function') {
      optionalCallback = options;
      options = null;
    }
    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self._getStatus(appId, versionId, options, (err, result, request, response) => {
          if (err) { reject(err); }
          else { resolve(result); }
          return;
        });
      });
    } else {
      return self._getStatus(appId, versionId, options, optionalCallback);
    }
  }

}

module.exports = Train;
