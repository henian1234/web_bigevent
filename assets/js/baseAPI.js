//每次调用$.get{} $.post{} $.ajax{}时候
// 会先调用ajaxPrefilter这个函数
// 可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(option){
   
    // 拼接url
    option.url='http://api-breakingnews-web.itheima.net'+option.url;
    //设置headers请求头


    if(option.url.indexOf('/my/'!== -1)){
    option.headers={
        Authorization:localStorage.getItem('token')||''
    }}

    //
    option.complete = function(res){
        if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！")
         {
             localStorage.removeItem('token')
             location.href = '/login.html'
         }
    }
})