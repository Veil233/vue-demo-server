var mongoose = require('mongoose');

var Scheme = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://47.102.105.87:27017/user', {
  useNewUrlParser: true
});

//设计文档结构（表结构）
var userSchema = new Scheme({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    default: 0
  },
  nickname: {
    type: String,
    required: true
  }
})

//将文档结构发布为模型
module.exports = mongoose.model('User', userSchema)

// 新增数据
// new User({
//   username: 'admin1',
//   password: '123456',
//   nickname: 'admin'
// }).save(function (err, ret) {
//   if (err) {
//     console.log('保存失败')
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })

// User.find(function(err,ret){
//   if(err){
//     console.log('查询失败')
//   }else{
//     console.log(ret)
//   }
// })