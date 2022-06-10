const code = document.querySelector('.code')
    let flag = true
    code.addEventListener('click', function () {
      if (flag) {
        flag = false
        let i = 5
        code.innerHTML = `0${i}秒后再发送`
        let Timer = setInterval(function () {
          i--
          if (i === 0) {
            clearInterval(Timer)
            flag = true
            return code.innerHTML = `重新获取`
          }
          code.innerHTML = `0${i}秒后再发送`
        }, 1000)
      }
    })

    // 验证用户名
    const uname = document.querySelector('[name=username]')
    uname.addEventListener('change', verifyName)
    function verifyName() {
      const reg = /^[a-zA-Z\d-_]{6,16}$/
      if (!reg.test(uname.value)) {
        uname.nextElementSibling.innerHTML = '格式错误，请输入6-16位带有数字、字母等'
        return false
      }
      uname.nextElementSibling.innerHTML = ''
      return true
    }
    // 验证手机号
    const phone = document.querySelector('[name=phone]')
    phone.addEventListener('change', verifyPhone)
    function verifyPhone() {
      const reg = /^1[3578][\d]{9}$/
      if (!reg.test(phone.value)) {
        phone.nextElementSibling.innerHTML = '格式错误，请输入正确的手机号'
        return false
      }
      phone.nextElementSibling.innerHTML = ''
      return true
    }
    // 验证验证码
    const yzcode = document.querySelector('[name=code]')
    yzcode.addEventListener('change', verifyCode)
    function verifyCode() {
      const reg = /^\d{6}$/
      if (!reg.test(yzcode.value)) {
        yzcode.nextElementSibling.innerHTML = '验证码输入错误'
        return false
      }
      yzcode.nextElementSibling.innerHTML = ''
      return true
    }
    // 验证密码
    const pwd = document.querySelector('[name=password]')
    pwd.addEventListener('change', verifyPwd)
    function verifyPwd() {
      const reg = /^[a-zA-Z\d-_\.]{6,20}$/
      if (!reg.test(pwd.value)) {
        pwd.nextElementSibling.innerHTML = '验证码输入错误'
        return false
      }
      pwd.nextElementSibling.innerHTML = ''
      return true
    }

    // 重复验证密码
    const confirmPwd = document.querySelector('[name=confirm]')
    confirmPwd.addEventListener('change', verifyConfirmPwd)
    function verifyConfirmPwd() {
      if (pwd.value != confirmPwd.value) {
        confirmPwd.nextElementSibling.innerHTML = '两次输入密码不一致，请检查'
        return false
      }
      confirmPwd.nextElementSibling.innerHTML = ''
      return true
    }
    const agree = document.querySelector('.icon-queren')
    agree.addEventListener('click', function () {
      agree.classList.toggle('icon-queren2')
    })
    const form = document.querySelector('form')
    const data = sessionStorage.userInfo
    const arr = data ? JSON.parse(data) : []
    form.addEventListener('click', function (e) {
      let flag = true
      if (e.target.tagName === "BUTTON") {
        if (!agree.classList.contains('icon-queren2')) {
          alert('请先同意协议')
          e.preventDefault();
          flag=false
        }
        if (!verifyName()) { e.preventDefault(); flag = false }
        if (!verifyPhone()) { e.preventDefault(); flag = false }
        if (!verifyCode()) { e.preventDefault(); flag = false }
        if (!verifyPwd()) { e.preventDefault(); flag = false }
        if (!verifyConfirmPwd()) { e.preventDefault(); flag = false }
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].uname == uname.value) {
              e.preventDefault()
              return alert('该用户名已存在，请直接登录')
            }
          }
        }
        if (flag) {
          let obj = {
            uname: uname.value,
            pwd: pwd.value
          }
          arr.push(obj)
          sessionStorage.userInfo = JSON.stringify(arr)
          alert('注册成功')
          e.preventDefault()
          return location.href = './login.html'
        }
      }
    })