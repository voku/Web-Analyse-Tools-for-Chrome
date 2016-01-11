// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {

    var urlEncoded = encodeURI(url);

    var html = ' \
    <h3>' + url + '</h3> \
    <ul> \
      <li><a href="http://tenon.io/testNow.php?url=' + urlEncoded + '" target="_blank">Check Accessibility (Tenon.io)</a></li>\
      <li><a href="http://www.webpagetest.org/" target="_blank">Check Performance (WebPageTest)</a></li> \
      <li><a href="http://tools.pingdom.com/fpt/#!/' + urlEncoded + '" target="_blank">Check Performance (Pingdom)</a></li> \
      <li><a href="http://developers.google.com/speed/pagespeed/insights/?url=' + urlEncoded + '" target="_blank">Check Performance (Google)</a></li> \
      <li><a href="https://securityheaders.io/?q=' + urlEncoded + '" target="_blank">Check Security-Headers</a></li> \
      <li><a href="http://cssstats.com/stats?url=' + urlEncoded + '" target="_blank">Show CSS-Statistics</a></li> \
      <li><a href="http://builtwith.com/?' + urlEncoded + '" target="_blank">Show Website-Software</a></li> \
      <li><a href="http://moz.com/researchtools/ose/links?site=' + urlEncoded + '" target="_blank">Check Inbound Links (OSE)</a></li> \
      <li><a href="http://www.zippy.co.uk/keyworddensity/index.php?url=' + urlEncoded + '&amp;keyword=" target="_blank">Check Keyword-Density</a></li> \
      <li><a href="http://webcache.googleusercontent.com/search?strip=1&amp;q=cache:' + urlEncoded + '" target="_blank">Check Google-Cache</a></li> \
      <li><a href="http://quixapp.com/headers/?r=' + urlEncoded + '" target="_blank">Check HTTP-Header</a></li> \
      <li><a href="http://linter.structured-data.org/?url=' + urlEncoded + '" target="_blank">Structured Data Linter</a></li> \
      <li><a href="http://www.google.com/webmasters/tools/richsnippets?q=' + urlEncoded + '" target="_blank">Check Rich Snippets</a></li> \
      <li><a href="http://developers.facebook.com/tools/debug/og/object?q=' + urlEncoded + '" target="_blank">Facebook Debugger</a></li> \
      <li><a href="https://developers.pinterest.com/tools/url-debugger/?link=' + urlEncoded + '" target="_blank">Pinterest Rich Pins Validator</a></li> \
      <li><a href="http://richpreview.com/?url=' + urlEncoded + '" target="_blank">Rich Preview</a></li> \
      <li><a href="http://validator.w3.org/check?uri=' + urlEncoded + '" target="_blank">HTML-Validator</a></li> \
      <li><a href="http://jigsaw.w3.org/css-validator/validator?uri=' + urlEncoded + '" target="_blank">CSS-Validator</a></li> \
      <li><a href="https://dev.modern.ie/tools/staticscan/?url=' + urlEncoded + '" target="_blank">Modern IE Site Scan</a></li> \
      <li><a href="https://www.google.com/webmasters/tools/mobile-friendly/?url=' + urlEncoded + '" target="_blank">Check Mobile-Friendly</a></li> \
      <li><a href="https://www.ssllabs.com/ssltest/analyze.html?d=' + window.location.host + '" target="_blank">Check SSL</a></li> \
      <li><a href="https://www.mail-tester.com/" target="_blank">Check Mail-Server</a></li> \
    </ul>';

    document.getElementById('js-output').innerHTML = html;
  });
});


