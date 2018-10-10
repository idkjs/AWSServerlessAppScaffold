const proxy = [
    {
      context: '/apigateway',
      target: 'https://70wdmbbdv9.execute-api.us-east-1.amazonaws.com',
      pathRewrite: {'^/apigateway' : ''},
      secure: true,
      logLevel: "debug",
      changeOrigin: true
    }
  ];
  module.exports = proxy;
