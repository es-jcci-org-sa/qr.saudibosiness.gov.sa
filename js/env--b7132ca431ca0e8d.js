const app = {
  api: 'https://api.saudibusiness.gov.sa/sbc/externalgw/qrapi-nl',
  altchaAPI: 'https://api.saudibusiness.gov.sa/sbc/externalgw/captchaapi',
  gwClientId: '290644af026afba41b89aefcee65843d',
  cacheTimeInSeconds: 60 * 60,
  siteKey: '6LcO1mobAAAAAJGW3IACIkU8TAtl8SjDYVzeW1Hw',
  apiKey:
    '0ac3e4c706ea729379f2a5faf987548f6b8fea0da161e4d0da87489b21c6f4b69ec0f61d8ff4ed5a2b6765546293641c1c3cca77ea95890de766f29c71b1421a',
};

window.env = { ...window.env, app };
export default app;
