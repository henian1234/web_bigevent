$(function () {
    // 点击注册账号
    $('#link_reg').on('click',function() {
        $('.login-box').css('display','none')
        $('.reg-box').css('display','block')
    })
    // 点击去登录
    $('#link-login').on('click',function() {
        $('.reg-box').css('display','none')
        $('.login-box').css('display','block')
    })
    // 获取layui中的from对象
    let form =layui.form
    let layer =layui.layer
    // 自定义pwd规则
    form.verify({
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 自定义repwd规则判断密码是否一致
    repwd:function(value) {
       const password =$('.reg-box [name=password]').val()
       if(password!==value){
           return '两次密码不一致'
       }

    }})
    // 监听注册表单提交请求
    $('#form_reg').on("submit", function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起post请求
    
        $.post('/api/reguser',{
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        },function(res) {
            if(res.status!==0){
                layer.msg(res.message)
            }
            layer.msg('注册成功请登录')
           // 模拟人的点击行为
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
              // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
              
                 // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token',res.token)
                 // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})
