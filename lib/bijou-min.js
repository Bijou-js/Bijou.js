"use strict";

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.reduce-right.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let node = () => {
  if (isNode) throw new Error("You are using Node.js");
},
    isNode = !1;

isNode = "undefined" == typeof window || "undefined" == typeof document, isNode && console.warn("There is no document element in Node, some functions of bijou.js will not work. If you need these functions consider using a package like jsDom to recreate the document element.");
let _temp = {
  primesTo: e => {
    let t = Array.from({
      length: e - 1
    }).map((e, t) => t + 2),
        n = Math.floor(Math.sqrt(e));
    return Array.from({
      length: n - 1
    }).map((e, t) => t + 2).forEach(e => t = t.filter(t => t % e != 0 || t === e)), t;
  },
  async: e => {
    const t = new Worker(URL.createObjectURL(new Blob(["postMessage((".concat(e, ")());")]), {
      type: "application/javascript; charset=utf-8"
    }));
    return new Promise((e, n) => {
      t.onmessage = (_ref) => {
        let {
          data: n
        } = _ref;
        e(n), t.terminate();
      }, t.onerror = e => {
        n(e), t.terminate();
      };
    });
  },
  formatMilliseconds: e => {
    e < 0 && (e = -e);
    const t = {
      day: Math.floor(e / 864e5),
      hour: Math.floor(e / 36e5) % 24,
      minute: Math.floor(e / 6e4) % 60,
      second: Math.floor(e / 1e3) % 60,
      millisecond: Math.floor(e) % 1e3
    };
    return Object.entries(t).filter(e => 0 !== e[1]).map((_ref2) => {
      let [e, t] = _ref2;
      return "".concat(t, " ").concat(e).concat(1 !== t ? "s" : "");
    }).join(", ");
  },
  addStyles: (e, t) => (node(), Object.assign(e.style, t)),
  onOutsideClick: (e, t) => (node(), document.addEventListener("click", n => {
    e.contains(n.target) || t();
  }), t),
  onScrollStop: e => {
    let t;
    node(), window.addEventListener("scroll", n => {
      clearTimeout(t), t = setTimeout(() => {
        e(n);
      }, 150);
    }, !1);
  },
  copy: e => {
    node();
    const t = document.createElement("textarea");
    t.value = e, t.setAttribute("readonly", ""), t.style.position = "absolute", t.style.left = "-9999px", document.body.appendChild(t);
    const n = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0);
    return t.select(), document.execCommand("copy"), document.body.removeChild(t), n && (document.getSelection().removeAllRanges(), document.getSelection().addRange(n)), e;
  },
  throttle: (e, t) => {
    let n, r, o;
    return function () {
      const a = this,
            s = arguments;
      n ? (clearTimeout(r), r = setTimeout(function () {
        Date.now() - o >= t && (e.apply(a, s), o = Date.now());
      }, Math.max(t - (Date.now() - o), 0))) : (e.apply(a, s), o = Date.now(), n = !0);
    };
  },
  createElement: e => {
    node();
    const t = document.createElement("div");
    return t.innerHTML = e, t.firstElementChild;
  },
  browser: () => {
    node();
    var e = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
        t = "undefined" != typeof InstallTrigger,
        n = /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && window.safari.pushNotification).toString(),
        r = !!document.documentMode,
        o = !r && !!window.StyleMedia,
        a = !(!window.chrome || !window.chrome.webstore && !window.chrome.runtime),
        s = a && -1 != navigator.userAgent.indexOf("Edg"),
        i = (a || e) && !!window.CSS;
    return e ? "Opera" : t ? "Firefox" : n ? "Safari" : o ? "Edge" : r ? "Internet Explorer" : a ? "Chrome" : s ? "Edge Chromium" : i ? "Blink" : void 0;
  },
  notify: (e, t, n) => {
    node(), window.Notification ? "granted" === Notification.permission || Notification.requestPermission().then(function (e) {
      "granted" === e || console.log("User blocked notifications.");
    }).catch(function (e) {
      console.error(e);
    }) : console.log("Browser does not support notifications.");
  },
  dayName: function dayName(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en-US";
    return e.toLocaleDateString(t, {
      weekday: "long"
    });
  },
  jsonToCsv: function jsonToCsv(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";
    return [t.join(n), ...e.map(e => t.reduce((t, r) => "".concat(t).concat(t.length ? n : "", "\"").concat(e[r] ? e[r] : "", "\""), ""))].join("\n");
  },
  unionArrays: (e, t) => {
    for (var n = {}, r = e.length - 1; r >= 0; --r) n[e[r]] = e[r];

    for (r = t.length - 1; r >= 0; --r) n[t[r]] = t[r];

    var o = [];

    for (var a in n) n.hasOwnProperty(a) && o.push(n[a]);

    return o;
  },
  each: (e, t) => {
    for (let n = 0; n < e.length; n++) t(e[n], n, e);
  },
  mapObjectKeys: (e, t) => Array.isArray(e) ? e.map(e => _$.mapObjectKeys(e, t)) : "object" == typeof e ? Object.keys(e).reduce((n, r) => {
    const o = t(r),
          a = e[r];
    return n[o] = null !== a && "object" == typeof a ? _$.mapObjectKeys(a, t) : a, n;
  }, {}) : e,
  arrayToCSV: function arrayToCSV(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";
    return e.map(e => e.map(e => isNaN(e) ? "\"".concat(e.replace(/"/g, '""'), "\"") : e).join(t)).join("\n");
  },
  averageBy: (e, t) => e.map("function" == typeof t ? t : e => e[t]).reduce((e, t) => e + t, 0) / e.length,
  inView: e => {
    node();

    for (var t = e.offsetTop, n = e.offsetLeft, r = e.offsetWidth, o = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, n += e.offsetLeft;

    return t >= window.pageYOffset && n >= window.pageXOffset && t + o <= window.pageYOffset + window.innerHeight && n + r <= window.pageXOffset + window.innerWidth;
  },
  inPartialView: e => {
    node();

    for (var t = e.offsetTop, n = e.offsetLeft, r = e.offsetWidth, o = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, n += e.offsetLeft;

    return t < window.pageYOffset + window.innerHeight && n < window.pageXOffset + window.innerWidth && t + o > window.pageYOffset && n + r > window.pageXOffset;
  },
  serializeForm: e => (node(), Array.from(new FormData(e), e => e.map(encodeURIComponent).join("=")).join("&")),
  formToObject: e => (node(), Array.from(new FormData(e)).reduce((e, _ref3) => {
    let [t, n] = _ref3;
    return _objectSpread(_objectSpread({}, e), {}, {
      [t]: n
    });
  })),
  uuid: function uuid() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random();

    function t(t) {
      var n = (e.toString(16) + "000000000").substr(2, 8);
      return t ? "-" + n.substr(0, 4) + "-" + n.substr(4, 4) : n;
    }

    return "string" == typeof e && (e = _temp.hashString(e) / 1e16), t() + t(!0) + t(!0) + t();
  },
  escapeHTML: e => e.replace(/[&<>'"]/g, e => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[e] || e),
  unescapeHTML: e => e.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, e => ({
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&quot;": '"'
  })[e] || e),
  previousPage: () => (node(), document.referrer || window.location.href),
  replaceText: (e, t) => {
    node();

    for (var n, r = function () {
      for (var t, n = e, r = [], o = 0; o < n.length; o++) t = n[o].childNodes[0], n[o].hasChildNodes() && 3 == t.nodeType && r.push(t);

      return r;
    }(), o = 0, a = r.length; o < a; o++) n = r[o].nodeValue, r[o].nodeValue = t(n);

    return e;
  },
  timeFunction: function timeFunction(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_$ function timer";
    console.time(t), e(), console.timeEnd(t);
  },
  sortObj: e => Object.keys(e).sort().reduce(function (t, n) {
    return t[n] = e[n], t;
  }, {}),
  widows: e => {
    for (var t = e.split(" "), n = "", r = 0; r <= t.length - 1; r++) n += t[r], r == t.length - 2 ? n += "&nbsp;" : n += " ";

    return n;
  },
  randomColor: () => "#" + Math.floor(16777215 * Math.random()).toString(16),
  lightenColor: (e, t) => {
    var n = !1;
    "#" == e[0] && (e = e.slice(1), n = !0);
    var r = parseInt(e, 16),
        o = (r >> 16) + t;
    o > 255 ? o = 255 : o < 0 && (o = 0);
    var a = (r >> 8 & 255) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var s = (255 & r) + t;
    return s > 255 ? s = 255 : s < 0 && (s = 0), (n ? "#" : "") + (s | a << 8 | o << 16).toString(16);
  },
  lightOrDark: e => {
    var t, n, r, o;
    return e.match(/^rgb/) ? (t = (e = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], n = e[2], r = e[3]) : (t = (e = +("0x" + e.slice(1).replace(e.length < 5 && /./g, "$&$&"))) >> 16, n = e >> 8 & 255, r = 255 & e), (o = Math.sqrt(t * t * .299 + n * n * .587 + r * r * .114)) > 127.5 ? {
      lightOrDark: "light",
      hsp: o
    } : {
      lightOrDark: "dark",
      hsp: o
    };
  },
  compStyle: (e, t) => (node(), window.getComputedStyle(e).getPropertyValue(t)),
  rgbToHex: e => {
    let t = e.indexOf(",") > -1 ? "," : " ",
        n = (+(e = e.substr(4).split(")")[0].split(t))[0]).toString(16),
        r = (+e[1]).toString(16),
        o = (+e[2]).toString(16);
    return 1 == n.length && (n = "0" + n), 1 == r.length && (r = "0" + r), 1 == o.length && (o = "0" + o), "#" + n + r + o;
  },
  hexToRGB: e => {
    let t = !1,
        n = e.slice(e.startsWith("#") ? 1 : 0);
    return 3 === n.length ? n = [...n].map(e => e + e).join("") : 8 === n.length && (t = !0), n = parseInt(n, 16), "rgb" + (t ? "a" : "") + "(" + (n >>> (t ? 24 : 16)) + ", " + ((n & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)) + ", " + ((n & (t ? 65280 : 255)) >>> (t ? 8 : 0)) + (t ? ", " + (255 & n) : "") + ")";
  },
  querySelector: e => {
    node();
    var t = "";
    return function e(n) {
      if (n.getAttribute("id") && 1 === document.querySelectorAll("#".concat(n.getAttribute("id"))).length) return t = (t = (t = t.replace(/^/, " #" + n.getAttribute("id"))).replace(/\s/, "")).replace(/\s/g, " > ");
      if (document.body === n) return t = (t = (t = t.replace(/^/, " body")).replace(/\s/, "")).replace(/\s/g, " > ");

      if (n.getAttribute("class")) {
        var r = ".";
        r = (r = (r += n.getAttribute("class")).replace(/\s/g, ".")).replace(/^/g, " ");
        var o = "",
            a = n.parentNode.children;
        if (a.length < 2) return;

        for (var s = [], i = 0; i < a.length; i++) n.getAttribute("class") == a[i].getAttribute("class") && s.push(a[i]);

        if (s.length > 1) for (var l = 0; l < s.length; l++) if (n === s[l]) {
          o = ":nth-of-type(" + ++l + ")";
          break;
        }
        t = t.replace(/^/, r + o);
      } else {
        var u = n.nodeName;
        u = u.toLowerCase();
        var d = "";

        if ((a = n.parentNode.children).length > 2) {
          var c = [];

          for (i = 0; i < a.length; i++) n.nodeName == a[i].nodeName && c.push(a[i]);

          if (c.length > 1) for (l = 0; l < c.length; l++) if (n === c[l]) {
            d = ":nth-of-type(" + ++l + ")";
            break;
          }
        }

        t = t.replace(/^/, " " + u + d);
      }

      if (!n.parentNode) return t = (t = t.replace(/\s/g, " > ")).replace(/\s/, "");
      e(n.parentNode);
    }(e), t;
  },
  removeComments: e => {
    if ("object" == typeof e) {
      if (isNode) throw new Error("No document element! (You are probably using Node.js)");
      return e.innerHTML = e.innerHTML.replace(/<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g, ""), e;
    }

    if ("string" == typeof e) return e.replace(/<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g, "");
  },
  random: function random(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
    let r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.random();
    return n ? Math.floor(r * (t - e + 1) + e) : Math.random() * (t - e + 1) + e;
  },
  seedRandom: e => {
    var t = e += 1831565813;
    return t = Math.imul(t ^ t >>> 15, 1 | t), (((t ^= t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t >>> 14) >>> 0) / 4294967296;
  },
  uniqueArray: e => [...new Set(e)],
  formatNumber: e => e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
  spliceArrayBuffer: (e, t, n, r) => {
    var o = (r = r || !1) ? -1 : 1;
    r && ([t, n] = [n, t]), t = Math.floor(t), n = Math.floor(n) + o;

    for (var a = t, s = 0; a != n; a += o) s = 256 * s + e[a];

    return s;
  },
  unCamelCase: function unCamelCase(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3").replace(/^./, function (e) {
      return e.toUpperCase();
    });
  },
  parseHTML: function parseHTML(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "text/html";
    return new DOMParser().parseFromString(e, t);
  },
  syntaxHighlight: function syntaxHighlight(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "html";
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    node();
    let r = document.createElement("DIV");
    r.innerText = e;
    return function (e, t) {
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var r = t || "html",
          o = document.getElementById(e) || e,
          a = o.innerHTML,
          s = n.tagColor || "mediumblue",
          i = n.tagNameColor || "brown",
          l = n.attributeColor || "red",
          u = n.attributeValueColor || "mediumblue",
          d = n.commentColor || "green",
          c = n.cssSelectorColor || "brown",
          f = n.cssPropertyColor || "red",
          g = n.cssPropertyValueColor || "mediumblue",
          p = n.cssLimiterColor || "black",
          h = n.cssImportantColor || "red",
          m = n.jsColor || "black",
          b = n.jsKeywordColor || "mediumblue",
          w = n.jsStringColor || "brown",
          y = n.jsNumberColor || "red",
          A = n.jsPropertyColor || "black";

      function v(e, t, n, r, o) {
        for (var a, s, i = "", l = []; e.search(t) > -1;) a = e.search(t), -1 == (s = e.indexOf(n, a)) && (s = e.length), o ? (l.push(r(e.substring(a, s + n.length))), e = e.substring(0, a) + o + e.substr(s + n.length)) : (i += e.substring(0, a), i += r(e.substring(a, s + n.length)), e = e.substr(s + n.length));

        this.rest = i + e, this.arr = l;
      }

      function x(e) {
        for (var t, n, r, o = e, a = ""; o.search(/(\s|<br>)/) > -1;) t = o.search(/(\s|<br>)/), -1 == (n = o.indexOf("&gt;")) && (n = o.length), a += o.substring(0, t), a += O(o.substring(t, n)), o = o.substr(n);

        return "&gt;" == (r = "<span style=color:" + s + ">&lt;</span>" + (r = a + o).substring(4)).substr(r.length - 4, 4) && (r = r.substring(0, r.length - 4) + "<span style=color:" + s + ">&gt;</span>"), "<span style=color:" + i + ">" + r + "</span>";
      }

      function O(e) {
        for (var t, n, r, o, a, s = e, i = ""; s.indexOf("=") > -1;) n = -1, t = s.indexOf("="), r = s.indexOf("'", t), o = s.indexOf('"', t), (a = s.indexOf(" ", t + 2)) > -1 && (a < r || -1 == r) && (a < o || -1 == o) ? n = s.indexOf(" ", t) : o > -1 && (o < r || -1 == r) && (o < a || -1 == a) ? n = s.indexOf('"', s.indexOf('"', t) + 1) : r > -1 && (r < o || -1 == o) && (r < a || -1 == a) && (n = s.indexOf("'", s.indexOf("'", t) + 1)), (!n || -1 == n || n < t) && (n = s.length), i += s.substring(0, t), i += T(s.substring(t, n + 1)), s = s.substr(n + 1);

        return "<span style=color:" + l + ">" + i + s + "</span>";
      }

      function T(e) {
        return "<span style=color:" + u + ">" + e + "</span>";
      }

      function M(e) {
        return "<span style=color:" + d + ">" + e + "</span>";
      }

      function S(e) {
        var t,
            n,
            r,
            o,
            a,
            s,
            i,
            l = e,
            u = "";

        for (l = (r = new v(l, /\/\*/, "*/", M, "W3CSSCOMMENTPOS")).rest; l.search("{") > -1;) {
          for (t = l.search("{"), a = l.substr(t + 1), i = 1, s = 0, o = 0; o < a.length && ("{" == a.substr(o, 1) && (i++, s++), "}" == a.substr(o, 1) && i--, 0 != i); o++);

          for (0 != i && (s = 0), n = t, o = 0; o <= s; o++) n = l.indexOf("}", n + 1);

          -1 == n && (n = l.length), u += l.substring(0, t + 1), u += C(l.substring(t + 1, n)), l = l.substr(n);
        }

        for (l = (l = (l = u + l).replace(/{/g, "<span style=color:" + p + ">{</span>")).replace(/}/g, "<span style=color:" + p + ">}</span>"), o = 0; o < r.arr.length; o++) l = l.replace("W3CSSCOMMENTPOS", r.arr[o]);

        return "<span style=color:" + c + ">" + l + "</span>";
      }

      function C(e) {
        var t,
            n,
            r,
            o,
            a = e,
            s = "";
        if (a.indexOf("{") > -1) return S(a);

        for (; a.search(":") > -1;) {
          for (o = !0, r = t = a.search(":"); 1 == o;) o = !1, n = a.indexOf(";", r), "&nbsp;" == a.substring(n - 5, n + 1) && (o = !0, r = n + 1);

          -1 == n && (n = a.length), s += a.substring(0, t), s += $(a.substring(t, n + 1)), a = a.substr(n + 1);
        }

        return "<span style=color:" + f + ">" + s + a + "</span>";
      }

      function $(e) {
        var t,
            n = e,
            r = "";

        for (n = "<span style=color:" + p + ">:</span>" + n.substring(1); n.search(/!important/i) > -1;) t = n.search(/!important/i), r += n.substring(0, t), r += E(n.substring(t, t + 10)), n = n.substr(t + 10);

        return result = r + n, ";" == result.substr(result.length - 1, 1) && "&nbsp;" != result.substr(result.length - 6, 6) && "&lt;" != result.substr(result.length - 4, 4) && "&gt;" != result.substr(result.length - 4, 4) && "&amp;" != result.substr(result.length - 5, 5) && (result = result.substring(0, result.length - 1) + "<span style=color:" + p + ">;</span>"), "<span style=color:" + g + ">" + result + "</span>";
      }

      function E(e) {
        return "<span style=color:" + h + ";font-weight:bold;>" + e + "</span>";
      }

      function L(e) {
        var t,
            n,
            r,
            o,
            a,
            s,
            i,
            l,
            u,
            d,
            c = e,
            f = "",
            g = [],
            p = "";

        for (t = 0; t < c.length; t++) "\\" == (n = c.substr(t, 1)) && (g.push(c.substr(t, 2)), n = "W3JSESCAPE", t++), p += n;

        for (c = p, 1; r = H(c, "'", "'", N), o = H(c, '"', '"', N), a = H(c, /\/\*/, "*/", M), s = H(c, /\/\//, "<br>", M), l = R(c, I), i = D("js", c, F), d = P(c, j), -1 != Math.max(l[0], r[0], o[0], a[0], s[0], i[0], d[0]) && -1 != (u = k(l, r, o, a, s, i, d))[0];) u[0] > -1 && (f += c.substring(0, u[0]), f += u[2](c.substring(u[0], u[1])), c = c.substr(u[1]));

        for (c = f + c, t = 0; t < g.length; t++) c = c.replace("W3JSESCAPE", g[t]);

        return "<span style=color:" + m + ">" + c + "</span>";
      }

      function N(e) {
        return "<span style=color:" + w + ">" + e + "</span>";
      }

      function F(e) {
        return "<span style=color:" + b + ">" + e + "</span>";
      }

      function I(e) {
        return "<span style=color:" + y + ">" + e + "</span>";
      }

      function j(e) {
        return "<span style=color:" + A + ">" + e + "</span>";
      }

      function P(e, t) {
        var n,
            r,
            o,
            a,
            s = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
        if ((a = e.indexOf(".")) > -1) for (n = e.substr(a + 1), o = 0; o < n.length; o++) for (cc = n[o], r = 0; r < s.length; r++) if (cc.indexOf(s[r]) > -1) return [a + 1, o + a + 1, t];
        return [-1, -1, t];
      }

      function k() {
        var e,
            t = [];

        for (e = 0; e < arguments.length; e++) arguments[e][0] > -1 && (0 == t.length || arguments[e][0] < t[0]) && (t = arguments[e]);

        return 0 == t.length && (t = arguments[e]), t;
      }

      function D(e, t, n) {
        var r,
            o,
            a,
            s,
            i = -1,
            l = -1;

        for ("js" == e && (r = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"]), o = 0; o < r.length; o++) (a = t.indexOf(r[o])) > -1 && (s = /\W/g, t.substr(a + r[o].length, 1).match(s) && t.substr(a - 1, 1).match(s) && a > -1 && (-1 == i || a < i) && (l = (i = a) + r[o].length));

        return [i, l, n];
      }

      function H(e, t, n, r) {
        var o, a;
        return o = e.search(t), -1 == (a = e.indexOf(n, o + n.length)) && (a = e.length), [o, a + n.length, r];
      }

      function R(e, t) {
        var n,
            r,
            o,
            a,
            s,
            i = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="],
            l = 0;

        for (n = 0; n < e.length; n++) for (r = 0; r < i.length; r++) if ((o = e.substr(n, i[r].length)) == i[r]) {
          if ("-" == o && ("e" == e.substr(n - 1, 1) || "E" == e.substr(n - 1, 1))) continue;
          if (l < (a = n) && (s = e.substring(l, a), !isNaN(s))) return [l, a, t];
          l = n += i[r].length, n -= 1;
          break;
        }

        return [-1, -1, t];
      }

      o.style.fontFamily = n.fontFamily || "Consolas,'Courier New', monospace", r || (r = "html"), "html" == r && (a = function (e) {
        var t,
            n,
            r,
            o,
            a,
            s = e,
            i = "";
        t = new v(s, "&lt;!--", "--&gt;", M, "W3HTMLCOMMENTPOS"), s = t.rest;

        for (; s.indexOf("&lt;") > -1;) o = "", n = s.indexOf("&lt;"), "&LT;STYLE" == s.substr(n, 9).toUpperCase() && (o = "css"), "&LT;SCRIPT" == s.substr(n, 10).toUpperCase() && (o = "javascript"), -1 == (r = s.indexOf("&gt;", n)) && (r = s.length), i += s.substring(0, n), i += x(s.substring(n, r + 4)), s = s.substr(r + 4), "css" == o && (r = s.indexOf("&lt;/style&gt;")) > -1 && (i += S(s.substring(0, r)), s = s.substr(r)), "javascript" == o && (r = s.indexOf("&lt;/script&gt;")) > -1 && (i += L(s.substring(0, r)), s = s.substr(r));

        for (s = i + s, a = 0; a < t.arr.length; a++) s = s.replace("W3HTMLCOMMENTPOS", t.arr[a]);

        return s;
      }(a)), "css" == r && (a = S(a)), "js" == r && (a = L(a)), o.innerHTML = a;
    }(r, t, n), r.innerHTML;
  },
  composeFunction: function composeFunction() {
    for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
      e[_key] = arguments[_key];
    }

    return t => e.reduceRight((e, t) => t(e), t);
  },
  curryFunction: function curryFunction(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : e.length;

    for (var _len2 = arguments.length, n = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      n[_key2 - 2] = arguments[_key2];
    }

    return t <= n.length ? e(...n) : curry.bind(null, e, t, ...n);
  },
  mobileOrDesktop: () => (node(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "mobile" : "desktop"),
  removeTags: e => e.replace(/<[^>]*>/g, ""),
  camelCase: e => e.replace(/(?:^\w|[A-Z]|\b\w)/g, function (e, t) {
    return 0 === t ? e.toLowerCase() : e.toUpperCase();
  }).replace(/\s+/g, ""),
  scrambleString: e => {
    for (var t = e.split(""), n = t.length - 1; n > 0; n--) {
      var r = Math.floor(Math.random() * (n + 1)),
          o = t[n];
      t[n] = t[r], t[r] = o;
    }

    return t.join("");
  },
  drag: e => {
    var t, n, r, o;

    function a(e) {
      this.style.left = t + e.clientX - r + "px", this.style.top = n + e.clientY - o + "px";
    }

    return node(), e.addEventListener("mousedown", function (s) {
      var i = window.getComputedStyle(e);
      e.style.top = i.getPropertyValue("top"), e.style.left = i.getPropertyValue("left"), e.style.right = i.getPropertyValue("right"), e.style.bottom = i.getPropertyValue("bottom"), this.style.position = "absolute", t = this.offsetLeft, n = this.offsetTop, r = s.clientX, o = s.clientY, this.addEventListener("mousemove", a, !1), window.addEventListener("mouseup", function () {
        e.removeEventListener("mousemove", a, !1);
      }, !1);
    }, !1), e;
  },
  ease: {
    linear: e => e,
    easeInQuad: e => e * e,
    easeOutQuad: e => e * (2 - e),
    easeInOutQuad: e => e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1,
    easeInCubic: e => e * e * e,
    easeOutCubic: e => --e * e * e + 1,
    easeInOutCubic: e => e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
    easeInQuart: e => e * e * e * e,
    easeOutQuart: e => 1 - --e * e * e * e,
    easeInOutQuart: e => e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e,
    easeInQuint: e => e * e * e * e * e,
    easeOutQuint: e => 1 + --e * e * e * e * e,
    easeInOutQuint: e => e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
  },
  getJSON: (e, t) => {
    node(), fetch(e).then(e => e.json()).then(e => t(e)).catch(e => {
      throw new Error(e.stack);
    });
  },
  getHTML: (e, t) => {
    node(), fetch(e).then(e => e.text()).then(e => t(_$.parseHTML(e))).catch(e => {
      throw new Error(e.stack);
    });
  },
  shuffleArray: e => e.sort(() => Math.random() - .5),
  hashString: function hashString(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let n = 3735928559 ^ t,
        r = 1103547991 ^ t;

    for (let t, o = 0; o < e.length; o++) t = e.charCodeAt(o), n = Math.imul(n ^ t, 2654435761), r = Math.imul(r ^ t, 1597334677);

    return n = Math.imul(n ^ n >>> 16, 2246822507) ^ Math.imul(r ^ r >>> 13, 3266489909), r = Math.imul(r ^ r >>> 16, 2246822507) ^ Math.imul(n ^ n >>> 13, 3266489909), 4294967296 * (2097151 & r) + (n >>> 0);
  },
  blendColors: function blendColors(e, t) {
    let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;

    const r = (e, t, n) => e + n / 100 * (t - e),
          o = parseInt("".concat(e[1]).concat(e[2]), 16),
          a = parseInt("".concat(e[3]).concat(e[4]), 16),
          s = parseInt("".concat(e[5]).concat(e[6]), 16),
          i = parseInt("".concat(t[1]).concat(t[2]), 16),
          l = parseInt("".concat(t[3]).concat(t[4]), 16),
          u = parseInt("".concat(t[5]).concat(t[6]), 16);

    return ((e, t, n) => {
      let r = e.toString(16),
          o = t.toString(16),
          a = n.toString(16);

      for (; r.length < 2;) r = "0".concat(r);

      for (; o.length < 2;) o = "0".concat(o);

      for (; a.length < 2;) a = "0".concat(a);

      return "#".concat(r).concat(o).concat(a);
    })(Math.round(r(o, i, n)), Math.round(r(a, l, n)), Math.round(r(s, u, n)));
  },
  editDistance: (e, t) => {
    if (0 == e.length) return t.length;
    if (0 == t.length) return e.length;
    var n,
        r,
        o = [];

    for (n = 0; n <= t.length; n++) o[n] = [n];

    for (r = 0; r <= e.length; r++) o[0][r] = r;

    for (n = 1; n <= t.length; n++) for (r = 1; r <= e.length; r++) t.charAt(n - 1) == e.charAt(r - 1) ? o[n][r] = o[n - 1][r - 1] : o[n][r] = Math.min(o[n - 1][r - 1] + 1, Math.min(o[n][r - 1] + 1, o[n - 1][r] + 1));

    return o[t.length][e.length];
  },
  byteSize: e => new Blob([e]).size,
  elementSiblings: e => [...e.parentElement.children].filter(t => t != e),
  preloadImage: () => {
    for (var e = 0; e < arguments.length; e++) images[e] = new Image(), images[e].src = preload.arguments[e];
  },
  replaceMultiple: (e, t) => {
    var n = new RegExp(Object.keys(t).join("|"), "gi");
    return e = e.replace(n, function (e) {
      return mapObj[e];
    });
  },
  urlQuery: function urlQuery(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
    e = e.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null;
  },
  disableRightClick: e => (node(), e.oncontextmenu = !1),
  sanitize: (e, t, n) => {
    node();
    t = t || ["I", "P", "B", "BODY", "HTML", "DEL", "INS", "STRONG", "SMALL", "A", "IMG", "CITE", "FIGCAPTION", "ASIDE", "ARTICLE", "SUMMARY", "DETAILS", "NAV", "TD", "TH", "TABLE", "THEAD", "TBODY", "NAV", "SPAN", "BR", "CODE", "PRE", "BLOCKQUOTE", "EM", "HR", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "MAIN", "HEADER", "FOOTER", "SELECT", "COL", "AREA", "ADDRESS", "ABBR", "BDI", "BDO"];
    n = (n = n || [{
      attribute: "src",
      tags: "*",
      regex: /^(?:https|http|\/\/):/
    }, {
      attribute: "href",
      tags: "*",
      regex: /^(?!javascript:).+/
    }, {
      attribute: "width",
      tags: "*",
      regex: /^[0-9]+$/
    }, {
      attribute: "height",
      tags: "*",
      regex: /^[0-9]+$/
    }, {
      attribute: "id",
      tags: "*",
      regex: /^[a-zA-Z]+$/
    }, {
      attribute: "class",
      tags: "*",
      regex: /^[a-zA-Z ]+$/
    }, {
      attribute: "value",
      tags: ["INPUT", "TEXTAREA"],
      regex: /^.+$/
    }, {
      attribute: "checked",
      tags: ["INPUT"],
      regex: /^(?:true|false)+$/
    }, {
      attribute: "placeholder",
      tags: ["INPUT", "TEXTAREA"],
      regex: /^.+$/
    }, {
      attribute: "alt",
      tags: ["IMG", "AREA", "INPUT"],
      regex: /^[0-9a-zA-Z]+$/
    }, {
      attribute: "autofocus",
      tags: ["INPUT"],
      regex: /^(?:true|false)+$/
    }, {
      attribute: "for",
      tags: ["LABEL", "OUTPUT"],
      regex: /^[a-zA-Z0-9]+$/
    }]).map(e => {
      if ("string" == typeof e) return {
        attribute: e,
        tags: "*",
        regex: /^.+$/
      };
      let t = e;
      return e.hasOwnProperty("tags") || (t.tags = "*"), e.hasOwnProperty("regex") || (t.regex = /^.+$/), t;
    });
    var r = new DOMParser().parseFromString(e, "text/html"),
        o = r.querySelectorAll("*");

    for (let e = 0; e < o.length; e++) {
      const n = o[e];
      let r = s(n);

      for (let e = 0; e < r.length; e++) {
        a(n, r[e]) || n.removeAttribute(r[e]);
      }

      t.includes(n.tagName) || n.remove();
    }

    return r.documentElement.innerHTML;

    function a(e, t) {
      return n.filter(n => n.attribute === t && ("*" === n.tags || n.tags.includes(e.tagName)) && n.regex.test(e.getAttribute(t))).length > 0;
    }

    function s(e) {
      for (var t = 0, n = e.attributes, r = n.length, o = []; t < r; t++) o.push(n[t].nodeName);

      return o;
    }
  },
  inlineCSS: e => {
    node(), s = getComputedStyle(e);

    for (let t in s) {
      let n = t.replace(/\-([a-z])/g, e => e[1].toUpperCase());
      e.style[n] = s[t];
    }
  },
  saveBlob: function saveBlob(e) {
    let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "output.txt";
    node();
    var n = document.createElement("a");
    document.body.appendChild(n), n.style = "display: none";
    var r = window.URL.createObjectURL(e);
    n.href = r, n.download = t, n.click(), window.URL.revokeObjectURL(r);
  },
  clone: e => (node(), JSON.parse(JSON.stringify(e))),
  markdownToHTML: e => {
    var t = /\\([\\\|`*_{}\[\]()#+\-~])/g,
        n = /\n *&gt; *([^]*?)(?=(\n|$){2})/g,
        r = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,
        o = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,
        a = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,
        s = /.*\n/g,
        i = /\||(.*?[^\\])\|/g;

    function l(t, n) {
      e = e.replace(t, n);
    }

    function u(e, t) {
      return "<" + e + ">" + t + "</" + e + ">";
    }

    function d(e) {
      return e.replace(o, function (e, t, n, r, o, a, s, i, l, c) {
        return t + u(r ? l ? "strong" : "em" : o ? l ? "s" : "sub" : a ? "sup" : s ? "small" : i ? "big" : "code", d(c));
      });
    }

    function c(e) {
      return e.replace(t, "$1");
    }

    var f = [],
        g = 0;
    return e = "\n" + e + "\n", l(/</g, "&lt;"), l(/>/g, "&gt;"), l(/\t|\r|\uf8ff/g, "  "), e = function e(t) {
      return t.replace(n, function (t, n) {
        return u("blockquote", e(d(n.replace(/^ *&gt; */gm, ""))));
      });
    }(e), l(/^([*\-=_] *){3,}$/gm, "<hr/>"), e = function e(t) {
      return t.replace(r, function (t, n, r, o, a, s) {
        var i = u("li", d(s.split(RegExp("\n ?" + n + "(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +", "g")).map(e).join("</li><li>")));
        return "\n" + (r ? '<ol start="' + (o ? r + '">' : parseInt(r, 36) - 9 + '" style="list-style-type:' + (a ? "low" : "upp") + 'er-alpha">') + i + "</ol>" : u("ul", i));
      });
    }(e), l(/<\/(ol|ul)>\n\n<\1>/g, ""), l(/\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g, function (e, t, n, r, o) {
      return f[--g] = u("pre", u("code", r || o.replace(/^ {4}/gm, ""))), g + "";
    }), l(/((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g, function (e, t, n, r, o, a, s) {
      return f[--g] = s || (n ? o ? '<img src="' + o + '" alt="' + r + '"/>' : t : '<a href="' + o + '">' + c(d(r)) + "</a>"), g + "";
    }), l(/\n(( *\|.*?\| *\n)+)/g, function (e, t) {
      var n = t.match(a)[1];
      return "\n" + u("table", t.replace(s, function (e, t) {
        return e == n ? "" : u("tr", e.replace(i, function (e, r, o) {
          return o ? u(n && !t ? "th" : "td", c(d(r || ""))) : "";
        }));
      }));
    }), l(/(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g, function (e, t, n, r) {
      return t + u("h" + n.length, c(d(r)));
    }), l(/(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g, function (e, t) {
      return u("p", c(d(t)));
    }), l(/-\d+\uf8ff/g, function (e) {
      return f[parseInt(e)];
    }), e.trim();
  },
  animate: function animate(e, t, n, r) {
    let o = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 20;
    let a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : e => e;
    var s = e,
        i = Date.now();
    let l = setInterval(() => {
      s = a((Date.now() - i) / n) * (t - e) + e, r(s, a((Date.now() - i) / n));
    }, o);
    setTimeout(() => {
      clearInterval(l), r(t, 1);
    }, n);
  },
  requestInterval: function requestInterval(e, t) {
    node();

    var n = window.requestAnimationFrame || function (e) {
      window.setTimeout(e, 1e3 / 60);
    },
        r = new Date().getTime(),
        o = {};

    return o.value = n(function a() {
      o.value = n(a), new Date().getTime() - r >= t && (e.call(), r = new Date().getTime());
    }), o;
  },

  attributes(e) {
    node();

    for (var t, n = [], r = 0, o = e.attributes, a = o.length; r < a; r++) t = o[r], n.push({
      name: t.nodeName,
      value: t.nodeValue
    });

    return n;
  },

  loadScript: (e, t) => {
    node();
    var n = document.createElement("script");
    n.type = "text/javascript", n.readyState ? n.onreadystatechange = function () {
      "loaded" !== n.readyState && "complete" !== n.readyState || (n.onreadystatechange = null, t());
    } : n.onload = function () {
      t();
    }, n.src = e, document.getElementsByTagName("head")[0].appendChild(n);
  },
  memoize: e => {
    const t = new Map(),
          n = function n(_n) {
      return (t.has(_n) || t.set(_n, e.call(this, _n))) && t.get(_n);
    };

    return n.cache = t, n;
  },
  observeMutations: (e, t, n) => {
    const r = new MutationObserver(e => e.forEach(e => t(e)));
    return r.observe(e, Object.assign({
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
      characterData: !0,
      characterDataOldValue: !0,
      subtree: !0
    }, n)), r;
  },
  hub: () => ({
    hub: Object.create(null),

    emit(e, t) {
      (this.hub[e] || []).forEach(e => e(t));
    },

    on(e, t) {
      this.hub[e] || (this.hub[e] = []), this.hub[e].push(t);
    },

    off(e, t) {
      const n = (this.hub[e] || []).findIndex(e => e === t);
      n > -1 && this.hub[e].splice(n, 1), 0 === this.hub[e].length && delete this.hub[e];
    }

  }),
  isAsync: e => "[object AsyncFunction]" === Object.prototype.toString.call(e),
  imageToData: async (e, t) => {
    let n = await fetch(e).then(e => e.blob());
    t(await new Promise(e => {
      let t = new FileReader();
      t.onload = () => e(t.result), t.readAsDataURL(n);
    }));
  },
  context: () => {
    var e = document.createElement("UL");
    e.id = "contextMenu", document.body.appendChild(e);
    let t = document.createElement("STYLE");
    t.innerHTML = "#contextMenu {\n       pointer-events: none;\n       padding: 0;\n       opacity: 0;\n       transition: opacity .3s ease;\n       position: fixed;\n       padding-top: 3px;\n       padding-bottom: 3px;\n       max-height: 200px;\n       overflow-y: scroll;\n       overflow-x: hidden;\n       list-style: none;\n       z-index: 10000;\n       background: white;\n       color: #333;\n       font-family: sans-serif;\n       border-radius: 5px;\n       box-shadow: 2px 2px 5px #0004;\n       width: fit-content;\n       min-width: 50px;\n       max-width: 150px;\n     }\n     #contextMenu li {\n       transition: background-color .3s ease;\n       display: block;\n       min-width: 150px;\n       margin: 0;\n       padding: 10px;\n     }\n     #contextMenu li:hover {\n       background-color: #ddd;\n       cursor: pointer;\n     }\n     ", document.body.appendChild(t);
    var n = document.querySelectorAll("[contextmenu]");

    for (let t = 0; t < n.length; t++) window.addEventListener("contextmenu", t => {
      e.style.pointerEvents = "auto", t.preventDefault();
      let n = document.querySelectorAll("#".concat(t.target.closest("[contextmenu]").getAttribute("contextmenu"), " menuitem"));
      e.innerHTML = "";

      for (let t = 0; t < n.length; t++) {
        const r = n[t];
        e.innerHTML += "<li onclick=\"".concat(r.getAttribute("onclick"), "\">").concat(r.getAttribute("label"), "</li>");
      }

      console.log(e.innerHTML), e.style.top = "".concat(t.clientY, "px"), e.style.left = "".concat(t.clientX, "px"), e.style.opacity = 1;
    });
  },
  cookies: {
    setItem: function setItem(e, t) {
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e3;
      node();
      var r = "";

      if (n) {
        var o = new Date();
        o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), r = "; expires=" + o.toUTCString();
      }

      document.cookie = e + "=" + (t || "") + r + "; path=/";
    },
    getItem: e => {
      node();

      for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
        for (var o = n[r]; " " == o.charAt(0);) o = o.substring(1, o.length);

        if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
      }

      return null;
    },
    removeItem: e => {
      node(), document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  },
  regex: {
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    name: /^(?:[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?(?:[a-zA-Z]{1,})?)/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    link: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
    strongPassword: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    moderatePassword: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
    ipv4: /^ (([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2}| 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3 } ([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5]) $ /,
    ipv6: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
    ip: / ((^\s*((([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2} | 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3}([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5])) \s * $)| (^\s * ((([0 - 9A - Fa - f]{ 1, 4 }:) { 7 } ([0 - 9A - Fa - f]{ 1, 4 }|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 6 } (: [0 - 9A - Fa - f]{ 1, 4 }| ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 5 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 2 })|: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 4 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 3 })| ((: [0 - 9A - Fa - f]{ 1, 4 })?: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 3 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 4 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 2 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 2 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 5 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 3 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 1 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 6 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 4 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (: (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 7 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 5 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))) (%.+) ?\s * $)) /,
    socialSecurity: /^((?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|((?!219 09 9999|078 05 1120)(?!666|000|9\d{2})\d{3} (?!00)\d{2} (?!0{4})\d{4})|((?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4})$/,
    hex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    zipCode: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/,
    simplePhone: /^\+?[\d\s]{3,}$/,
    visaCredit: /^4[0–9]{12}(?:[0–9]{3})?$/,
    expressCredit: /^3[47][0–9]{13}$/,
    mastercardCredit: /^(?:5[1–5][0–9]{2}|222[1–9]|22[3–9][0–9]|2[3–6][0–9]{2}|27[01][0–9]|2720)[0–9]{12}$/,
    discoverCredit: /^6(?:011|5[0–9]{2})[0–9]{12}$/
  }
};
_temp = _temp.sortObj(_temp);
const _$ = _temp;
isNode && (module.exports = _temp);