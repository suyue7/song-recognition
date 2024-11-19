if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  var _e, _f, _g, _h;
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _export_sfc = (sfc, props2) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props2) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$a = {
    onLoad() {
      let res = this.getData();
      this.h = res.h;
      this.w = res.w;
    },
    data() {
      return {
        h: "",
        w: "",
        accountInfo: {
          account: "",
          password: ""
        }
      };
    },
    methods: {
      getData() {
        var result = { w: 0, h: 0 };
        uni.getSystemInfo({
          success: function(res) {
            formatAppLog("log", "at pages/login.vue:53", res);
            result.h = res.windowHeight;
            result.w = res.windowWidth;
          }
        });
        formatAppLog("log", "at pages/login.vue:58", result);
        return result;
      },
      forAccount: function(event) {
        this.accountInfo.account = event.detail.value;
      },
      forPass: function(event) {
        this.accountInfo.password = event.detail.value;
      },
      login() {
        formatAppLog("log", "at pages/login.vue:69", this.accountInfo);
        uni.request({
          url: "http://110.41.35.178:8081/login",
          method: "GET",
          data: {
            account: this.accountInfo.account,
            password: this.accountInfo.password
          },
          success: (res) => {
            formatAppLog("log", "at pages/login.vue:78", res.data.answer);
            var accountInfo = JSON.stringify(this.accountInfo);
            if (res.data.answer == "登陆成功") {
              uni.navigateTo({
                url: "./send?accountInfo=" + encodeURIComponent(accountInfo)
              });
            } else {
              formatAppLog("log", "at pages/login.vue:85", "登录失败");
            }
          }
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "div",
          {
            class: "bg-wrapper",
            style: vue.normalizeStyle({ "height": $data.h + "px", "position": "fixed" })
          },
          [
            (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: "image-bg",
              mode: "scaleToFill",
              src: "/static/008%20Rainy%20Ashville1_3.png"
            }))
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            class: "content-wrapper",
            style: vue.normalizeStyle({ "height": $data.h + "px" })
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: "space2",
                style: vue.normalizeStyle({ "marginTop": 0.45 * $data.h + "px" })
              },
              [
                vue.createElementVNode(
                  "input",
                  {
                    class: "inputBox",
                    onInput: _cache[0] || (_cache[0] = (...args) => $options.forAccount && $options.forAccount(...args)),
                    "placeholder-style": "color:#A58BA6;",
                    placeholder: "account"
                  },
                  null,
                  32
                  /* NEED_HYDRATION */
                ),
                vue.createElementVNode(
                  "input",
                  {
                    class: "inputBox",
                    onInput: _cache[1] || (_cache[1] = (...args) => $options.forPass && $options.forPass(...args)),
                    "placeholder-style": "color:#A58BA6;",
                    password: "",
                    placeholder: "password"
                  },
                  null,
                  32
                  /* NEED_HYDRATION */
                ),
                vue.createElementVNode("button", {
                  class: "loginButton",
                  onClick: _cache[2] || (_cache[2] = (...args) => $options.login && $options.login(...args))
                }, "login"),
                vue.createElementVNode("view", { class: "mid" }, [
                  vue.createElementVNode("view", { style: { "align-items": "center", "display": "flex", "flex-direction": "row" } }, [
                    vue.createElementVNode("checkbox", {
                      value: "cb",
                      checked: "false",
                      color: "#A58BA6",
                      style: { "transform": "scale(0.7)" }
                    }),
                    vue.createElementVNode("text", { style: { "color": "#FFFAFA" } }, "保存密码")
                  ]),
                  vue.createElementVNode("text", {
                    onClick: _cache[3] || (_cache[3] = (...args) => _ctx.forget && _ctx.forget(...args)),
                    style: { "color": "#FFFAFA" }
                  }, "忘记密码?")
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { style: { "color": "#494049" } }, "没有账号？点击这里"),
                  vue.createElementVNode("text", {
                    onClick: _cache[4] || (_cache[4] = (...args) => _ctx.registry && _ctx.registry(...args)),
                    style: { "color": "#80305B" }
                  }, "注册")
                ])
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesLogin = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/login.vue"]]);
  const _sfc_main$9 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: "/static/logo.png"
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($data.title),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/index/index.vue"]]);
  const mpMixin = {};
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
  }
  function url(value) {
    return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
  }
  function string(value) {
    return typeof value === "string";
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    }
    if (value.length === 8) {
      return xreg.test(value);
    }
    return false;
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    const reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range$1(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (value === 0 || isNaN(value))
          return true;
        break;
      case "object":
        if (value === null || value.length === 0)
          return true;
        for (const i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value === "string") {
      try {
        const obj = JSON.parse(value);
        if (typeof obj === "object" && obj) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    }
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  const test = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    amount,
    array,
    carNo,
    chinese,
    code,
    contains,
    date,
    dateISO,
    digits,
    email,
    empty,
    enOrNum,
    func,
    idCard,
    image,
    jsonString,
    landline,
    letter,
    mobile,
    number,
    object,
    promise,
    range: range$1,
    rangeLength,
    regExp,
    string,
    url,
    video
  }, Symbol.toStringTag, { value: "Module" }));
  function strip(num, precision = 15) {
    return +parseFloat(Number(num).toPrecision(precision));
  }
  function digitLength(num) {
    const eSplit = num.toString().split(/[eE]/);
    const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
    return len > 0 ? len : 0;
  }
  function float2Fixed(num) {
    if (num.toString().indexOf("e") === -1) {
      return Number(num.toString().replace(".", ""));
    }
    const dLen = digitLength(num);
    return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
  }
  function checkBoundary(num) {
    {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        formatAppLog("warn", "at uni_modules/uv-ui-tools/libs/function/digit.js:45", `${num} 超出了精度限制，结果可能不正确`);
      }
    }
  }
  function iteratorOperation(arr, operation) {
    const [num1, num2, ...others] = arr;
    let res = operation(num1, num2);
    others.forEach((num) => {
      res = operation(res, num);
    });
    return res;
  }
  function times(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, times);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    const baseNum = digitLength(num1) + digitLength(num2);
    const leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    return leftValue / Math.pow(10, baseNum);
  }
  function divide(...nums) {
    if (nums.length > 2) {
      return iteratorOperation(nums, divide);
    }
    const [num1, num2] = nums;
    const num1Changed = float2Fixed(num1);
    const num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
  }
  function round(num, ratio) {
    const base = Math.pow(10, ratio);
    let result = divide(Math.round(Math.abs(times(num, base))), base);
    if (num < 0 && result !== 0) {
      result = times(result, -1);
    }
    return result;
  }
  function range(min = 0, max = 0, value = 0) {
    return Math.max(min, Math.min(max, Number(value)));
  }
  function getPx(value, unit = false) {
    if (number(value)) {
      return unit ? `${value}px` : Number(value);
    }
    if (/(rpx|upx)$/.test(value)) {
      return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)));
    }
    return unit ? `${parseInt(value)}px` : parseInt(value);
  }
  function sleep(value = 30) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, value);
    });
  }
  function os() {
    return uni.getSystemInfoSync().platform.toLowerCase();
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      const gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    }
    return 0;
  }
  function guid(len = 32, firstU = true, radix = null) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return `u${uuid.join("")}`;
    }
    return uuid.join("");
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function addStyle(customStyle, target = "object") {
    if (empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function addUnit(value = "auto", unit = ((_b) => (_b = ((_a) => (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config)()) == null ? void 0 : _b.unit)() ? ((_d) => (_d = ((_c) => (_c = uni == null ? void 0 : uni.$uv) == null ? void 0 : _c.config)()) == null ? void 0 : _d.unit)() : "px") {
    value = String(value);
    return number(value) ? `${value}${unit}` : value;
  }
  function deepClone(obj, cache = /* @__PURE__ */ new WeakMap()) {
    if (obj === null || typeof obj !== "object")
      return obj;
    if (cache.has(obj))
      return cache.get(obj);
    let clone;
    if (obj instanceof Date) {
      clone = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      clone = new RegExp(obj);
    } else if (obj instanceof Map) {
      clone = new Map(Array.from(obj, ([key, value]) => [key, deepClone(value, cache)]));
    } else if (obj instanceof Set) {
      clone = new Set(Array.from(obj, (value) => deepClone(value, cache)));
    } else if (Array.isArray(obj)) {
      clone = obj.map((value) => deepClone(value, cache));
    } else if (Object.prototype.toString.call(obj) === "[object Object]") {
      clone = Object.create(Object.getPrototypeOf(obj));
      cache.set(obj, clone);
      for (const [key, value] of Object.entries(obj)) {
        clone[key] = deepClone(value, cache);
      }
    } else {
      clone = Object.assign({}, obj);
    }
    cache.set(obj, clone);
    return clone;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || target === null || typeof source !== "object" || source === null)
      return target;
    const merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    for (const prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      const sourceValue = source[prop];
      const targetValue = merged[prop];
      if (sourceValue instanceof Date) {
        merged[prop] = new Date(sourceValue);
      } else if (sourceValue instanceof RegExp) {
        merged[prop] = new RegExp(sourceValue);
      } else if (sourceValue instanceof Map) {
        merged[prop] = new Map(sourceValue);
      } else if (sourceValue instanceof Set) {
        merged[prop] = new Set(sourceValue);
      } else if (typeof sourceValue === "object" && sourceValue !== null) {
        merged[prop] = deepMerge(targetValue, sourceValue);
      } else {
        merged[prop] = sourceValue;
      }
    }
    return merged;
  }
  function error(err) {
    {
      formatAppLog("error", "at uni_modules/uv-ui-tools/libs/function/index.js:250", `uvui提示：${err}`);
    }
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]") {
        throw new TypeError(
          "fillString must be String"
        );
      }
      const str = this;
      if (str.length >= maxLength)
        return String(str);
      const fillLength = maxLength - str.length;
      let times2 = Math.ceil(fillLength / fillString.length);
      while (times2 >>= 1) {
        fillString += fillString;
        if (times2 === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, formatStr = "yyyy-mm-dd") {
    let date2;
    if (!dateTime) {
      date2 = /* @__PURE__ */ new Date();
    } else if (/^\d{10}$/.test(dateTime == null ? void 0 : dateTime.toString().trim())) {
      date2 = new Date(dateTime * 1e3);
    } else if (typeof dateTime === "string" && /^\d+$/.test(dateTime.trim())) {
      date2 = new Date(Number(dateTime));
    } else if (typeof dateTime === "string" && dateTime.includes("-") && !dateTime.includes("T")) {
      date2 = new Date(dateTime.replace(/-/g, "/"));
    } else {
      date2 = new Date(dateTime);
    }
    const timeSource = {
      "y": date2.getFullYear().toString(),
      // 年
      "m": (date2.getMonth() + 1).toString().padStart(2, "0"),
      // 月
      "d": date2.getDate().toString().padStart(2, "0"),
      // 日
      "h": date2.getHours().toString().padStart(2, "0"),
      // 时
      "M": date2.getMinutes().toString().padStart(2, "0"),
      // 分
      "s": date2.getSeconds().toString().padStart(2, "0")
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const key in timeSource) {
      const [ret] = new RegExp(`${key}+`).exec(formatStr) || [];
      if (ret) {
        const beginIndex = key === "y" && ret.length === 2 ? 2 : 0;
        formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
      }
    }
    return formatStr;
  }
  function timeFrom(timestamp = null, format = "yyyy-mm-dd") {
    if (timestamp == null)
      timestamp = Number(/* @__PURE__ */ new Date());
    timestamp = parseInt(timestamp);
    if (timestamp.toString().length == 10)
      timestamp *= 1e3;
    let timer = (/* @__PURE__ */ new Date()).getTime() - timestamp;
    timer = parseInt(timer / 1e3);
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = `${parseInt(timer / 60)}分钟前`;
        break;
      case (timer >= 3600 && timer < 86400):
        tips = `${parseInt(timer / 3600)}小时前`;
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = `${parseInt(timer / 86400)}天前`;
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = `${parseInt(timer / (86400 * 30))}个月前`;
          } else {
            tips = `${parseInt(timer / (86400 * 365))}年前`;
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    const prefix = isPrefix ? "?" : "";
    const _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (const key in data) {
      const value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(`${key}[${i}]=${value[i]}`);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(`${key}=${_value}`);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(`${key}=${commaStr}`);
            break;
          default:
            value.forEach((_value) => {
              _result.push(`${key}[]=${_value}`);
            });
        }
      } else {
        _result.push(`${key}=${value}`);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  function toast(title, duration = 2e3) {
    uni.showToast({
      title: String(title),
      icon: "none",
      duration
    });
  }
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function priceFormat(number2, decimals = 0, decimalPoint = ".", thousandsSeparator = ",") {
    number2 = `${number2}`.replace(/[^0-9+-Ee.]/g, "");
    const n = !isFinite(+number2) ? 0 : +number2;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSeparator === "undefined" ? "," : thousandsSeparator;
    const dec = typeof decimalPoint === "undefined" ? "." : decimalPoint;
    let s = "";
    s = (prec ? round(n, prec) + "" : `${Math.round(n)}`).split(".");
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
  }
  function getDuration(value, unit = true) {
    const valueNum = parseInt(value);
    if (unit) {
      if (/s$/.test(value))
        return value;
      return value > 30 ? `${value}ms` : `${value}s`;
    }
    if (/ms$/.test(value))
      return valueNum;
    if (/s$/.test(value))
      return valueNum > 30 ? valueNum : valueNum * 1e3;
    return valueNum;
  }
  function padZero(value) {
    return `00${value}`.slice(-2);
  }
  function formValidate(instance, event) {
    const formItem = $parent.call(instance, "uv-form-item");
    const form = $parent.call(instance, "uv-form");
    if (formItem && form) {
      form.validateField(formItem.prop, () => {
      }, event);
    }
  }
  function getProperty(obj, key) {
    if (!obj) {
      return;
    }
    if (typeof key !== "string" || key === "") {
      return "";
    }
    if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      let firstObj = obj[keys[0]] || {};
      for (let i = 1; i < keys.length; i++) {
        if (firstObj) {
          firstObj = firstObj[keys[i]];
        }
      }
      return firstObj;
    }
    return obj[key];
  }
  function setProperty(obj, key, value) {
    if (!obj) {
      return;
    }
    const inFn = function(_obj, keys, v) {
      if (keys.length === 1) {
        _obj[keys[0]] = v;
        return;
      }
      while (keys.length > 1) {
        const k = keys[0];
        if (!_obj[k] || typeof _obj[k] !== "object") {
          _obj[k] = {};
        }
        keys.shift();
        inFn(_obj[k], keys, v);
      }
    };
    if (typeof key !== "string" || key === "")
      ;
    else if (key.indexOf(".") !== -1) {
      const keys = key.split(".");
      inFn(obj, keys, value);
    } else {
      obj[key] = value;
    }
  }
  function page() {
    var _a;
    const pages2 = getCurrentPages();
    const route2 = (_a = pages2[pages2.length - 1]) == null ? void 0 : _a.route;
    return `/${route2 ? route2 : ""}`;
  }
  function pages() {
    const pages2 = getCurrentPages();
    return pages2;
  }
  function getHistoryPage(back = 0) {
    const pages2 = getCurrentPages();
    const len = pages2.length;
    return pages2[len - 1 + back];
  }
  function setConfig({
    props: props2 = {},
    config = {},
    color = {},
    zIndex = {}
  }) {
    const {
      deepMerge: deepMerge2
    } = uni.$uv;
    uni.$uv.config = deepMerge2(uni.$uv.config, config);
    uni.$uv.props = deepMerge2(uni.$uv.props, props2);
    uni.$uv.color = deepMerge2(uni.$uv.color, color);
    uni.$uv.zIndex = deepMerge2(uni.$uv.zIndex, zIndex);
  }
  const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    $parent,
    addStyle,
    addUnit,
    deepClone,
    deepMerge,
    error,
    formValidate,
    getDuration,
    getHistoryPage,
    getProperty,
    getPx,
    guid,
    os,
    padZero,
    page,
    pages,
    priceFormat,
    queryParams,
    random,
    randomArray,
    range,
    setConfig,
    setProperty,
    sleep,
    sys,
    timeFormat,
    timeFrom,
    toast,
    trim,
    type2icon
  }, Symbol.toStringTag, { value: "Module" }));
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false,
        // 是否需要拦截
        events: {}
        // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = queryParams(params, false);
        return url2 += `&${query}`;
      }
      query = queryParams(params);
      return url2 += query;
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = deepMerge(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === page())
        return;
      if (params.intercept) {
        mergeConfig.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = deepMerge(this.config, mergeConfig);
      if (typeof mergeConfig.intercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          mergeConfig.intercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration,
        events
      } = config;
      if (config.type == "navigateTo" || config.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration,
          events
        });
      }
      if (config.type == "redirectTo" || config.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config.type == "switchTab" || config.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config.type == "reLaunch" || config.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config.type == "navigateBack" || config.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(() => {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let flag;
  function throttle(func2, wait = 500, immediate = true) {
    if (immediate) {
      if (!flag) {
        flag = true;
        typeof func2 === "function" && func2();
        setTimeout(() => {
          flag = false;
        }, wait);
      }
    } else if (!flag) {
      flag = true;
      setTimeout(() => {
        flag = false;
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  const mixin = {
    // 定义每个组件都可能需要用到的外部样式以及类名
    props: {
      // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
      customStyle: {
        type: [Object, String],
        default: () => ({})
      },
      customClass: {
        type: String,
        default: ""
      },
      // 跳转的页面路径
      url: {
        type: String,
        default: ""
      },
      // 页面跳转的类型
      linkType: {
        type: String,
        default: "navigateTo"
      }
    },
    data() {
      return {};
    },
    onLoad() {
      this.$uv.getRect = this.$uvGetRect;
    },
    created() {
      this.$uv.getRect = this.$uvGetRect;
    },
    computed: {
      $uv() {
        var _a, _b;
        return {
          ...index,
          test,
          route,
          debounce,
          throttle,
          unit: (_b = (_a = uni == null ? void 0 : uni.$uv) == null ? void 0 : _a.config) == null ? void 0 : _b.unit
        };
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `uv-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uvGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$uv.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uvOnReachBottom");
    },
    beforeDestroy() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    },
    // 兼容vue3
    unmounted() {
      if (this.parent && array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index2) => {
          if (child === this) {
            childrenList.splice(index2, 1);
          }
        });
      }
    }
  };
  const props$1 = {
    props: {
      color: {
        type: String,
        default: "#d6d7d9"
      },
      // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
      length: {
        type: [String, Number],
        default: "100%"
      },
      // 线条方向，col-竖向，row-横向
      direction: {
        type: String,
        default: "row"
      },
      // 是否显示细边框
      hairline: {
        type: Boolean,
        default: true
      },
      // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
      margin: {
        type: [String, Number],
        default: 0
      },
      // 是否虚线，true-虚线，false-实线
      dashed: {
        type: Boolean,
        default: false
      },
      ...(_f = (_e = uni.$uv) == null ? void 0 : _e.props) == null ? void 0 : _f.line
    }
  };
  const _sfc_main$8 = {
    name: "uv-line",
    mixins: [mpMixin, mixin, props$1],
    computed: {
      lineStyle() {
        const style = {};
        style.margin = this.margin;
        if (this.direction === "row") {
          style.borderBottomWidth = "1px";
          style.borderBottomStyle = this.dashed ? "dashed" : "solid";
          style.width = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleY(0.5)";
        } else {
          style.borderLeftWidth = "1px";
          style.borderLeftStyle = this.dashed ? "dashed" : "solid";
          style.height = this.$uv.addUnit(this.length);
          if (this.hairline)
            style.transform = "scaleX(0.5)";
        }
        style.borderColor = this.color;
        return this.$uv.deepMerge(style, this.$uv.addStyle(this.customStyle));
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-line",
        style: vue.normalizeStyle([$options.lineStyle])
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-dcf8cb8f"], ["__file", "C:/workspace/HBuilderProjects/pack-test/uni_modules/uv-line/components/uv-line/uv-line.vue"]]);
  const props = {
    props: {
      // 是否虚线
      dashed: {
        type: Boolean,
        default: false
      },
      // 是否细线
      hairline: {
        type: Boolean,
        default: true
      },
      // 是否以点替代文字，优先于text字段起作用
      dot: {
        type: Boolean,
        default: false
      },
      // 内容文本的位置，left-左边，center-中间，right-右边
      textPosition: {
        type: String,
        default: "center"
      },
      // 文本内容
      text: {
        type: [String, Number],
        default: ""
      },
      // 文本大小
      textSize: {
        type: [String, Number],
        default: 14
      },
      // 文本颜色
      textColor: {
        type: String,
        default: "#909399"
      },
      // 线条颜色
      lineColor: {
        type: String,
        default: "#dcdfe6"
      },
      ...(_h = (_g = uni.$uv) == null ? void 0 : _g.props) == null ? void 0 : _h.divider
    }
  };
  const _sfc_main$7 = {
    name: "uv-divider",
    mixins: [mpMixin, mixin, props],
    emits: ["click"],
    computed: {
      textStyle() {
        const style = {};
        style.fontSize = this.$uv.addUnit(this.textSize);
        style.color = this.textColor;
        return style;
      },
      // 左边线条的的样式
      leftLineStyle() {
        const style = {};
        if (this.textPosition === "left") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      },
      // 右边线条的的样式
      rightLineStyle() {
        const style = {};
        if (this.textPosition === "right") {
          style.width = "80rpx";
        } else {
          style.flex = 1;
        }
        return style;
      }
    },
    methods: {
      // divider组件被点击时触发
      click() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_line = resolveEasycom(vue.resolveDynamicComponent("uv-line"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uv-divider",
        style: vue.normalizeStyle([_ctx.$uv.addStyle(_ctx.customStyle)]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.click && $options.click(...args))
      },
      [
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.leftLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"]),
        _ctx.dot ? (vue.openBlock(), vue.createElementBlock("text", {
          key: 0,
          class: "uv-divider__dot"
        }, "●")) : _ctx.text ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 1,
            class: "uv-divider__text",
            style: vue.normalizeStyle([$options.textStyle])
          },
          vue.toDisplayString(_ctx.text),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uv_line, {
          color: _ctx.lineColor,
          customStyle: $options.rightLineStyle,
          hairline: _ctx.hairline,
          dashed: _ctx.dashed
        }, null, 8, ["color", "customStyle", "hairline", "dashed"])
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-222d1a38"], ["__file", "C:/workspace/HBuilderProjects/pack-test/uni_modules/uv-divider/components/uv-divider/uv-divider.vue"]]);
  const _sfc_main$6 = {
    props: ["songs", "accountInfo"],
    data() {
      return {};
    },
    methods: {
      goSong() {
        formatAppLog("log", "at pages/conponents/singleSong.vue:20", "goSong! " + this.accountInfo);
        uni.request({
          url: "http://110.41.35.178:8081/song",
          method: "GET",
          data: {
            songName: this.songs.songName
          },
          success: (res) => {
            formatAppLog("log", "at pages/conponents/singleSong.vue:28", res.data);
            var songData = JSON.stringify(res.data);
            var accountInfo = JSON.stringify(this.accountInfo);
            formatAppLog("log", "at pages/conponents/singleSong.vue:31", songData);
            uni.navigateTo({
              url: "./player?songData=" + encodeURIComponent(songData) + "&accountInfo=" + encodeURIComponent(accountInfo)
            });
          }
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "song" }, [
      vue.createElementVNode("view", {
        class: "song",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.goSong && $options.goSong(...args))
      }, [
        vue.createElementVNode(
          "text",
          { style: { "margin-right": "45rpx", "font-size": "40rpx", "color": "#363636" } },
          vue.toDisplayString($props.songs.songName),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { style: { "font-size": "30rpx", "color": "#939292" } },
          vue.toDisplayString($props.songs.artist),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesConponentsSingleSong = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/conponents/singleSong.vue"]]);
  let innerAudioContext = null;
  function time(value) {
    let theTime = parseInt(value);
    let middle = 0;
    let hour = 0;
    if (theTime > 59) {
      middle = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
    }
    if (middle > 59) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
    theTime < 10 ? theTime = "0" + theTime : theTime = theTime;
    middle < 10 ? middle = "0" + middle : middle = middle;
    hour < 10 ? hour = "0" + hour : hour = hour;
    if (hour == 0) {
      return middle + ":" + theTime;
    }
    return hour + ":" + middle + ":" + theTime;
  }
  function lyricDone(lyric) {
    let arr;
    if (lyric) {
      formatAppLog("log", "at pages/player.vue:183", lyric.split(/[(\r\n)\r\n]+/));
      let lrc = lyric.split(/[(\r\n)\r\n]+/);
      lrc.splice(lrc.length - 1, 1);
      arr = lrc.map((item, i) => {
        let min = item.slice(1, 3);
        let sec = item.slice(4, 6);
        let mill = item.slice(7, 9);
        let lrc2 = item.slice(10, item.length);
        let timer = parseInt(min) * 60 + parseInt(sec) + parseInt(mill) * 0.01;
        return { min, sec, mill, lrc: lrc2, timer };
      });
      arr.forEach((item, i) => {
        if (i == arr.length - 1) {
          item.pre = 6e6;
        } else {
          item.pre = arr[i + 1].timer;
        }
      });
    }
    formatAppLog("log", "at pages/player.vue:202", arr);
    return arr;
  }
  function getCurrentLyric(lyric, currentTime) {
    let cl;
    lyric.forEach((item, i) => {
      if (currentTime >= item.timer && currentTime <= item.pre) {
        cl = item.lrc;
      }
    });
    return cl;
  }
  function getCurrentIndex(songName, playList) {
    let index2;
    playList.forEach((item, i) => {
      if (item.songName == songName) {
        index2 = i;
      }
    });
    return index2;
  }
  const _sfc_main$5 = {
    components: {
      singleSong: PagesConponentsSingleSong
    },
    data() {
      return {
        h: "",
        w: "",
        top: "",
        lyric: "",
        isLyric: false,
        isPop: false,
        isList: false,
        isLoop: false,
        current: 0,
        currentT: "",
        playButton: "../../static/pause.png",
        circleButton: "../../static/once.png",
        currentLyric: "I hear all you're failing",
        currentTime: "01:34",
        durationTime: "05:24",
        animationPlayState: "running",
        top: "",
        accountInfo: {
          account: "",
          password: ""
        },
        playList: [
          {
            songName: "雪国(Niigata)",
            artist: "· 椎名林檎"
          },
          {
            songName: "My Love Mine All Mine",
            artist: "· Mitski"
          }
        ],
        diskSize: {
          height: "",
          width: "",
          zIndex: 3,
          position: "absolute",
          paddingLeft: ""
        },
        songData: {
          songName: "Lightship",
          artist: "ザ·なつやすみバンド",
          songSrc: "http://music.163.com/song/media/outer/url?id=1963704574.mp3",
          diskSrc: "https://p3.music.126.net/7GdnVxEy-ZcPT2Fuc98YbQ==/109951167665883527.jpg",
          lyric: `[00:00.000]Lightship - ザ·なつやすみバンド
[00:00.320]词：中川理沙
[00:00.560]曲：中川理沙
[00:00.860]编曲：ザ・なつやすみバンド
[00:01.050]光の中にいつも君がいるみたいで
[00:10.910]僕は目をそらせない
[00:43.570]道は続いてゆく
[00:47.410]悲しみや祈りを照らす方へ`
        },
        photoSize: {
          height: "",
          width: ""
        },
        photoWrapper: {
          paddingLeft: "",
          paddingTop: ""
        }
      };
    },
    onUnload() {
      if (innerAudioContext) {
        innerAudioContext.destroy();
      }
    },
    onLoad(option) {
      let self = this;
      let res = this.getData();
      let data = JSON.parse(decodeURIComponent(option.songData));
      let data1 = JSON.parse(decodeURIComponent(option.accountInfo));
      this.songData = data;
      this.accountInfo = data1;
      this.lyric = this.songData.lyric;
      this.lyric = lyricDone(this.lyric);
      this.h = res.h;
      this.w = res.w;
      uni.request({
        url: "http://110.41.35.178:8081/playlist",
        method: "GET",
        data: {
          account: this.accountInfo.account
        },
        success: (res2) => {
          formatAppLog("log", "at pages/player.vue:317", res2.data);
          self.playList = res2.data;
        }
      });
      innerAudioContext = uni.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.loop = false;
      innerAudioContext.src = this.songData.songSrc;
      this.diskSizeInitial();
      innerAudioContext.onPlay(() => {
        this.playButton = "../../static/pause.png";
        this.animationPlayState = "running";
      });
      innerAudioContext.onPause(() => {
        self.playButton = "../../static/play.png";
        self.animationPlayState = "paused";
      });
      innerAudioContext.onEnded(() => {
        self.playButton = "../../static/pause_44.png";
        self.animationPlayState = "paused";
        this.top = 0.05 % this.h;
      });
      innerAudioContext.onEnded(() => {
        if (self.isLoop == flase) {
          self.goNext();
        }
      });
      innerAudioContext.onTimeUpdate(() => {
        var progress = innerAudioContext.currentTime / innerAudioContext.duration;
        {
          this.current = progress;
        }
        this.currentTime = time(innerAudioContext.currentTime);
        this.durationTime = time(innerAudioContext.duration);
        this.currentT = innerAudioContext.currentTime;
        this.currentLyric = getCurrentLyric(this.lyric, innerAudioContext.currentTime);
        let p = uni.createSelectorQuery().in(this).select(".playLyric");
        let ph = 0;
        p.boundingClientRect((data2) => {
          if (data2) {
            ph = data2.top;
            if (ph > this.h * 0.35) {
              if (ph != this.last) {
                this.top = Math.ceil(this.top + ph - this.h * 0.35);
              }
            } else if (ph < 0) {
              if (ph != this.last) {
                this.top = Math.ceil(this.top + ph - this.h * 0.35);
              }
            }
          }
          this.last = ph;
        }).exec();
      });
    },
    methods: {
      //获得屏幕尺寸信息
      getData() {
        var result = { w: 0, h: 0 };
        uni.getSystemInfo({
          success: function(res) {
            formatAppLog("log", "at pages/player.vue:382", res);
            result.h = res.windowHeight;
            result.w = res.windowWidth;
          }
        });
        formatAppLog("log", "at pages/player.vue:387", result);
        return result;
      },
      play() {
        let self = this;
        if (innerAudioContext.paused == true) {
          innerAudioContext.play();
          formatAppLog("log", "at pages/player.vue:394", "playing~");
        } else {
          innerAudioContext.pause();
          formatAppLog("log", "at pages/player.vue:400", self.animationPlayState);
        }
      },
      back() {
        formatAppLog("log", "at pages/player.vue:404", "back~");
        var accountInfo = JSON.stringify(this.accountInfo);
        uni.redirectTo({
          url: "/pages/send?accountInfo=" + encodeURIComponent(accountInfo)
        });
      },
      changeTime(e) {
        var time2 = innerAudioContext.duration * e.detail.value;
        innerAudioContext.seek(time2);
      },
      diskSizeInitial() {
        if (0.9 * this.w > 0.45 * this.h) {
          this.diskSize.height = 0.45 * this.h + "px";
          this.diskSize.width = 0.45 * this.h + "px";
          this.photoSize.height = 0.325 * this.h + "px";
          this.photoSize.width = 0.325 * this.h + "px";
          this.diskSize.paddingLeft = this.w - 0.3825 * this.h + "px";
          this.photoWrapper.paddingLeft = this.w - 0.32625 * this.h + "px";
          this.photoWrapper.paddingTop = 0.0625 * this.h + "px";
        } else {
          this.diskSize.height = 0.9 * this.w + "px";
          this.diskSize.width = 0.9 * this.w + "px";
          this.photoSize.height = 0.65 * this.w + "px";
          this.photoSize.width = 0.65 * this.w + "px";
          this.diskSize.paddingLeft = 0.25 * this.w + "px";
          this.photoWrapper.paddingLeft = 0.375 * this.w + "px";
          this.photoWrapper.paddingTop = 0.125 * this.w + "px";
        }
      },
      goLyric() {
        this.isLyric = true;
      },
      goDisk() {
        this.isLyric = false;
      },
      comfirm() {
        this.isPop = false;
      },
      goPop() {
        this.isList = true;
      },
      backSong() {
        this.isList = false;
      },
      goCircle() {
        if (this.isLoop) {
          innerAudioContext.loop = false;
          this.isLoop = false;
          this.circleButton = "../../static/circle.png";
        } else {
          innerAudioContext.loop = true;
          this.isLoop = true;
          this.circleButton = "../../static/once.png";
        }
      },
      goNext() {
        let self = this;
        let index2 = getCurrentIndex(this.songData.songName, this.playList);
        let len = this.playList.length;
        let newIndex = parseInt((index2 - 1) % len);
        uni.request({
          url: "http://110.41.35.178:8081/song",
          method: "GET",
          data: {
            songName: this.playList[newIndex].songName
          },
          success: (res) => {
            formatAppLog("log", "at pages/player.vue:478", res.data);
            self.songData = res.data;
            self.fresh();
          }
        });
      },
      goLast() {
        let self = this;
        let index2 = getCurrentIndex(this.songData.songName, this.playList);
        let len = this.playList.length;
        let newIndex = parseInt((index2 + 1) % len);
        uni.request({
          url: "http://110.41.35.178:8081/song",
          method: "GET",
          data: {
            songName: this.playList[newIndex].songName
          },
          success: (res) => {
            formatAppLog("log", "at pages/player.vue:496", res.data);
            self.songData = res.data;
            self.fresh();
          }
        });
      },
      fresh() {
        let self = this;
        innerAudioContext.destroy();
        innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.src = this.songData.songSrc;
        innerAudioContext.autoplay = true;
        innerAudioContext.onPlay(() => {
          this.playButton = "../../static/pause.png";
          this.animationPlayState = "running";
        });
        innerAudioContext.onPause(() => {
          self.playButton = "../../static/play.png";
          self.animationPlayState = "paused";
        });
        innerAudioContext.onEnded(() => {
          self.playButton = "../../static/pause_44.png";
          self.animationPlayState = "paused";
          this.top = 0.05 % this.h;
        });
        innerAudioContext.onTimeUpdate(() => {
          var progress = innerAudioContext.currentTime / innerAudioContext.duration;
          {
            this.current = progress;
          }
          this.currentTime = time(innerAudioContext.currentTime);
          this.durationTime = time(innerAudioContext.duration);
          this.currentT = innerAudioContext.currentTime;
          this.currentLyric = getCurrentLyric(this.lyric, innerAudioContext.currentTime);
          let p = uni.createSelectorQuery().in(this).select(".playLyric");
          let ph = 0;
          p.boundingClientRect((data) => {
            if (data) {
              ph = data.top;
              if (ph > this.h * 0.35) {
                if (ph != this.last) {
                  this.top = Math.ceil(this.top + ph - this.h * 0.35);
                }
              } else if (ph < 0) {
                if (ph != this.last) {
                  this.top = Math.ceil(this.top + ph - this.h * 0.35);
                }
              }
            }
            this.last = ph;
          }).exec();
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0);
    const _component_singleSong = vue.resolveComponent("singleSong");
    return vue.openBlock(), vue.createElementBlock("div", { style: { "position": "relative" } }, [
      vue.createElementVNode("div", { class: "bg-wrapper" }, [
        (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "image-bg",
          mode: "aspectFill",
          src: $data.songData.diskSrc
        }, null, 8, ["src"]))
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        { class: "popup" },
        [
          vue.createElementVNode("view", { class: "popup-info" }, [
            vue.createElementVNode("view", { class: "info-header" }, [
              vue.createElementVNode("image", {
                src: "/static/warning.png",
                style: { "width": "90rpx", "height": "90rpx", "margin-right": "10rpx" },
                mode: "scaleToFill"
              }),
              vue.createElementVNode("text", { style: { "font-size": "55rpx" } }, "搜索结果有误")
            ]),
            vue.createElementVNode("view", { style: { "margin-bottom": "30rpx" } }, [
              vue.createVNode(_component_uv_divider, {
                text: "错 误 归 因",
                lineColor: "#777",
                textColor: "#777",
                style: { "width": "400rpx" }
              }),
              vue.createElementVNode("text", { class: "hints" }, "• 歌曲版本错误\\n"),
              vue.createElementVNode("text", { class: "hints" }, "• 歌曲不匹配\\n")
            ]),
            vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "row", "align-items": "center", "justify-content": "space-between", "width": "70%" } }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode("button", {
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.comfirm && $options.comfirm(...args)),
                  style: { "height": "50rpx", "width": "120rpx", "font-size": "30rpx", "align-items": "center", "display": "flex", "flex-direction": "row" }
                }, "反馈")
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("button", {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.comfirm && $options.comfirm(...args)),
                  style: { "height": "50rpx", "width": "120rpx", "font-size": "30rpx", "align-items": "center", "display": "flex", "flex-direction": "row" }
                }, "取消")
              ])
            ])
          ])
        ],
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.isPop]
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "popup1",
          style: vue.normalizeStyle({ "height": this.h + "px" }),
          onClick: _cache[3] || (_cache[3] = (...args) => $options.backSong && $options.backSong(...args))
        },
        [
          vue.createElementVNode("view", { class: "songList" }, [
            vue.createElementVNode("view", { class: "head" }, [
              vue.createElementVNode("text", { style: { "font-size": "45rpx" } }, "歌曲列表"),
              vue.createElementVNode("image", {
                src: "/static/backTo2.png",
                class: "backTo",
                mode: "scaleToFill",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.backSong && $options.backSong(...args))
              })
            ]),
            vue.createVNode(_component_uv_divider, {
              style: { "width": "750rpx", "height": "1%" },
              "line-color": "#C0C0C0"
            }),
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              style: { "width": "750rpx", "height": "82%" }
            }, [
              vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.playList, (item, i) => {
                    return vue.openBlock(), vue.createElementBlock("view", { class: "List" }, [
                      vue.createVNode(_component_singleSong, {
                        songs: item,
                        accountInfo: $data.accountInfo
                      }, null, 8, ["songs", "accountInfo"])
                    ]);
                  }),
                  256
                  /* UNKEYED_FRAGMENT */
                ))
              ])
            ])
          ])
        ],
        4
        /* STYLE */
      ), [
        [vue.vShow, $data.isList]
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "main",
          style: vue.normalizeStyle({ "height": $data.h + "px" })
        },
        [
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", { class: "back" }, [
              vue.createElementVNode("image", {
                src: "/static/backTo.png",
                class: "back-image",
                mode: "scaleToFit",
                onClick: _cache[4] || (_cache[4] = (...args) => $options.back && $options.back(...args))
              })
            ])
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            {
              class: "disk-wrapper",
              onClick: _cache[5] || (_cache[5] = (...args) => $options.goLyric && $options.goLyric(...args))
            },
            [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "image",
                  {
                    src: "/static/disk-back.png",
                    mode: "scaleToFill",
                    class: "disk",
                    style: vue.normalizeStyle($data.diskSize)
                  },
                  null,
                  4
                  /* STYLE */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "photo",
                  style: vue.normalizeStyle($data.photoWrapper)
                },
                [
                  vue.createElementVNode("image", {
                    src: $data.songData.diskSrc,
                    class: "disk-photo",
                    mode: "scaleToFill",
                    style: vue.normalizeStyle({
                      "borderRadius": "50%",
                      "animation": "spin 20s linear infinite",
                      "height": this.photoSize.height,
                      "width": this.photoSize.width,
                      "zIndex": 4,
                      "position": "absolute",
                      "animationPlayState": this.animationPlayState
                    })
                  }, null, 12, ["src"])
                ],
                4
                /* STYLE */
              )
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, !$data.isLyric]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            {
              class: "playInfo",
              onClick: _cache[6] || (_cache[6] = (...args) => $options.goLyric && $options.goLyric(...args))
            },
            [
              vue.createElementVNode("div", { style: { "margin-bottom": "15rpx" } }, [
                vue.createElementVNode(
                  "text",
                  { class: "songName" },
                  vue.toDisplayString($data.songData.songName) + "\\n",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("div", { style: { "margin-bottom": "15rpx" } }, [
                vue.createElementVNode(
                  "text",
                  { class: "artist" },
                  vue.toDisplayString($data.songData.artist) + "\\n",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("div", null, [
                vue.createElementVNode(
                  "text",
                  { class: "currentLyric" },
                  vue.toDisplayString($data.currentLyric),
                  1
                  /* TEXT */
                )
              ])
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, !$data.isLyric]
          ]),
          vue.withDirectives(vue.createElementVNode(
            "view",
            {
              onClick: _cache[7] || (_cache[7] = (...args) => $options.goDisk && $options.goDisk(...args)),
              class: "lyricWrapper"
            },
            [
              vue.createElementVNode("scroll-view", {
                class: "musicLyric",
                "scroll-y": "true",
                "scroll-top": $data.top,
                "enable-flex": "true"
              }, [
                vue.createElementVNode("view", { class: "test" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($data.lyric, (item) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: item,
                          class: vue.normalizeClass([$data.currentT >= item.timer && $data.currentT <= item.pre ? "playLyric" : "lyric"])
                        },
                        vue.toDisplayString(item.lrc) + "\\n ",
                        3
                        /* TEXT, CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ], 8, ["scroll-top"])
            ],
            512
            /* NEED_PATCH */
          ), [
            [vue.vShow, $data.isLyric]
          ]),
          vue.createElementVNode("view", { class: "progress" }, [
            vue.createElementVNode("view", { class: "slider" }, [
              vue.createElementVNode("slider", {
                "block-size": "12",
                "block-color": "rgba(255,255,255,0.8)",
                activeColor: "rgba(255,255,255,0.8)",
                backgroundColor: "rgba(255,255,255,0.4)",
                max: "1",
                step: "0.001",
                onChange: _cache[8] || (_cache[8] = (...args) => $options.changeTime && $options.changeTime(...args)),
                onChanging: _cache[9] || (_cache[9] = (...args) => _ctx.changing && _ctx.changing(...args)),
                value: $data.current
              }, null, 40, ["value"])
            ]),
            vue.createElementVNode("view", { class: "timeInfo" }, [
              vue.createElementVNode(
                "text",
                { style: { "color": "rgba(256,256,256,.7)" } },
                vue.toDisplayString($data.currentTime),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "text",
                { style: { "color": "rgba(256,256,256,.7)" } },
                vue.toDisplayString($data.durationTime),
                1
                /* TEXT */
              )
            ])
          ]),
          vue.createElementVNode("view", { class: "controll-button" }, [
            vue.createCommentVNode('\r\n				<button class="circle-button" plain="true" @tap="goCircle">\r\n					<image :src="circleButton" mode="scaleToFill" style="height: 100rpx;width: 100rpx;"></image>\r\n				</button>'),
            vue.createElementVNode("image", {
              src: $data.circleButton,
              mode: "scaleToFill",
              onClick: _cache[10] || (_cache[10] = (...args) => $options.goCircle && $options.goCircle(...args)),
              style: { "height": "75rpx", "width": "75rpx", "margin-left": "35rpx" }
            }, null, 8, ["src"]),
            vue.createElementVNode("view", { class: "playButtons" }, [
              vue.createElementVNode("image", {
                src: "/static/last.png",
                mode: "scaleToFill",
                onClick: _cache[11] || (_cache[11] = (...args) => $options.goLast && $options.goLast(...args)),
                style: { "height": "100rpx", "width": "100rpx" }
              }),
              vue.createElementVNode("button", {
                class: "play-button",
                plain: "true",
                onClick: _cache[12] || (_cache[12] = (...args) => $options.play && $options.play(...args))
              }, [
                vue.createElementVNode("image", {
                  src: $data.playButton,
                  mode: "scaleToFill",
                  style: { "height": "150rpx", "width": "150rpx" }
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("image", {
                src: "/static/next.png",
                mode: "scaleToFill",
                onClick: _cache[13] || (_cache[13] = (...args) => $options.goNext && $options.goNext(...args)),
                style: { "height": "100rpx", "width": "100rpx" }
              })
            ]),
            vue.createElementVNode("image", {
              src: "/static/list.png",
              onClick: _cache[14] || (_cache[14] = (...args) => $options.goPop && $options.goPop(...args)),
              mode: "scaleToFill",
              style: { "height": "75rpx", "width": "75rpx", "margin-right": "35rpx" }
            }),
            vue.createCommentVNode('\r\n				<button class="more-button" plain="true" @tap="goPop">\r\n					<image src="../../static/report.png" mode="scaleToFill" style="height: 100rpx;width: 100rpx;"></image>\r\n				</button>')
          ]),
          vue.createCommentVNode("\r\n			")
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/player.vue"]]);
  const _sfc_main$4 = {
    props: ["searchRecord", "accountInfo"],
    data() {
      return {
        songName: "The Detective",
        artist: "王若琳",
        diskSrc: "https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg",
        searchTime: "2024/05/13"
      };
    },
    methods: {
      goPlay() {
        formatAppLog("log", "at pages/conponents/record.vue:23", this.accountInfo);
        formatAppLog("log", "at pages/conponents/record.vue:24", "goPlay! ");
        uni.request({
          url: "http://110.41.35.178:8081/song",
          method: "GET",
          data: {
            songName: this.searchRecord.songName
          },
          success: (res) => {
            formatAppLog("log", "at pages/conponents/record.vue:32", res.data);
            var songData = JSON.stringify(res.data);
            var accountInfo = JSON.stringify(this.accountInfo);
            uni.navigateTo({
              url: "./player?songData=" + encodeURIComponent(songData) + "&accountInfo=" + encodeURIComponent(accountInfo)
            });
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "single",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.goPlay && $options.goPlay(...args))
    }, [
      vue.createElementVNode("image", {
        src: $props.searchRecord.diskSrc,
        class: "disk"
      }, null, 8, ["src"]),
      vue.createElementVNode(
        "text",
        { class: "title" },
        vue.toDisplayString($props.searchRecord.songName),
        1
        /* TEXT */
      ),
      vue.createElementVNode(
        "text",
        { class: "subtitle" },
        vue.toDisplayString($props.searchRecord.artist),
        1
        /* TEXT */
      ),
      vue.createElementVNode(
        "text",
        { class: "time" },
        vue.toDisplayString($props.searchRecord.searchTime),
        1
        /* TEXT */
      )
    ]);
  }
  const PagesConponentsRecord = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/conponents/record.vue"]]);
  const _sfc_main$3 = {
    components: {
      record: PagesConponentsRecord
    },
    onLoad(option) {
      let data = JSON.parse(decodeURIComponent(option.history));
      let data1 = JSON.parse(decodeURIComponent(option.accountInfo));
      this.history = data;
      this.accountInfo = data1;
      formatAppLog("log", "at pages/searchHistory.vue:29", this.accountInfo);
    },
    data() {
      return {
        accountInfo: {
          account: "",
          password: ""
        },
        history: [
          {
            songName: "The Detective",
            artist: "王若琳",
            diskSrc: "https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg",
            searchTime: "2024/05/13"
          },
          {
            songName: "The Detective",
            artist: "椎名林檎",
            diskSrc: "https://p3.music.126.net/Q2Vm_U6FeWsgdWsvaQHSfw==/109951169530900886.jpg",
            searchTime: "2024/05/13"
          }
        ]
      };
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
          //返回层数，2则上上页
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_record = vue.resolveComponent("record");
    return vue.openBlock(), vue.createElementBlock("view", { class: "bg" }, [
      vue.createElementVNode("view", { class: "ss" }, [
        vue.createElementVNode("text", { class: "bb" }, "历史搜索记录"),
        vue.createElementVNode("image", {
          src: "/static/backTo1.png",
          class: "backTo",
          mode: "scaleToFill",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args))
        })
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "true",
        class: "scroll"
      }, [
        vue.createElementVNode("view", { style: { "display": "flex", "flex-direction": "column", "align-items": "center" } }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.history, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("view", null, [
                vue.createVNode(_component_record, {
                  searchRecord: item,
                  accountInfo: $data.accountInfo
                }, null, 8, ["searchRecord", "accountInfo"])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ])
    ]);
  }
  const PagesSearchHistory = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/searchHistory.vue"]]);
  const recorderManager = uni.getRecorderManager();
  let that = null;
  const _sfc_main$2 = {
    onLoad(option) {
      that = this;
      let data = JSON.parse(decodeURIComponent(option.accountInfo));
      this.accountInfo = data;
      formatAppLog("log", "at pages/send.vue:65", this.accountInfo);
      let result = this.getData();
      this.h = result.h;
      this.w = result.w;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/send.vue:70", "recorder stop" + JSON.stringify(res));
        that.voicePath = res.tempFilePath;
        that.text = "";
        formatAppLog("log", "at pages/send.vue:73", that.voicePath);
        that.isWaiting = true;
        that.pathToBase64App(res.tempFilePath);
      });
    },
    data() {
      return {
        text: "",
        h: "",
        w: "",
        src: "",
        isPop: false,
        isWaiting: false,
        buttonSrc: "../../static/record.png",
        isRecord: false,
        cssPlay: "wavemove 4s infinite linear",
        isWave1: "paused",
        isWave2: "paused",
        playTime: "4s",
        testPath: "../../static/Irises.mp3",
        voicePath: "",
        filePath: "",
        songInfo: {
          song: {
            songName: "",
            artist: "",
            songSrc: "",
            diskSrc: "",
            lyric: "111"
          },
          isFind: "",
          isUpload: ""
        },
        accountInfo: {
          account: "test",
          password: "123456"
        }
      };
    },
    methods: {
      Send() {
        that.text = "";
        uni.uploadFile({
          url: "http://110.41.35.178:8081/testfile",
          filePath: "../../static/Irises.mp3",
          name: "record",
          success: (uploadFileRes) => {
            uploadFileRes = JSON.parse(uploadFileRes.data);
            formatAppLog("log", "at pages/send.vue:123", uploadFileRes);
            that.text = uploadFileRes.song.songName;
          },
          fail: (err) => {
            formatAppLog("log", "at pages/send.vue:127", err);
          }
        });
      },
      comfirm() {
        this.isPop = false;
      },
      goHistory() {
        formatAppLog("log", "at pages/send.vue:135", "history!");
        uni.request({
          url: "http://110.41.35.178:8081/history",
          method: "GET",
          data: {
            account: that.accountInfo.account
          },
          success: (res) => {
            formatAppLog("log", "at pages/send.vue:143", res.data);
            var history = JSON.stringify(res.data);
            var accountInfo = JSON.stringify(that.accountInfo);
            uni.navigateTo({
              url: "./searchHistory?history=" + encodeURIComponent(history) + "&accountInfo=" + encodeURIComponent(accountInfo)
            });
          }
        });
      },
      getData() {
        var result = { w: 0, h: 0 };
        uni.getSystemInfo({
          success: function(res) {
            formatAppLog("log", "at pages/send.vue:156", res);
            result.h = res.windowHeight;
            result.w = res.windowWidth;
          }
        });
        formatAppLog("log", "at pages/send.vue:161", result);
        return result;
      },
      startRecord() {
        if (this.isRecord == false) {
          recorderManager.start();
          this.isRecord = true;
          this.playTime = "4s";
          this.isWave1 = "running";
          this.cssPlay = "wavemove 4s infinite linear";
          this.buttonSrc = "../../static/24gf-pause2 (1).png";
          setTimeout(() => {
            this.isWave2 = "running";
          }, 2e3);
          formatAppLog("log", "at pages/send.vue:176", "开始录音");
        } else {
          recorderManager.stop();
          this.isRecord = false;
          this.playTime = "0s";
          this.buttonSrc = "../../static/record.png";
        }
      },
      pathToBase64App(path) {
        let self = this;
        formatAppLog("log", "at pages/send.vue:187", path);
        plus.io.resolveLocalFileSystemURL(path, function(entry) {
          entry.file(function(file) {
            var fileReader = new plus.io.FileReader();
            fileReader.onload = function(evt) {
              that.filePath = evt.target.result;
              uni.request({
                url: "http://110.41.35.178:8081/upload",
                method: "POST",
                header: {
                  "content-type": "application/json"
                },
                data: {
                  record: that.filePath,
                  account: that.accountInfo.account
                },
                //此时的data传正常json形式就好
                success: (uploadFileRes) => {
                  formatAppLog("log", "at pages/send.vue:205", uploadFileRes.data);
                  self.isWaiting = false;
                  uploadFileRes = uploadFileRes.data;
                  self.songInfo = uploadFileRes;
                  if (self.songInfo.isFind == 1) {
                    var songData = JSON.stringify(uploadFileRes.song);
                    var accountInfo = JSON.stringify(that.accountInfo);
                    formatAppLog("log", "at pages/send.vue:212", songData);
                    uni.navigateTo({
                      url: "./player?songData=" + encodeURIComponent(songData) + "&accountInfo=" + encodeURIComponent(accountInfo)
                    });
                  } else if (self.songInfo.isFind == -1) {
                    self.isPop = true;
                  }
                },
                fail: (res) => {
                  self.test = res;
                }
              });
            };
            fileReader.onerror = function(error2) {
              formatAppLog("log", "at pages/send.vue:227", "failed: ", error2);
            };
            fileReader.readAsDataURL(file);
          }, function(error2) {
            formatAppLog("log", "at pages/send.vue:231", "failed: ", error2);
          });
        }, function(error2) {
          formatAppLog("log", "at pages/send.vue:234", "failed: ", error2);
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("div", { class: "bg-wrapper" }, [
          (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "image-bg",
            mode: "scaleToFill",
            src: "/static/back.png"
          }))
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "popup" },
          [
            vue.createElementVNode("view", { class: "popup-info" }, [
              vue.createElementVNode("view", { class: "info-header" }, [
                vue.createElementVNode("image", {
                  src: "/static/warning.png",
                  style: { "width": "90rpx", "height": "90rpx", "margin-right": "10rpx" },
                  mode: "scaleToFill"
                }),
                vue.createElementVNode("text", { style: { "font-size": "55rpx" } }, "搜索失败")
              ]),
              vue.createElementVNode("view", { style: { "margin-bottom": "30rpx" } }, [
                vue.createVNode(_component_uv_divider, {
                  text: "可  能  原  因",
                  lineColor: "#777",
                  textColor: "#777",
                  style: { "width": "400rpx" }
                }),
                vue.createElementVNode("text", { class: "hints" }, "• 录制时长过短\\n"),
                vue.createElementVNode("text", { class: "hints" }, "• 录制环境较为嘈杂\\n"),
                vue.createElementVNode("text", { class: "hints" }, "• 曲库暂未收录此歌\\n")
              ]),
              vue.createElementVNode("view", null, [
                vue.createElementVNode("button", {
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.comfirm && $options.comfirm(...args)),
                  style: { "height": "50rpx", "width": "120rpx", "font-size": "30rpx", "align-items": "center", "display": "flex", "flex-direction": "row" }
                }, "确定")
              ])
            ])
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.isPop]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "view",
          { class: "popup" },
          [
            vue.createElementVNode("image", {
              src: "/static/searching.png",
              style: { "width": "350rpx", "height": "350rpx" }
            })
          ],
          512
          /* NEED_PATCH */
        ), [
          [vue.vShow, $data.isWaiting]
        ]),
        vue.createElementVNode(
          "view",
          {
            class: "out",
            style: vue.normalizeStyle({ "height": this.h + "px" })
          },
          [
            vue.createElementVNode("view", {
              class: "record1",
              style: { "padding-left": "30rpx", "padding-top": "75rpx" }
            }, [
              vue.createElementVNode("view", {
                class: "history",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.goHistory && $options.goHistory(...args))
              }, [
                vue.createElementVNode("text", { style: { "color": "#B55F83", "font-size": "30rpx" } }, "历史记录")
              ])
            ]),
            vue.createElementVNode("view", { class: "record" }, [
              vue.createElementVNode("button", {
                class: "recordButton",
                onClick: _cache[2] || (_cache[2] = (...args) => $options.startRecord && $options.startRecord(...args)),
                plain: "true"
              }, [
                vue.createElementVNode("image", {
                  src: $data.buttonSrc,
                  style: { "height": "200rpx", "width": "200rpx" },
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode("view", { class: "circle1" }),
              vue.createElementVNode("view", { class: "circle2" }),
              vue.createElementVNode(
                "view",
                {
                  class: "wave",
                  style: vue.normalizeStyle({
                    "animation": $data.cssPlay,
                    "animation-play-state": $data.isWave1,
                    "animation-duration": $data.playTime
                  })
                },
                null,
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "wave",
                  style: vue.normalizeStyle({
                    "animation": $data.cssPlay,
                    "animation-play-state": $data.isWave2,
                    "animation-duration": $data.playTime
                  })
                },
                null,
                4
                /* STYLE */
              )
            ])
          ],
          4
          /* STYLE */
        )
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSend = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/send.vue"]]);
  const _sfc_main$1 = {
    components: {
      singleSong: PagesConponentsSingleSong
    },
    onLoad() {
      let res = this.getData();
      this.h = res.h;
      this.w = res.w;
    },
    data() {
      return {
        h: "",
        w: "",
        playList: [
          {
            songName: "雪国(Niigata)",
            artist: "· 椎名林檎"
          },
          {
            songName: "My Love Mine All Mine",
            artist: "· Mitski"
          },
          {
            songName: "雪国(Niigata)",
            artist: "· 椎名林檎"
          },
          {
            songName: "雪国(Niigata)",
            artist: "· 椎名林檎"
          }
        ]
      };
    },
    methods: {
      getData() {
        var result = { w: 0, h: 0 };
        uni.getSystemInfo({
          success: function(res) {
            formatAppLog("log", "at pages/listTest.vue:55", res);
            result.h = res.windowHeight;
            result.w = res.windowWidth;
          }
        });
        formatAppLog("log", "at pages/listTest.vue:60", result);
        return result;
      },
      goSong() {
        console.log();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uv_divider = resolveEasycom(vue.resolveDynamicComponent("uv-divider"), __easycom_0);
    const _component_singleSong = vue.resolveComponent("singleSong");
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "popup",
        style: vue.normalizeStyle({ "height": this.h + "px" })
      },
      [
        vue.createElementVNode("view", { class: "songList" }, [
          vue.createElementVNode("view", { class: "head" }, [
            vue.createElementVNode("text", { style: { "font-size": "45rpx" } }, "歌曲列表")
          ]),
          vue.createVNode(_component_uv_divider, {
            style: { "width": "750rpx" },
            "line-color": "#C0C0C0"
          }),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.playList, (item, i) => {
              return vue.openBlock(), vue.createElementBlock("view", { class: "List" }, [
                vue.createVNode(_component_singleSong, { songs: item }, null, 8, ["songs"])
              ]);
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ])
      ],
      4
      /* STYLE */
    );
  }
  const PagesListTest = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/workspace/HBuilderProjects/pack-test/pages/listTest.vue"]]);
  __definePage("pages/login", PagesLogin);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/player", PagesPlayer);
  __definePage("pages/searchHistory", PagesSearchHistory);
  __definePage("pages/conponents/record", PagesConponentsRecord);
  __definePage("pages/send", PagesSend);
  __definePage("pages/listTest", PagesListTest);
  __definePage("pages/conponents/singleSong", PagesConponentsSingleSong);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/workspace/HBuilderProjects/pack-test/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
