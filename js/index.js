// 当session中未存储用户名，直接跳转
(function(){
  const uname=sessionStorage.loginUser

  if (!uname) {
    // location.href='http://www.baidu.com'
  }
  else{
    document.querySelector('.xtx_navs li a').innerHTML=`你好${uname}`
    const li=document.createElement('li')
    li.innerHTML=`
    <a href="./login.html">退出登录</a>
    `
    const ul=document.querySelector('.xtx_navs')
    ul.insertBefore(li,ul.children[1])
  }
})();

// 第一模块
(function () {
  // 获取电梯元素
  const elevator = document.querySelector(".xtx-elevator")
  // 获取banner图元素
  const banner = document.querySelector('.xtx_entry')
  // 给window添加滚动事件
  window.addEventListener('scroll', function () {
    // 获取html被卷去的高度
    const n = document.documentElement.scrollTop;
    // 如果滚动大于300时，显示电梯导航
    // if(n>=300){
    //   elevator.style.opacity='1'
    // }else{
    //   elevator.style.opacity='0'
    // }
    // 当页面滚动到banner图区域的时候，显示电梯导航
    elevator.style.opacity = n >= banner.offsetTop ? 1 : 0
  })
  // backTop.addEventListener('click',function(){
  //   document.documentElement.scrollTop=0
  // })
  backTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
})();

// 第二模块
(function () {
  const ul = document.querySelector('.xtx-elevator-list')
  ul.addEventListener('click', function (e) {
    if (e.target.tagName === "A" && e.target.dataset.name) {
      if (document.querySelector('.xtx-elevator-list a.active')) {
        document.querySelector('.xtx-elevator-list a.active').classList.remove('active')
      }
      const header = document.querySelector(`.xtx_goods_${e.target.dataset.name}`)
      window.scrollTo({
        top: header.offsetTop,
        behavior: 'smooth'
      })
      e.target.classList.add('active')
    }
  })
  window.addEventListener('scroll', function () {
    const aList = document.querySelectorAll('.xtx-elevator-list a')
    const n = document.documentElement.scrollTop
    for (let i = 0; i < aList.length - 1; i++) {
      const loaclA = document.querySelector(`.xtx_goods_${aList[i].dataset.name}`).offsetTop
      if (n >= loaclA) {
        if (document.querySelector('.xtx-elevator-list a.active')) {
          document.querySelector('.xtx-elevator-list a.active').classList.remove('active')
        }
        aList[i].classList.add('active')
      }
    }
  })
})();

const ul=document.querySelector('.xtx_navs')
ul.addEventListener('click',function(e){
  if (e.target.tagName==="A") {
    if (e.target.innerHTML=="退出登录") {
      delete sessionStorage.loginUser
    }
  }
})