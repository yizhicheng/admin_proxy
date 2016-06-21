/** 路由配置 */
module.exports = {
  'getproxy' : {
    url: '/getproxy',
    controller: 'GetProxyCtrl',
    controllerUrl: '/controller/manageProxy'
  },
  'deleteproxy' : {
    url: '/deleteproxy',
    controller: 'DeleteProxyCtrl',
    controllerUrl: '/controller/manageProxy'
  },
  'postproxy' : {
    url: '/postproxy',
    controller: 'ProxyConfigCtrl',
    controllerUrl: '/controller/manageProxy'
  },
  'restartserver' : {
    url: '/restartserver',
    controller: 'RestartServerCtrl',
    controllerUrl: '/controller/manageProxy'
  }
};
