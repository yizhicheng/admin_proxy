/** 路由配置 */
module.exports = {
  'getproxy' : {
    url: '/getproxy',
    controller: 'GetProxyCtrl'
  },
  'deleteproxy' : {
    url: '/deleteproxy',
    controller: 'DeleteProxyCtrl'
  },
  'postproxy' : {
    url: '/postproxy',
    controller: 'ProxyConfigCtrl'
  },
  'restartserver' : {
    url: '/restartserver',
    controller: 'RestartServerCtrl'
  }
};
