/*
 GphApiClient.js
 GiphyCoreSDK

 Created by Cosmo Cochrane on 4/24/17.
 Copyright © 2017 Giphy. All rights reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
*/

var _ = require('lodash');
var RequestHandler = require('./handlers/RequestHandler');


var serverUrl = "https://api.giphy.com";

/**
 * Class representing the networking client.
 */
class GphApiClient {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Initialize the SDK by passing in the apiKey.
   */
  setCredentials(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * @return a list of gifs that match the inputted search query
   * @param {String} type - specify whether it is a gif or a sticker
   * @param {Object} params an object containing parameters
   * @param {String} params.q search query term or phrase
   * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
   * @param {Integer} params.offset(optional) results offset, defaults to 0.
   * @param {String}  params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
   * @param {String} params.lang (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  search(type, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/${type}/search`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'search', cb);
  }

  /**
   * @return a list of currently trending gifs
   * @param {Object} params an object containing parameters
   * @param {String} type specify whether it is a gif or a sticker
   * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
   * @param {Integer} params.offset(optional) results offset, defaults to 0.
   * @param {String} params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  trending(type, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/${type}/trending`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'trending', cb);
  }

  /**
   * @return a single gif
   * @param {String} type specify whether it is a gif or a sticker
   * @param {Object} params an object containing parameters
   * @param {String} params.s (optional) the term you would lole to have translated
   * @param {String} params.rating (optional) @type string limit results to those rated (y,g, pg, pg-13 or r).   
   * @param {String} params.lang (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  translate(type, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/${type}/translate`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'translate', cb);
  }

  /**
   * @return a random gif
   * @param {String} type specify whether it is a gif or a sticker
   * @param {Object} params an object containing parameters
   * @param {String} params.tag (optional) the GIF tag to limit randomness by
   * @param {String} params.rating (optional) limit results to those rated (y,g, pg, pg-13 or r).
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  random(type, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/${type}/random`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'random', cb);
  }

  /**
   * @return single gif based on the provided ID
   * @param {String} id ID associated with a specific gif
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  gifByID(id, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/gifs/${id}`,
      method: 'get',
      params: {
        api_key: this.apiKey
      }
    }

    return RequestHandler(data, 'gifByID', cb);
  }

  /**
   * @return a list of gifs per ID
   * @param {Object} params an object containing parameters
   * @param {Array} params.ids (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  gifsByIDs(params, cb) {

    //separate teh array into a string of separated values as superagent needs special formatting for array params
    params.ids = params.ids.join(',');

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/gifs`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'gifsByIDs', cb);
  }

  /**
   * @return a list of categories
   * @param {String} type gif or a sticker
   * @param {Object} params an object containing parameters
   * @param {String} params.sort (optional)
   * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  categoriesForGifs(params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/gifs/categories`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'categoriesForGifs', cb);
  }

  /**
   * @return a list of subcategories for a category
   * @param {String} subcategory subcategory name
   * @param {Object} params an object containing parameters
   * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
   * @param {Integer} params.offset (optional) results offset, defaults to 0.
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  subCategoriesForGifs(subcategory, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/gifs/categories/${subcategory}`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'subCategoriesForGifs', cb);
  }

  /**
   * @return a list of gifs
   * @param {Object} params an object containing parameters
   * @param {String} category category name
   * @param {String} subcategory subcategory name
   * @param {Integer} params.limit (optional) number of results to return, maximum 100. Default 25.
   * @param {Integer} params.offset offset (optional) results offset, defaults to 0.
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  gifsByCategories(category, subcategory, params, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/gifs/categories/${category}/${subcategory}`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      }, params)
    }

    return RequestHandler(data, 'gifsByCategories', cb);
  }

  /**
   * @return a list of term suggestions
   * @param {String} term a term to receive back similar terms
   * @param {Function} callback (optional) callback will default to a promise if nothing is passed in
   */
  termSuggestions(term, cb) {

    const data = {
      //grabs the correct endpoint from an object
      url: `${serverUrl}/v1/queries/suggest/${term}`,
      method: 'get',
      params: _.extend({
        api_key: this.apiKey
      })
    }

    return RequestHandler(data, 'termSuggestions', cb);
  }
}

module.exports = function(apiKey) {
  return new GphApiClient(apiKey);
}