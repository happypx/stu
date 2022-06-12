const cCode = document.querySelector('.code')
let Timer
let flag = true
cCode.addEventListener('click', function () {
  if (flag) {
    flag = false
    let i = 5
    cCode.innerHTML = `0${i}秒后重新获取`
    Timer = setInterval(function () {
      i--
      if (i == 0) {
        cCode.innerHTML = `重新获取`
        clearInterval(Timer)
        flag = true
        return;
      }
      cCode.innerHTML = `0${i}秒后重新获取`
    }, 1000)
  }
})
const form = document.querySelector('form')//获取表单
const uname = document.querySelector('form [name=username]')//用户名
const phone = document.querySelector('form [name=phone]')//手机号
const code = document.querySelector('form [name=code]')//验证码
const password = document.querySelector('form [name=password]')//密码
const confirmPwd = document.querySelector('form [name=confirm]')//确认密码
form.addEventListener('change', function (e) {
  if (e.target.tagName === "INPUT") {
    Checkongjian(e.target)
  }
})
function Checkongjian(control) {
  // 定义规则，只可以数字、字母、横线、下划线
  if (control == uname) {
    const reg = /^[a-zA-Z0-9-_]{6,16}$/
    if (reg.test(uname.value)) {
      uname.nextElementSibling.innerHTML = ''
      return true
    }
    uname.nextElementSibling.innerHTML = '用户名输入格式错误'
    return false
  }
  else if (control == phone) {
    const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    if (reg.test(phone.value)) {
      phone.nextElementSibling.innerHTML = ''
      return true
    }
    phone.nextElementSibling.innerHTML = '手机号输入格式错误'
    return false
  }
  else if (control == code) {
    const reg = /^\d{6}$/
    if (reg.test(code.value)) {
      code.nextElementSibling.innerHTML = ''
      return true
    }
    code.nextElementSibling.innerHTML = '验证码输入格式错误'
    return false
  }
  else if (control == password) {
    const reg = /^[a-zA-Z0-9-_]{6,16}$/
    if (reg.test(password.value)) {
      password.nextElementSibling.innerHTML = ''
      return true
    }
    password.nextElementSibling.innerHTML = '密码输入格式错误'
    return false
  }
  else {
    if (confirmPwd.value == password.value) {
      confirmPwd.nextElementSibling.innerHTML = ''
      return true
    }
    confirmPwd.nextElementSibling.innerHTML = '两次密码输入不一致'
    return false
  }
}
// 获取同意协议的小按钮
const icon_quren = document.querySelector('.icon-queren')
icon_quren.addEventListener('click', function () {
  this.classList.toggle('icon-queren2')
})
const data = sessionStorage.userInfo
const arr = data ? JSON.parse(data) : []
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!icon_quren.classList.contains('icon-queren2')) {
    return alert('请先同意协议')
  }
  let flag = true
  if (flag) {
    if (!Checkongjian(uname)) flag = false
    if (!Checkongjian(password)) flag = false
    if (!Checkongjian(phone)) flag = false
    if (!Checkongjian(code)) flag = false
    if (!Checkongjian(confirmPwd)) flag = false
  }
  if (flag) {
    if (arr.length) {
      for (let i = 0; i < arr.length; i++) {
        if (uname.value == arr[i].uname) {
          return alert('用户名已存在，请前往登录页面')
        }
      }
    }
    const obj = {
      uname: uname.value,
      password: password.value
    }
    arr.push(obj)
    sessionStorage.userInfo = JSON.stringify(arr)
    alert('注册成功')
    this.reset()
  }
})