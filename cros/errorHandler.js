import Vue from "vue";
import Cookie from "js-cookie";
Vue.prototype.eleMessage = "ERROR";
setInterval(() => {
  Vue.prototype.eleMessage = "ERROR";
}, 3000);

let messageLang = {
  en_US: {
    "4001": "The request was rejected by the user",
    "50009": "The parameters were invalid",
    "-32602": "Internal error",
    "-32603": "Network error, Please try again later",
    "50009": "Asset balance can’t be obtained, please refresh the page",
    "-32002": "Already processing eth_requestAccounts. Please wait",
  },
  zh_CN: {
    "4001": "用户拒绝了该请求",
    "50009": "参数无效",
    "-32602": "内部错误",
    "-32603": "网络错误，请稍后重试",
    "50009": "未获取到资产余额，请刷新页面",
    "-32002": "Already processing eth_requestAccounts. Please wait",
  },
};
const handler = (error) => {
  let lang = Cookie.get("lang") || "zh_CN";
  let message;
  console.log(JSON.stringify(error));
  if (error || error.code) {
    if (messageLang[lang][error.code]) {
      message = messageLang[lang][error.code];
    } else {
      message = error.message || error;
    }
  }
  if (Vue.prototype.eleMessage != message) {
    Vue.prototype.eleMessage = message;
    Vue.prototype.$message.error(message || "ERROR");
  }
};
export default handler;
