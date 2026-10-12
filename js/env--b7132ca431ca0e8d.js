/* Local preview only. No official APIs or credentials are used. */
(function () {
  var base = window.__CLONED_DEPLOYMENT_BASE__ || '';
  var app = {
    api: base + '/local-api', altchaAPI: base + '/local-api/unavailable',
    gwClientId: 'local-demo', cacheTimeInSeconds: 0, siteKey: '', apiKey: ''
  };
  window.env = Object.assign({}, window.env, { app: app });
})();
