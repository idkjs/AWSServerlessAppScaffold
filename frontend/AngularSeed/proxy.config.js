const proxy = [
    {
      context: '/apigateway',
      target: 'https://19dn6hk4mjus-east-1.amazonaws.com/',
      pathRewrite: {'^/apigateway' : ''},
      secure: true,
      logLevel: "debug",
      changeOrigin: true
    }
  ];
  module.exports = proxy;
