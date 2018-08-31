/**
 * @constants.js
 * Provides different constant functions.
 *
 */


 /**
   * getBaseUrl
   * captures the base url.
   * 
   * @returns {url}
  */
  function getBaseUrl() {
  	var re = new RegExp(/^.*\//);
  	return re.exec(window.location.href);
  }