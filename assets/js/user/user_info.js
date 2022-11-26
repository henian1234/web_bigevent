$(function(){
    let form =layui.form
    let layer=layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length>6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: "GET",
            success: function(res){
                if (res.status !==0) {
                    return layer.msg('获取失败')
                }
               
                // 调用form.val()快速赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 重置表单数据
    $('#btnReset').on('click',function(e) 
    {
        e.preventDefault();
        initUserInfo()
    })
    // 监听提交事件
    $('.layui-form').on('submit', function(e)
    {
        e.preventDefault();
        $.ajax(
            {
                url: "/my/userinfo",
                method: "POST",
                data: $(this).serialize(),
                success:function(res) 
                {
                    if (res.status!==0)
                    {   
                      
                        return layer.msg('请求失败')
                    }
                    
                    layer.msg('请求成功')
                    window.parent.getUserInfo()
                }
            })
    })
})


