(function () {
  var routes = {
    "YBbOaTRUT5SuvKEkctoE+g==": "7014140366.json",
    "Hif6vz0mUrzdt18YW0fOjQ==": "7028250558.json",
    "Hif6vz0mUrzdt14YW0fOjQ==": "7028250558-4.json",
    "WGMPRkDd+HuXsVhATk8A==": "7001636948.json",
    "YBbOaTRUT5SukKgkctoE+h==": "7053845777.json",
    "soIWxT+atI4Ut3QXoLJFbw==": "7017484846.json",
    "0HOeafXR5sul3MCLgVFdTw==": "7006741974.json",
    "isDYjrFRfX3EIB1DEmJnQw==": "7038351248.json"
  };

  function rawQueryParam(name) {
    var query = String(location.search || '').replace(/^\?/, '');
    var parts = query ? query.split('&') : [];
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf('=');
      var key = eq < 0 ? parts[i] : parts[i].slice(0, eq);
      if (decodeURIComponent(key) !== name) continue;
      var value = eq < 0 ? '' : parts[i].slice(eq + 1);
      try { return decodeURIComponent(value); } catch (_) { return value; }
    }
    return '';
  }

  function selectedDataUrl() {
    var token = rawQueryParam('nCrNumber');
    var file = routes[token];
    if (!file) return null;
    var base = (window.__CLONED_DEPLOYMENT_BASE__ || '').replace(/\/$/, '');
    return (base || '') + '/data/' + file;
  }

  function isDetailsRequest(value) {
    try {
      var url = new URL(String(value), location.href);
      return /\/sbc\/externalgw\/qrapi-nl\/api\/app\/Qr\/GetCrDetails$/i.test(url.pathname);
    } catch (_) {
      return /GetCrDetails/i.test(String(value || ''));
    }
  }

  var nativeFetch = window.fetch ? window.fetch.bind(window) : null;
  if (nativeFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : input && input.url;
      if (isDetailsRequest(url)) {
        var local = selectedDataUrl();
        if (local) return nativeFetch(local, { cache: 'no-store' });
      }
      return nativeFetch(input, init);
    };
  }

  if (window.XMLHttpRequest) {
    var nativeOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
      if (isDetailsRequest(url)) {
        var local = selectedDataUrl();
        if (local) arguments[1] = local;
      }
      return nativeOpen.apply(this, arguments);
    };
  }
})();
