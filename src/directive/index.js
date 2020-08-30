// 全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
import Vue from 'vue'
import { Message } from 'element-ui'

/**
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = function(url) {
  return new Promise((resolve) => {
    var img = new Image()
    img.onload = function() {
      if (this.complete == true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function() {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

Vue.directive('real-img', async function(el, binding) { // 指令名称为：real-img
  const imgURL = binding.value// 获取图片地址
  if (imgURL) {
    const exist = await imageIsExist(imgURL)
    if (exist) {
      el.setAttribute('src', imgURL)
    }
  }
})

// 说明标记
Vue.directive('help', {
  name: 'help',
  inserted(el, binding) {
    if (!el.innerHTML.includes('el-icon-question')) {
      if (!el.style.position) {
        el.style.position = 'relative'
      }
      const node = document.createElement('SPAN')
      node.setAttribute('id', `helper`)
      el.appendChild(node)
      binding.helpInst = new Vue({
        el: '#helper',
        template: `<el-tooltip placement="top-start" :tabindex='-1'>
          <div slot="content">
            ${binding.value || ''}
          </div>
          <i class="el-icon-question" style="position:absolute;right:-10px;top:-5px;cursor:pointer;color: #666;" @click.stop></i>
        </el-tooltip>`
      })
    }
  },
  unbind(el, binding) {
    if (!binding.helpInst) {
      return
    }
    binding.helpInst.$destroy()
  }
})

// 复制文本
Vue.directive('copy', {
  name: 'copy',
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示。可根据项目UI仔细设计
        console.log('无复制内容')
        return
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement('textarea')
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea)
      // 选中值并复制
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        // console.log('复制成功') // 可根据项目UI仔细设计
        Message.closeAll()
        Message.success('复制成功')
      }
      document.body.removeChild(textarea)
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handler)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el, { value }) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
})
