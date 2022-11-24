//每次调用$.get{} $.post{} $.ajax{}时候
// 会先调用ajaxPrefilter这个函数
// 可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(option){
   
    // 拼接url
    option.url='http://api-breakingnews-web.itheima.net'+option.url;
    console.log(option.url);
})