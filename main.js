var express = require('express')
var bodyParser = require('body-parser')
var user = require('./mongodb')

var app = express();

//配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.all('*', function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*"); //项目上线后改成页面的地址

  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

  next();

});

app.post('/login', function (req, res) {
  var inputUser = req.body.user;
  var inputPwd = req.body.pwd;
  user.find({
    username: inputUser,
    password: inputPwd
  }, function (err, user) {
    if (err) {
      return res.status(500).send('Server error')
    } else {
      if (user == false) {
        console.log('查询失败')
        return res.send({
          status: '-1'
        })
      } else {
        res.send({
          status: '1',
          userInfo: user
        })
      }
    }
  })
})

app.post('/register', function (req, res) {
  new user(req.body).save(function (err, ret) {
    if (err) {
      return res.status(500).send('Server error')
    }
    console.log(ret, typeof ret)
    res.send({
      status: '1',
      userInfo: ret
    })
  })
})

app.post('/add', function (req, res) {
  user.findByIdAndUpdate(req.body.id, {
    balance: String(req.body.add)
  }, {
    new: true
  }, function (err, ret) {
    if (err) {
      console.log('更新失败')
    } else {
      console.log(ret)
      res.send({
        status: '1',
        userInfo: ret
      })
    }
  })
})
app.listen(5001, function () {
  console.log('server running at port 5001.');
})