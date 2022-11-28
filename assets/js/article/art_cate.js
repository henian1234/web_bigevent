$(function() {
    let layer =layui.layer
    let form =layui.form
    initArtCateList()
    // 获取文章列表
   function initArtCateList(res){
         $.ajax({
             url:'/my/article/cates',
             method: "GET",
             success: function(res){
              
               var str =template('tpl-table',res)
               $('tbody').html(str)
             }
         })
      
   }
   let index =null
   $('#btnAddCate').on('click',function() {
    //    点击后弹出层
    index =  layer.open(
            {
                type:1,
                area: ['500px', '250px'],
                title: '添加文件分类',
                content: $('#dialog-add').html()}
        )
   })
    // 通过代理的形式，为form-add表单绑定submit事件
   $('body').on("submit",'#form-add' ,function(e) {
        e.preventDefault();
        $.ajax({
            url:'/my/article/addcates',
            method: "POST",
            data:$(this).serialize(),
            success: function(res) {
                if (res.status!==0){
                    layer.msg("新增失败")
                }
                initArtCateList()
                layer.msg('新增成功')
                layer.close(index)
            }
        })
   })
//    通过代理的形式为btn-edit绑定点击事件
   let indexedit =null
   $('tbody').on('click','.btn-edit',function(e) {
    e.preventDefault();
    indexedit =  layer.open(
        {
            type:1,
            area: ['500px', '250px'],
            title: '添加文件分类',
            content: $('#dialog-edit').html()}
    )
    let id =$(this).attr('data-id')
    // 发起get拿数据
    $.ajax({
        url:'/my/article/cates/'+id,
        method: "GET",
        success: function(res) {
            if (res.status !==0) {
                layer.msg("请求失败")
            }
           
            form.val('form-edit',res.data)

        }

    })
    // 通过代理的形式为#form-edit绑定提交事件
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: "POST",
            data:$(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg("更新失败")
                }
                initArtCateList()
                layer.close(indexedit)
            }
        })
    })

   })
    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click','.btn-delete',function(e) {
        e.preventDefault();
        let Id =$(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:'/my/article/deletecate/'+Id,
                method: "GET",
                success:function(res) {
                    if (res.status !==0) {
                        return layer.msg("删除失败")
                    }
                    layer.msg("删除成功")
                    layer.close(indexedit)
                    initArtCateList()

                }
            })
            
            layer.close(index);
          });
    })

})