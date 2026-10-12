(function () {
  'use strict';
  var routes = {
    'YBbOaTRUT5SuvKEkctoE+g==': '7014140366.json',
    'Hif6vz0mUrzdt18YW0fOjQ==': '7028250558.json',
    'Hif6vz0mUrzdt14YW0fOjQ==': '7028250558-4.json',
    'WGMPRkDd+HuXsVhATk8A==': '7001636948.json',
    'YBbOaTRUT5SukKgkctoE+h==': '7053845777.json',
    'soIWxT+atI4Ut3QXoLJFbw==': '7071484846.json',
    '0HOeafXR5sul3MCLgVFdTw==': '7006741974.json'
  };
  function rawQueryParam(name) {
    var parts = String(location.search || '').replace(/^\?/, '').split('&');
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf('=');
      var key = eq < 0 ? parts[i] : parts[i].slice(0, eq);
      try { key = decodeURIComponent(key); } catch (_) { continue; }
      if (key !== name) continue;
      var value = eq < 0 ? '' : parts[i].slice(eq + 1);
      try { value = decodeURIComponent(value); } catch (_) { return ''; }
      return value.replace(/ /g, '+');
    }
    return '';
  }
  function selectedFile() {
    var token = rawQueryParam('nCrNumber');
    return Object.prototype.hasOwnProperty.call(routes, token) ? routes[token] : null;
  }
  function isRecordPath() {
    var base = window.__CLONED_DEPLOYMENT_BASE__ || '';
    var path = location.pathname.slice(base.length).toLowerCase();
    return ['/viewcr', '/viewcr/', '/viewcr/index.html', '/index.html', '/'].indexOf(path) !== -1;
  }
  window.__LOCAL_PREVIEW_READ_TOKEN__ = function () { return rawQueryParam('nCrNumber'); };
  window.__LOCAL_RECORD_READY__ = isRecordPath() && !!selectedFile();
  window.__LOCAL_PREVIEW_ERROR_HTML__ = '<strong class="local-error-code">404</strong>' +
    '<h1>Page Not Found</h1><p>The requested local data file or page is not available.</p>' +
    '<p class="local-error-note">LOCAL DEMO — NOT AN OFFICIAL VERIFICATION</p>';
  window.__LOCAL_PREVIEW_SHOW_404__ = function () {
    var root = document.getElementById('root');
    if (!root) return;
    var section = document.createElement('section');
    section.id = 'local-page-error';
    section.className = 'local-error';
    section.lang = 'en';
    section.dir = 'ltr';
    section.innerHTML = window.__LOCAL_PREVIEW_ERROR_HTML__;
    root.replaceChildren(section);
  };
  function isDetailsRequest(value) {
    try {
      return /\/api\/app\/Qr\/GetCrDetails\/?$/i.test(new URL(String(value), location.href).pathname);
    } catch (_) { return false; }
  }
  function notFoundResponse() {
    return new Response(JSON.stringify({ data: null, error: { message: 'Local record not found' } }), {
      status: 404, headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
  var nativeFetch = window.fetch && window.fetch.bind(window);
  if (nativeFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : input && input.url;
      if (!isDetailsRequest(url)) return nativeFetch(input, init);
      var file = selectedFile();
      if (!file) return Promise.resolve(notFoundResponse());
      if (location.protocol === 'file:') {
        var data = window.__LOCAL_OFFLINE_DATA__ && window.__LOCAL_OFFLINE_DATA__[file];
        if (!data) return Promise.resolve(notFoundResponse());
        return Promise.resolve(new Response(JSON.stringify(data), {
          status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }));
      }
      return nativeFetch((window.__CLONED_DEPLOYMENT_BASE__ || '') + '/data/' + file, { cache: 'no-store' });
    };
  }
  if (window.XMLHttpRequest) {
    var nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      if (isDetailsRequest(url)) {
        arguments[1] = (window.__CLONED_DEPLOYMENT_BASE__ || '') + '/data/' + (selectedFile() || '__not_found__.json');
      }
      return nativeOpen.apply(this, arguments);
    };
  }
})();
