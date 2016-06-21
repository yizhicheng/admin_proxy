var proxy = {
  list : [],
  currentProxy : {},
  // 保存
  save : function() {
    // 重组数据
    $.extend(this.currentProxy,{
      domain : $('#domain').val(),
      target_domain : $('#target_domain').val()
    })
    $.ajax({
      url: '/api/postproxy',
      data: this.currentProxy,
      dataType: 'json',
      type: 'POST',
      success: function( data ) {
        if( !data.error ) {
          location.reload();
        } else {
          alert(data.message);
        }
      }
    })
  },
  // 打开配置反向代理模态框
  add : function(){
    $('#proxyConfigTitle').text('添加配置');
    $('#domain').val('');
    $('#target_domain').val('');
    $('#proxyConfigForm').modal('show');
  },
  // 编辑配置反向代理
  edit : function( id ) {
    this.currentProxy = this.getCurrentProxy( id );
    $('#proxyConfigTitle').text('编辑配置');
    $('#domain').val( this.currentProxy.domain );
    $('#target_domain').val( this.currentProxy.target_domain );
    $('#proxyConfigForm').modal('show');
  },
  // 删除
  delete : function( id ) {
    $.ajax({
      url: '/api/deleteproxy',
      data: {id: id},
      dataType: 'json',
      type: 'POST',
      success: function( data ) {
        if( !data.error ) {
          location.reload();
        } else {
          alert( data.message );
        }
      }
    })
  },
  getCurrentProxy : function ( id ) {
    var current = undefined;
    for (var i = 0; i < proxy.list.length; i++) {
      if( id === proxy.list[i].id ){
        current = proxy.list[i];
      }
    }
    return current;
  },
  // 获得列表
  getProxyList : function () {
    $.ajax({
      url: '/api/getproxy',
      dataType: 'json',
      type: 'GET',
      success: function( data ) {
        proxy.list = data;
        $("#proxy_list").tmpl(data).appendTo('.proxy-list-wrap');
      }
    });
  },
  // 重启服务器
  restart : function () {
    $.ajax({
      url: '/api/restartserver',
      dataType: 'json',
      type: 'GET',
      success: function( data ) {
        alert(data.message);
      }
    });
  }
};
