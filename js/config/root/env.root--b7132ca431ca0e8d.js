const root = {
  root: {
    featuresFlag: {
      push_notifications: false,
      altcha: true,
      showPrints: true,
      showArPrint: true,
      showEnPrint: true,
      showContractPrint: true,
      showCancelPrint: true,
      showEfaaSection: false,
    },
    siteKeyCaptcha: '6LfotGYqAAAAAPSp09_nsaQQ1lmJ0PdHcVH4qRtK',
    isDevelopment: false,
    auth: {
      authority: 'https://www.saudibusiness.gov.sa',
    },
    apis: {
      ip: {
        gwId: '8b907aa5799863128483d1d4121b0930',
      },
      sc: {
        api: 'https://api.saudibusiness.gov.sa/sbc/externalgw/servicecatalog',
      },
      notifications: {
        api: 'https://api.saudibusiness.gov.sa/sbc/externalgw/notification',
      },
    },
    links: {
      ip: 'https://e2.business.sa/',
      qr: 'https://qr.saudibusiness.gov.sa/',
      qrCreate: 'https://qr-create.saudibusiness.gov.sa',
      authorizations: 'https://delegation.saudibusiness.gov.sa',
      privacyPolicy: 'https://business.sa/AboutPortal/PrivacyPolicy.html',
      termsAndConditions: 'https://business.sa/AboutPortal/AcceptableUsePolicy.html',
      paymentGateway: 'https://sbcpaymentgateway.saudibusiness.gov.sa/invoice/pay/',
      estUpdateCrOwner: 'estupdownerinfo.saudibusiness.gov.sa',
      reserveTradename: 'https://rsvtnames.saudibusiness.gov.sa',
      survey: 'https://requirements.saudibusiness.gov.sa/survey',
      topNav: {
        Home: { url: 'https://e.business.sa', public: true },
        'My Requests': { url: 'https://e.business.sa/requests', public: false },
        'Business Portal': { url: 'https://business.sa', public: true },
        'Contact us': { url: 'https://business.sa/contactus/', public: true },
      },
      business_sa: {
        // contactUs: 'https://business.sa/contactus/',
        privacy: 'https://business.sa/privacy/',
        terms: 'https://business.sa/terms/',
        sitemap: 'https://business.sa/sitemap/',
        faqs: 'https://business.sa/faqs/',
      },
    },
  },
};

window.env = { ...window.env, root };
export default root;
