$(function() {
    getUserInfo()
    let layer=layui.layer
    // 点击退出
    $('#btnLogout').on('click',function(){
    //  实现退出功能
    layer.confirm('确定退出程序?', {icon: 3, title:'提示'}, function(index){
        //do something
        // 清除token
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
      });
    
    })


})
//获取用户基本信息
function getUserInfo() {
    
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''

        // },
        success:function(res) 
        {
        if(res.status!==0)
        {
          
           return layui.layer.msg('获取用户信息失败')
           
        }
        //调用renderAvatar渲染用户头像
       
        renderAvatar(res.data)
        
        },
        //无论成功失败都调用complete
        // complete:function(res){
        //     if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！")
        //      {
        //          localStorage.removeItem('token')
        //          location.href = '/login.html'
        //      }
        // }
    })
}
function  renderAvatar(user){
        //  获取用户名称
        let name =user.nickname||user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;'+name)
        // 按需求渲染头像
        if(user.user_pic!==null ){
            // 渲染图片头像
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        
        }
        // 渲染文本头像
        else{        
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            
        }
}