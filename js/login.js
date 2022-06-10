const uname = document.querySelector('[name=username]')
    const pwd = document.querySelector('[name=password]')
    const data = sessionStorage.userInfo
    const arr = data ? JSON.parse(data) : []
    const form = document.querySelector('form')
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const my_checkbox = document.querySelector('#my-checkbox')
      if (my_checkbox.checked) {
        let flag = false
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (uname.value == arr[i].uname) {
              if (pwd.value == arr[i].pwd) {
                flag = true
              }
            }
          }
        }
        if (flag) {
          alert('登录成功')
          sessionStorage.loginUser=uname.value
          location.href = './index.html'
        } else {
          alert('用户名或密码错误')
        }
      }else{
        alert('请先同意协议')
      }
    })