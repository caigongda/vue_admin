export default{
  install (Vue, options) {
    Vue.prototype.test = function () {
        console.log("自定义全局函数")
    }
  }
}