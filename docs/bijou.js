let e = !1;
(e = 'undefined' == typeof window || 'undefined' == typeof document),
  e &&
    console.warn(
      'There is no document element in Node, some functions of bijou.js will not work. If you need these functions consider using a package like jsDom to recreate the document element.',
    );
let t = () => {
  if (e)
    throw new Error(
      'You are using Node.js, this function does not work in Node.js! Sorry!',
    );
};
export let animate = (e, t, r, n, o = 20, a = (e) => e) => {
  var l = e,
    i = Date.now();
  let s = setInterval(() => {
    (l = a((Date.now() - i) / r) * (t - e) + e),
      n(l, a((Date.now() - i) / r));
  }, o);
  setTimeout(() => {
    clearInterval(s), n(t, 1);
  }, r);
};
export let range = (e, t) =>
  Array(t - e + 1)
    .fill()
    .map((t, r) => e + r);
export let uuid = (e = Math.random()) => {
  function t(t) {
    var r = (e.toString(16) + '000000000').substr(2, 8);
    return t ? '-' + r.substr(0, 4) + '-' + r.substr(4, 4) : r;
  }
  return (
    'string' == typeof e && (e = r.hashString(e) / 1e16),
    t() + t(!0) + t(!0) + t()
  );
};
export let primesTo = (e) => {
  let t = Array.from({ length: e - 1 }).map((e, t) => t + 2),
    r = Math.floor(Math.sqrt(e));
  return (
    Array.from({ length: r - 1 })
      .map((e, t) => t + 2)
      .forEach((e) => (t = t.filter((t) => t % e != 0 || t === e))),
    t
  );
};
export let random = (e, t, r = !0, n = Math.random()) =>
  r
    ? Math.floor(n * (t - e + 1) + e)
    : Math.random() * (t - e + 1) + e;
export let seedRandom = (e) => {
  var t = (e += 1831565813);
  return (
    (t = Math.imul(t ^ (t >>> 15), 1 | t)),
    (((t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ (t >>> 14)) >>>
      0) /
      4294967296
  );
};
export let formatNumber = (e) =>
  e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
export let ease = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => e * (2 - e),
  easeInOutQuad: (e) => (e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => --e * e * e + 1,
  easeInOutCubic: (e) =>
    e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => 1 - --e * e * e * e,
  easeInOutQuart: (e) =>
    e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e,
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => 1 + --e * e * e * e * e,
  easeInOutQuint: (e) =>
    e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e,
};
export let dayName = (e = new Date(), t = 'en-US') =>
  e.toLocaleDateString(t, { weekday: 'long' });
export let formatMilliseconds = (e) => {
  (e = 'string' == typeof e ? +e : e) < 0 && (e = -e);
  const t = {
    century: Math.floor(e / 11448e8),
    year: Math.floor(e / 22896e6) % 50,
    day: Math.floor(e / 864e5) % 365,
    hour: Math.floor(e / 36e5) % 24,
    minute: Math.floor(e / 6e4) % 60,
    second: Math.floor(e / 1e3) % 60,
    millisecond: Math.floor(e) % 1e3,
  };
  return Object.entries(t)
    .filter((e) => 0 !== e[1])
    .map(([e, t]) => `${t} ${e}${1 !== t ? 's' : ''}`)
    .join(', ');
};
export let deburr = (e) =>
  e.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export let mobileOrDesktop = () => (
  t(),
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'mobile'
    : 'desktop'
);
export let removeTags = (e) => e.replace(/<[^>]*>/g, '');
export let speak = (e, t = 'en', r = 1, n = 1, o = 1, a = 1) => {
  var l = new SpeechSynthesisUtterance(),
    i = window.speechSynthesis.getVoices();
  let s = i.filter((e) => e['default']);
  (l.voice = n ? ('number' == typeof n ? i[n] : n) : s),
    (l.volume = r),
    (l.rate = a),
    (l.pitch = o),
    (l.text = e),
    (l.lang = t),
    speechSynthesis.speak(l);
};
export let widows = (e) => {
  for (var t = e.split(' '), r = '', n = 0; n <= t.length - 1; n++)
    (r += t[n]), n == t.length - 2 ? (r += '&nbsp;') : (r += ' ');
  return r;
};
export let unCamelCase = function (e) {
  return e
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    .replace(/^./, function (e) {
      return e.toUpperCase();
    });
};
export let syntaxHighlight = (e, r = 'html', n = {}) => {
  t();
  let o = document.createElement('DIV');
  o.innerText = e;
  return (
    ((e, t, r = {}) => {
      var n = t || 'html',
        o = document.getElementById(e) || e,
        a = o.innerHTML,
        l = r.tagColor || 'mediumblue',
        i = r.tagNameColor || 'brown',
        s = r.attributeColor || 'red',
        u = r.attributeValueColor || 'mediumblue',
        c = r.commentColor || 'green',
        p = r.cssSelectorColor || 'brown',
        d = r.cssPropertyColor || 'red',
        f = r.cssPropertyValueColor || 'mediumblue',
        g = r.cssLimiterColor || 'black',
        h = r.cssImportantColor || 'red',
        m = r.jsColor || 'black',
        b = r.jsKeywordColor || 'mediumblue',
        y = r.jsStringColor || 'brown',
        x = r.jsNumberColor || 'red',
        w = r.jsPropertyColor || 'black';
      function v(e, t, r, n, o) {
        for (var a, l, i = '', s = []; e.search(t) > -1; )
          (a = e.search(t)),
            -1 == (l = e.indexOf(r, a)) && (l = e.length),
            o
              ? (s.push(n(e.substring(a, l + r.length))),
                (e = e.substring(0, a) + o + e.substr(l + r.length)))
              : ((i += e.substring(0, a)),
                (i += n(e.substring(a, l + r.length))),
                (e = e.substr(l + r.length)));
        (this.rest = i + e), (this.arr = s);
      }
      function A(e) {
        for (var t, r, n, o = e, a = ''; o.search(/(\s|<br>)/) > -1; )
          (t = o.search(/(\s|<br>)/)),
            -1 == (r = o.indexOf('&gt;')) && (r = o.length),
            (a += o.substring(0, t)),
            (a += T(o.substring(t, r))),
            (o = o.substr(r));
        return (
          '&gt;' ==
            (n =
              '<span style=color:' +
              l +
              '>&lt;</span>' +
              (n = a + o).substring(4)).substr(n.length - 4, 4) &&
            (n =
              n.substring(0, n.length - 4) +
              '<span style=color:' +
              l +
              '>&gt;</span>'),
          '<span style=color:' + i + '>' + n + '</span>'
        );
      }
      function T(e) {
        for (var t, r, n, o, a, l = e, i = ''; l.indexOf('=') > -1; )
          (r = -1),
            (t = l.indexOf('=')),
            (n = l.indexOf("'", t)),
            (o = l.indexOf('"', t)),
            (a = l.indexOf(' ', t + 2)) > -1 &&
            (a < n || -1 == n) &&
            (a < o || -1 == o)
              ? (r = l.indexOf(' ', t))
              : o > -1 && (o < n || -1 == n) && (o < a || -1 == a)
              ? (r = l.indexOf('"', l.indexOf('"', t) + 1))
              : n > -1 &&
                (n < o || -1 == o) &&
                (n < a || -1 == a) &&
                (r = l.indexOf("'", l.indexOf("'", t) + 1)),
            (!r || -1 == r || r < t) && (r = l.length),
            (i += l.substring(0, t)),
            (i += S(l.substring(t, r + 1))),
            (l = l.substr(r + 1));
        return '<span style=color:' + s + '>' + i + l + '</span>';
      }
      function S(e) {
        return '<span style=color:' + u + '>' + e + '</span>';
      }
      function O(e) {
        return '<span style=color:' + c + '>' + e + '</span>';
      }
      function C(e) {
        var t,
          r,
          n,
          o,
          a,
          l,
          i,
          s = e,
          u = '';
        for (
          s = (n = new v(s, /\/\*/, '*/', O, 'W3CSSCOMMENTPOS')).rest;
          s.search('{') > -1;

        ) {
          for (
            t = s.search('{'),
              a = s.substr(t + 1),
              i = 1,
              l = 0,
              o = 0;
            o < a.length &&
            ('{' == a.substr(o, 1) && (i++, l++),
            '}' == a.substr(o, 1) && i--,
            0 != i);
            o++
          );
          for (0 != i && (l = 0), r = t, o = 0; o <= l; o++)
            r = s.indexOf('}', r + 1);
          -1 == r && (r = s.length),
            (u += s.substring(0, t + 1)),
            (u += M(s.substring(t + 1, r))),
            (s = s.substr(r));
        }
        for (
          s = (s = (s = u + s).replace(
            /{/g,
            '<span style=color:' + g + '>{</span>',
          )).replace(/}/g, '<span style=color:' + g + '>}</span>'),
            o = 0;
          o < n.arr.length;
          o++
        )
          s = s.replace('W3CSSCOMMENTPOS', n.arr[o]);
        return '<span style=color:' + p + '>' + s + '</span>';
      }
      function M(e) {
        var t,
          r,
          n,
          o,
          a = e,
          l = '';
        if (a.indexOf('{') > -1) return C(a);
        for (; a.search(':') > -1; ) {
          for (o = !0, n = t = a.search(':'); 1 == o; )
            (o = !1),
              (r = a.indexOf(';', n)),
              '&nbsp;' == a.substring(r - 5, r + 1) &&
                ((o = !0), (n = r + 1));
          -1 == r && (r = a.length),
            (l += a.substring(0, t)),
            (l += E(a.substring(t, r + 1))),
            (a = a.substr(r + 1));
        }
        return '<span style=color:' + d + '>' + l + a + '</span>';
      }
      function E(e) {
        var t,
          r = e,
          n = '';
        for (
          r = '<span style=color:' + g + '>:</span>' + r.substring(1);
          r.search(/!important/i) > -1;

        )
          (t = r.search(/!important/i)),
            (n += r.substring(0, t)),
            (n += $(r.substring(t, t + 10))),
            (r = r.substr(t + 10));
        return (
          (result = n + r),
          ';' == result.substr(result.length - 1, 1) &&
            '&nbsp;' != result.substr(result.length - 6, 6) &&
            '&lt;' != result.substr(result.length - 4, 4) &&
            '&gt;' != result.substr(result.length - 4, 4) &&
            '&amp;' != result.substr(result.length - 5, 5) &&
            (result =
              result.substring(0, result.length - 1) +
              '<span style=color:' +
              g +
              '>;</span>'),
          '<span style=color:' + f + '>' + result + '</span>'
        );
      }
      function $(e) {
        return (
          '<span style=color:' +
          h +
          ';font-weight:bold;>' +
          e +
          '</span>'
        );
      }
      function L(e) {
        var t,
          r,
          n,
          o,
          a,
          l,
          i,
          s,
          u,
          c,
          p = e,
          d = '',
          f = [],
          g = '';
        for (t = 0; t < p.length; t++)
          '\\' == (r = p.substr(t, 1)) &&
            (f.push(p.substr(t, 2)), (r = 'W3JSESCAPE'), t++),
            (g += r);
        for (
          p = g, 1;
          (n = D(p, "'", "'", N)),
            (o = D(p, '"', '"', N)),
            (a = D(p, /\/\*/, '*/', O)),
            (l = D(p, /\/\//, '<br>', O)),
            (s = R(p, F)),
            (i = P('js', p, j)),
            (c = I(p, k)),
            -1 !=
              Math.max(s[0], n[0], o[0], a[0], l[0], i[0], c[0]) &&
              -1 != (u = H(s, n, o, a, l, i, c))[0];

        )
          u[0] > -1 &&
            ((d += p.substring(0, u[0])),
            (d += u[2](p.substring(u[0], u[1]))),
            (p = p.substr(u[1])));
        for (p = d + p, t = 0; t < f.length; t++)
          p = p.replace('W3JSESCAPE', f[t]);
        return '<span style=color:' + m + '>' + p + '</span>';
      }
      function N(e) {
        return '<span style=color:' + y + '>' + e + '</span>';
      }
      function j(e) {
        return '<span style=color:' + b + '>' + e + '</span>';
      }
      function F(e) {
        return '<span style=color:' + x + '>' + e + '</span>';
      }
      function k(e) {
        return '<span style=color:' + w + '>' + e + '</span>';
      }
      function I(e, t) {
        var r,
          n,
          o,
          a,
          l = [
            '.',
            '<',
            ' ',
            ';',
            '(',
            '+',
            ')',
            '[',
            ']',
            ',',
            '&',
            ':',
            '{',
            '}',
            '/',
            '-',
            '*',
            '|',
            '%',
          ];
        if ((a = e.indexOf('.')) > -1)
          for (r = e.substr(a + 1), o = 0; o < r.length; o++)
            for (cc = r[o], n = 0; n < l.length; n++)
              if (cc.indexOf(l[n]) > -1) return [a + 1, o + a + 1, t];
        return [-1, -1, t];
      }
      function H() {
        var e,
          t = [];
        for (e = 0; e < arguments.length; e++)
          arguments[e][0] > -1 &&
            (0 == t.length || arguments[e][0] < t[0]) &&
            (t = arguments[e]);
        return 0 == t.length && (t = arguments[e]), t;
      }
      function P(e, t, r) {
        var n,
          o,
          a,
          l,
          i = -1,
          s = -1;
        for (
          'js' == e &&
            (n = [
              'abstract',
              'arguments',
              'boolean',
              'break',
              'byte',
              'case',
              'catch',
              'char',
              'class',
              'const',
              'continue',
              'debugger',
              'default',
              'delete',
              'do',
              'double',
              'else',
              'enum',
              'eval',
              'export',
              'extends',
              'false',
              'final',
              'finally',
              'float',
              'for',
              'function',
              'goto',
              'if',
              'implements',
              'import',
              'in',
              'instanceof',
              'int',
              'interface',
              'let',
              'long',
              'NaN',
              'native',
              'new',
              'null',
              'package',
              'private',
              'protected',
              'public',
              'return',
              'short',
              'static',
              'super',
              'switch',
              'synchronized',
              'this',
              'throw',
              'throws',
              'transient',
              'true',
              'try',
              'typeof',
              'var',
              'void',
              'volatile',
              'while',
              'with',
              'yield',
            ]),
            o = 0;
          o < n.length;
          o++
        )
          (a = t.indexOf(n[o])) > -1 &&
            ((l = /\W/g),
            t.substr(a + n[o].length, 1).match(l) &&
              t.substr(a - 1, 1).match(l) &&
              a > -1 &&
              (-1 == i || a < i) &&
              (s = (i = a) + n[o].length));
        return [i, s, r];
      }
      function D(e, t, r, n) {
        var o, a;
        return (
          (o = e.search(t)),
          -1 == (a = e.indexOf(r, o + r.length)) && (a = e.length),
          [o, a + r.length, n]
        );
      }
      function R(e, t) {
        var r,
          n,
          o,
          a,
          l,
          i = [
            '<br>',
            ' ',
            ';',
            '(',
            '+',
            ')',
            '[',
            ']',
            ',',
            '&',
            ':',
            '{',
            '}',
            '/',
            '-',
            '*',
            '|',
            '%',
            '=',
          ],
          s = 0;
        for (r = 0; r < e.length; r++)
          for (n = 0; n < i.length; n++)
            if ((o = e.substr(r, i[n].length)) == i[n]) {
              if (
                '-' == o &&
                ('e' == e.substr(r - 1, 1) ||
                  'E' == e.substr(r - 1, 1))
              )
                continue;
              if (s < (a = r) && ((l = e.substring(s, a)), !isNaN(l)))
                return [s, a, t];
              (s = r += i[n].length), (r -= 1);
              break;
            }
        return [-1, -1, t];
      }
      (o.style.fontFamily =
        r.fontFamily || "Consolas,'Courier New', monospace"),
        n || (n = 'html'),
        'html' == n &&
          (a = (function (e) {
            var t,
              r,
              n,
              o,
              a,
              l = e,
              i = '';
            (t = new v(
              l,
              '&lt;!--',
              '--&gt;',
              O,
              'W3HTMLCOMMENTPOS',
            )),
              (l = t.rest);
            for (; l.indexOf('&lt;') > -1; )
              (o = ''),
                (r = l.indexOf('&lt;')),
                '&LT;STYLE' == l.substr(r, 9).toUpperCase() &&
                  (o = 'css'),
                '&LT;SCRIPT' == l.substr(r, 10).toUpperCase() &&
                  (o = 'javascript'),
                -1 == (n = l.indexOf('&gt;', r)) && (n = l.length),
                (i += l.substring(0, r)),
                (i += A(l.substring(r, n + 4))),
                (l = l.substr(n + 4)),
                'css' == o &&
                  (n = l.indexOf('&lt;/style&gt;')) > -1 &&
                  ((i += C(l.substring(0, n))), (l = l.substr(n))),
                'javascript' == o &&
                  (n = l.indexOf('&lt;/script&gt;')) > -1 &&
                  ((i += L(l.substring(0, n))), (l = l.substr(n)));
            for (l = i + l, a = 0; a < t.arr.length; a++)
              l = l.replace('W3HTMLCOMMENTPOS', t.arr[a]);
            return l;
          })(a)),
        'css' == n && (a = C(a)),
        'js' == n && (a = L(a)),
        (o.innerHTML = a);
    })(o, r, n),
    o.innerHTML
  );
};
export let camelCase = (e) =>
  e
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (e, t) {
      return 0 === t ? e.toLowerCase() : e.toUpperCase();
    })
    .replace(/\s+/g, '');
export let scrambleString = (e) => {
  for (var t = e.split(''), r = t.length - 1; r > 0; r--) {
    var n = Math.floor(Math.random() * (r + 1)),
      o = t[r];
    (t[r] = t[n]), (t[n] = o);
  }
  return t.join('');
};
export let hashString = (e, t = 0) => {
  let r = 3735928559 ^ t,
    n = 1103547991 ^ t;
  for (let t, o = 0; o < e.length; o++)
    (t = e.charCodeAt(o)),
      (r = Math.imul(r ^ t, 2654435761)),
      (n = Math.imul(n ^ t, 1597334677));
  return (
    (r =
      Math.imul(r ^ (r >>> 16), 2246822507) ^
      Math.imul(n ^ (n >>> 13), 3266489909)),
    (n =
      Math.imul(n ^ (n >>> 16), 2246822507) ^
      Math.imul(r ^ (r >>> 13), 3266489909)),
    4294967296 * (2097151 & n) + (r >>> 0)
  );
};
export let editDistance = (e, t) => {
  if (0 == e.length) return t.length;
  if (0 == t.length) return e.length;
  var r,
    n,
    o = [];
  for (r = 0; r <= t.length; r++) o[r] = [r];
  for (n = 0; n <= e.length; n++) o[0][n] = n;
  for (r = 1; r <= t.length; r++)
    for (n = 1; n <= e.length; n++)
      t.charAt(r - 1) == e.charAt(n - 1)
        ? (o[r][n] = o[r - 1][n - 1])
        : (o[r][n] = Math.min(
            o[r - 1][n - 1] + 1,
            Math.min(o[r][n - 1] + 1, o[r - 1][n] + 1),
          ));
  return o[t.length][e.length];
};
export let byteSize = (e) => new Blob([e]).size;
export let replaceMultiple = (e, t) => {
  var r = new RegExp(Object.keys(t).join('|'), 'gi');
  return (e = e.replace(r, function (e) {
    return mapObj[e];
  }));
};
export let urlQuery = (e, t = window.location.href) => {
  e = e.replace(/[\[\]]/g, '\\$&');
  var r = new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);
  return r
    ? r[2]
      ? decodeURIComponent(r[2].replace(/\+/g, ' '))
      : ''
    : null;
};
export let sanitize = (e, r = undefined, n = undefined) => {
  t();
  r = r || [
    'I',
    'P',
    'B',
    'BODY',
    'HTML',
    'DEL',
    'INS',
    'STRONG',
    'SMALL',
    'A',
    'IMG',
    'CITE',
    'FIGCAPTION',
    'ASIDE',
    'ARTICLE',
    'SUMMARY',
    'DETAILS',
    'NAV',
    'TD',
    'TH',
    'TABLE',
    'THEAD',
    'TBODY',
    'NAV',
    'SPAN',
    'BR',
    'CODE',
    'PRE',
    'BLOCKQUOTE',
    'EM',
    'HR',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'DIV',
    'MAIN',
    'HEADER',
    'FOOTER',
    'SELECT',
    'COL',
    'AREA',
    'ADDRESS',
    'ABBR',
    'BDI',
    'BDO',
  ];
  n = (n = n || [
    { attribute: 'src', tags: '*', regex: /^(?:https|http|\/\/):/ },
    { attribute: 'href', tags: '*', regex: /^(?!javascript:).+/ },
    { attribute: 'width', tags: '*', regex: /^[0-9]+$/ },
    { attribute: 'height', tags: '*', regex: /^[0-9]+$/ },
    { attribute: 'id', tags: '*', regex: /^[a-zA-Z]+$/ },
    { attribute: 'class', tags: '*', regex: /^[a-zA-Z ]+$/ },
    {
      attribute: 'value',
      tags: ['INPUT', 'TEXTAREA'],
      regex: /^.+$/,
    },
    {
      attribute: 'checked',
      tags: ['INPUT'],
      regex: /^(?:true|false)+$/,
    },
    {
      attribute: 'placeholder',
      tags: ['INPUT', 'TEXTAREA'],
      regex: /^.+$/,
    },
    {
      attribute: 'alt',
      tags: ['IMG', 'AREA', 'INPUT'],
      regex: /^[0-9a-zA-Z]+$/,
    },
    {
      attribute: 'autofocus',
      tags: ['INPUT'],
      regex: /^(?:true|false)+$/,
    },
    {
      attribute: 'for',
      tags: ['LABEL', 'OUTPUT'],
      regex: /^[a-zA-Z0-9]+$/,
    },
  ]).map((e) => {
    if ('string' == typeof e)
      return { attribute: e, tags: '*', regex: /^.+$/ };
    let t = e;
    return (
      e.hasOwnProperty('tags') || (t.tags = '*'),
      e.hasOwnProperty('regex') || (t.regex = /^.+$/),
      t
    );
  });
  var o = new DOMParser().parseFromString(e, 'text/html'),
    a = o.querySelectorAll('*');
  for (let e = 0; e < a.length; e++) {
    const t = a[e];
    let n = i(t);
    for (let e = 0; e < n.length; e++) {
      l(t, n[e]) || t.removeAttribute(n[e]);
    }
    r.includes(t.tagName) || t.remove();
  }
  return o.documentElement.innerHTML;
  function l(e, t) {
    return (
      n.filter(
        (r) =>
          r.attribute === t &&
          ('*' === r.tags || r.tags.includes(e.tagName)) &&
          r.regex.test(e.getAttribute(t)),
      ).length > 0
    );
  }
  function i(e) {
    for (
      var t = 0, r = e.attributes, n = r.length, o = [];
      t < n;
      t++
    )
      o.push(r[t].nodeName);
    return o;
  }
};
export let markdownToHTML = (e) => {
  var t = /\\([\\\|`*_{}\[\]()#+\-~])/g,
    r = /\n *&gt; *([^]*?)(?=(\n|$){2})/g,
    n = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,
    o = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,
    a = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,
    l = /.*\n/g,
    i = /\||(.*?[^\\])\|/g;
  function s(t, r) {
    e = e.replace(t, r);
  }
  function u(e, t) {
    return '<' + e + '>' + t + '</' + e + '>';
  }
  function c(e) {
    return e.replace(o, function (e, t, r, n, o, a, l, i, s, p) {
      return (
        t +
        u(
          n
            ? s
              ? 'strong'
              : 'em'
            : o
            ? s
              ? 's'
              : 'sub'
            : a
            ? 'sup'
            : l
            ? 'small'
            : i
            ? 'big'
            : 'code',
          c(p),
        )
      );
    });
  }
  function p(e) {
    return e.replace(t, '$1');
  }
  var d = [],
    f = 0;
  return (
    (e = '\n' + e + '\n'),
    s(/</g, '&lt;'),
    s(/>/g, '&gt;'),
    s(/\t|\r|\uf8ff/g, '  '),
    (e = (function g(e) {
      return e.replace(r, function (e, t) {
        return u('blockquote', g(c(t.replace(/^ *&gt; */gm, ''))));
      });
    })(e)),
    s(/^([*\-=_] *){3,}$/gm, '<hr/>'),
    (e = (function h(e) {
      return e.replace(n, function (e, t, r, n, o, a) {
        var l = u(
          'li',
          c(
            a
              .split(
                RegExp(
                  '\n ?' + t + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +',
                  'g',
                ),
              )
              .map(h)
              .join('</li><li>'),
          ),
        );
        return (
          '\n' +
          (r
            ? '<ol start="' +
              (n
                ? r + '">'
                : parseInt(r, 36) -
                  9 +
                  '" style="list-style-type:' +
                  (o ? 'low' : 'upp') +
                  'er-alpha">') +
              l +
              '</ol>'
            : u('ul', l))
        );
      });
    })(e)),
    s(/<\/(ol|ul)>\n\n<\1>/g, ''),
    s(
      /\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g,
      function (e, t, r, n, o) {
        return (
          (d[--f] = u(
            'pre',
            u('code', n || o.replace(/^ {4}/gm, '')),
          )),
          f + ''
        );
      },
    ),
    s(
      /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g,
      function (e, t, r, n, o, a, l) {
        return (
          (d[--f] =
            l ||
            (r
              ? o
                ? '<img src="' + o + '" alt="' + n + '"/>'
                : t
              : '<a href="' + o + '">' + p(c(n)) + '</a>')),
          f + ''
        );
      },
    ),
    s(/\n(( *\|.*?\| *\n)+)/g, function (e, t) {
      var r = t.match(a)[1];
      return (
        '\n' +
        u(
          'table',
          t.replace(l, function (e, t) {
            return e == r
              ? ''
              : u(
                  'tr',
                  e.replace(i, function (e, n, o) {
                    return o
                      ? u(r && !t ? 'th' : 'td', p(c(n || '')))
                      : '';
                  }),
                );
          }),
        )
      );
    }),
    s(
      /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g,
      function (e, t, r, n) {
        return t + u('h' + r.length, p(c(n)));
      },
    ),
    s(/(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g, function (e, t) {
      return u('p', p(c(t)));
    }),
    s(/-\d+\uf8ff/g, function (e) {
      return d[parseInt(e)];
    }),
    e.trim()
  );
};
export let beautifyJS = (e, t) => {
  _$.loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.13.5/beautify.min.js',
    () => {
      t(js_beautify(e));
    },
  );
};
export let syllables = (e) => {
  var t = 0;
  (e = e.toLowerCase()).length > 3 &&
    'some' == e.substring(0, 4) &&
    ((e = e.replace('some', '')), t++);
  var r = (e = (e = e.replace(
    /(?:[^laeiouy]|ed|[^laeiouy]e)$/,
    '',
  )).replace(/^y/, '')).match(/[aeiouy]{1,2}/g);
  if ((console.log(r), r)) return r.length + t;
};
export let capitalize = (e) =>
  String.fromCodePoint(e.codePointAt(0)).toUpperCase() +
  e.slice(e.codePointAt(0) > 65535 ? 2 : 1);
export let replaceBetween = (e, t, r, n) =>
  e.substring(0, t) + n + e.substring(r);
export let escapeHTML = (e) =>
  e.replace(
    /[&<>'"]/g,
    (e) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[e] || e),
  );
export let unescapeHTML = (e) =>
  e.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (e) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      }[e] || e),
  );
export let previousPage = () => (
  t(), document.referrer || window.location.href
);
export let arrayDiff = (e, t) => {
  for (var r = [], n = [], o = 0; o < e.length; o++) r[e[o]] = !0;
  for (o = 0; o < t.length; o++)
    r[t[o]] ? delete r[t[o]] : (r[t[o]] = !0);
  for (var a in r) n.push(a);
  return n;
};
export let diff = function (e, t) {
  for (var r = [], n = undefined, o = 0; o < e.length; o++)
    e[o] != t[o] && n == undefined && (n = [o]),
      n != undefined &&
        e[o] == t[o] &&
        (n.push(o), r.push(n), (n = undefined));
  return n != undefined && (n.push(o), r.push(n)), r;
};
export let remove = (e, t) =>
  e.indexOf(t) > -1 ? e.splice(e.indexOf(t), 1) : e;
export let spliceArrayBuffer = (e, t, r, n) => {
  var o = (n = n || !1) ? -1 : 1;
  n && ([t, r] = [r, t]),
    (t = Math.floor(t)),
    (r = Math.floor(r) + o);
  for (var a = t, l = 0; a != r; a += o) l = 256 * l + e[a];
  return l;
};
export let flatten = (e, t = 1) => {
  var r = e;
  return (
    _$.each(t, () => {
      r = [].concat.apply([], e);
    }),
    r
  );
};
export let nFlatten = (e) =>
  e.reduce(function (e, t) {
    return e.concat(Array.isArray(t) ? flatten(t) : t);
  }, []);
export let contains = (e, t) => e.includes(t);
export let shuffleArray = (e) => e.sort(() => Math.random() - 0.5);
export let splice = (e, t, r, n = 0) =>
  'string' == typeof e
    ? e.slice(0, t) + r + e.slice(t + Math.abs(n))
    : e.splice(t, n, r);
export let unionArrays = (e, t) => {
  for (var r = {}, n = e.length - 1; n >= 0; --n) r[e[n]] = e[n];
  for (n = t.length - 1; n >= 0; --n) r[t[n]] = t[n];
  var o = [];
  for (var a in r) r.hasOwnProperty(a) && o.push(r[a]);
  return o;
};
export let averageBy = (e, t) =>
  e
    .map('function' == typeof t ? t : (e) => e[t])
    .reduce((e, t) => e + t, 0) / e.length;
export let uniqueArray = (e) => [...new Set(e)];
export let each = (e, t) => {
  e =
    'number' == typeof e
      ? _$.range(1, e)
      : 'string' == typeof e
      ? e.split('')
      : e;
  for (let r = 0; r < e.length; r++) t(e[r], r, e);
};
export let spread = (e) => (e) => {
  call_me.apply(this, e);
};
export let memoize = (e) => {
  let t = {};
  return function () {
    let r = JSON.stringify(Array.from(arguments)),
      n = Array.from(arguments);
    return t[r] || (t[r] = e(...n)), t[r];
  };
};
export let composeFunction = (...e) => (t) =>
  e.reduceRight((e, t) => t(e), t);
export let curryFunction = (e, t = e.length, ...r) =>
  t <= r.length ? e(...r) : curry.bind(null, e, t, ...r);
export let isAsync = (e) =>
  '[object AsyncFunction]' === Object.prototype.toString.call(e);
export let throttle = (e, t, r) => {
  var n,
    o,
    a,
    l = null,
    i = 0;
  r || (r = {});
  var s = function () {
    (i = !1 === r.leading ? 0 : Date.now()),
      (l = null),
      (a = e.apply(n, o)),
      l || (n = o = null);
  };
  return function () {
    var u = Date.now();
    i || !1 !== r.leading || (i = u);
    var c = t - (u - i);
    return (
      (n = this),
      (o = arguments),
      c <= 0 || c > t
        ? (l && (clearTimeout(l), (l = null)),
          (i = u),
          (a = e.apply(n, o)),
          l || (n = o = null))
        : l || !1 === r.trailing || (l = setTimeout(s, c)),
      a
    );
  };
};
export let debounce = (e, t, r = !1) => {
  var n;
  return function () {
    var o = this,
      a = arguments,
      l = r && !n;
    clearTimeout(n),
      (n = setTimeout(function () {
        (n = null), r || e.apply(o, a);
      }, t)),
      l && e.apply(o, a);
  };
};
export let runAsync = (e) => {
  const t = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${e})());`]), {
      type: 'application/javascript; charset=utf-8',
    }),
  );
  return new Promise((e, r) => {
    (t.onmessage = ({ data: r }) => {
      e(r), t.terminate();
    }),
      (t.onerror = (e) => {
        r(e), t.terminate();
      });
  });
};
export let clone = (e) => {
  if (null == e || 'object' != typeof e) return e;
  var t = e.constructor();
  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
  return t;
};
export let listen = (e, t, r) =>
  new Proxy(e, {
    set: function (e, r, n) {
      return t(r, n), (e[r] = n), e[r];
    },
    get: function (t, n, o) {
      return r(n, o), e[n];
    },
  });
export let merge = function o(e, t) {
  for (var r in t)
    try {
      t[r].constructor == Object
        ? (e[r] = o(e[r], t[r]))
        : (e[r] = t[r]);
    } catch (n) {
      e[r] = t[r];
    }
  return e;
};
export let mapObjectKeys = (e, t) =>
  Array.isArray(e)
    ? e.map((e) => _$.mapObjectKeys(e, t))
    : 'object' == typeof e
    ? Object.keys(e).reduce((r, n) => {
        const o = t(n),
          a = e[n];
        return (
          (r[o] =
            null !== a && 'object' == typeof a
              ? _$.mapObjectKeys(a, t)
              : a),
          r
        );
      }, {})
    : e;
export let mapObjectValues = (e, t) => (
  Object.keys(e).map(function (r, n) {
    e[r] = t(e[r], n);
  }),
  e
);
export let formToObject = (e) => (
  t(),
  Array.from(new FormData(e)).reduce((e, [t, r]) => ({
    ...e,
    [t]: r,
  }))
);
export let sortObj = (e) =>
  Object.keys(e)
    .sort()
    .reduce(function (t, r) {
      return (t[r] = e[r]), t;
    }, {});
export let context = () => {
  var e = document.createElement('UL');
  (e.id = 'contextMenu'), document.body.appendChild(e);
  let t = document.createElement('STYLE');
  (t.innerHTML =
    '#contextMenu {\n       pointer-events: none;\n       padding: 0;\n       opacity: 0;\n       transition: opacity .3s ease;\n       position: fixed;\n       padding-top: 3px;\n       padding-bottom: 3px;\n       max-height: 200px;\n       overflow-y: scroll;\n       overflow-x: hidden;\n       list-style: none;\n       z-index: 10000;\n       background: white;\n       color: #333;\n       font-family: sans-serif;\n       border-radius: 5px;\n       box-shadow: 2px 2px 5px #0004;\n       width: fit-content;\n       min-width: 50px;\n       max-width: 150px;\n     }\n     #contextMenu li {\n       transition: background-color .3s ease;\n       display: block;\n       min-width: 150px;\n       margin: 0;\n       padding: 10px;\n     }\n     #contextMenu li:hover {\n       background-color: #ddd;\n       cursor: pointer;\n     }\n     '),
    document.body.appendChild(t);
  var r = document.querySelectorAll('[contextmenu]');
  for (let t = 0; t < r.length; t++)
    window.addEventListener('contextmenu', (t) => {
      let r;
      e.style.pointerEvents = 'auto';
      try {
        (r = document.querySelectorAll(
          `#${t.target
            .closest('[contextmenu]')
            .getAttribute('contextmenu')} menuitem`,
        )),
          t.preventDefault();
      } catch (t) {
        return !0;
      }
      e.innerHTML = '';
      for (let t = 0; t < r.length; t++) {
        const n = r[t];
        e.innerHTML += `<li onclick="${n.getAttribute(
          'onclick',
        )}">${n.getAttribute('label')}</li>`;
      }
      console.log(e.innerHTML),
        (e.style.top = `${t.clientY}px`),
        (e.style.left = `${t.clientX}px`),
        (e.style.opacity = 1);
    });
  var n = 0;
  requestInterval(() => {
    if ((n += 100) > 3e3)
      return (
        (e.style.opacity = 0),
        (e.style.pointerEvents = 'none'),
        void (n = 0)
      );
  }, 100),
    addEventListeners(e, ['mousemove', 'click', 'scroll'], () => {
      n = 0;
    }),
    onOutsideClick(e, () => {
      (e.style.opacity = 0), (e.style.pointerEvents = 'none');
    });
};
export let inView = (e) => {
  t();
  for (
    var r = e.offsetTop,
      n = e.offsetLeft,
      o = e.offsetWidth,
      a = e.offsetHeight;
    e.offsetParent;

  )
    (r += (e = e.offsetParent).offsetTop), (n += e.offsetLeft);
  return (
    r >= window.pageYOffset &&
    n >= window.pageXOffset &&
    r + a <= window.pageYOffset + window.innerHeight &&
    n + o <= window.pageXOffset + window.innerWidth
  );
};
export let inPartialView = (e) => {
  t();
  for (
    var r = e.offsetTop,
      n = e.offsetLeft,
      o = e.offsetWidth,
      a = e.offsetHeight;
    e.offsetParent;

  )
    (r += (e = e.offsetParent).offsetTop), (n += e.offsetLeft);
  return (
    r < window.pageYOffset + window.innerHeight &&
    n < window.pageXOffset + window.innerWidth &&
    r + a > window.pageYOffset &&
    n + o > window.pageXOffset
  );
};
export let serializeForm = (e) => (
  t(),
  Array.from(new FormData(e), (e) =>
    e.map(encodeURIComponent).join('='),
  ).join('&')
);
export let replaceText = (e, r) => {
  t(),
    _$.each(_$.textNodes(e), (e) => {
      e.textContent = r(e.textContent);
    });
};
export let textNodes = (e) =>
  [...e.childNodes].filter(
    (e) => e.nodeType === Node.TEXT_NODE && '' !== e.nodeValue.trim(),
  );
export let querySelector = (e) => {
  t();
  var r = '';
  return (
    (function n(e) {
      if (
        e.getAttribute('id') &&
        1 ===
          document.querySelectorAll(`#${e.getAttribute('id')}`).length
      )
        return (r = (r = (r = r.replace(
          /^/,
          ' #' + e.getAttribute('id'),
        )).replace(/\s/, '')).replace(/\s/g, ' > '));
      if (document.body === e)
        return (r = (r = (r = r.replace(/^/, ' body')).replace(
          /\s/,
          '',
        )).replace(/\s/g, ' > '));
      if (e.getAttribute('class')) {
        var t = '.';
        t = (t = (t += e.getAttribute('class')).replace(
          /\s/g,
          '.',
        )).replace(/^/g, ' ');
        var o = '',
          a = e.parentNode.children;
        if (a.length < 2) return;
        for (var l = [], i = 0; i < a.length; i++)
          e.getAttribute('class') == a[i].getAttribute('class') &&
            l.push(a[i]);
        if (l.length > 1)
          for (var s = 0; s < l.length; s++)
            if (e === l[s]) {
              o = ':nth-of-type(' + ++s + ')';
              break;
            }
        r = r.replace(/^/, t + o);
      } else {
        var u = e.nodeName;
        u = u.toLowerCase();
        var c = '';
        if ((a = e.parentNode.children).length > 2) {
          var p = [];
          for (i = 0; i < a.length; i++)
            e.nodeName == a[i].nodeName && p.push(a[i]);
          if (p.length > 1)
            for (s = 0; s < p.length; s++)
              if (e === p[s]) {
                c = ':nth-of-type(' + ++s + ')';
                break;
              }
        }
        r = r.replace(/^/, ' ' + u + c);
      }
      if (!e.parentNode)
        return (r = (r = r.replace(/\s/g, ' > ')).replace(/\s/, ''));
      n(e.parentNode);
    })(e),
    r
  );
};
export let removeComments = (t) => {
  if ('object' == typeof t) {
    if (e)
      throw new Error(
        'No document element! (You are probably using Node.js)',
      );
    return (
      (t.innerHTML = t.innerHTML.replace(
        /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
        '',
      )),
      t
    );
  }
  if ('string' == typeof t)
    return t.replace(
      /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
      '',
    );
};
export let parseHTML = (e, t = 'text/html') =>
  new DOMParser().parseFromString(e, t);
export let drag = (e) => {
  var r, n, o, a;
  function l(e) {
    (this.style.left = r + e.clientX - o + 'px'),
      (this.style.top = n + e.clientY - a + 'px');
  }
  return (
    t(),
    e.addEventListener(
      'mousedown',
      function (t) {
        var i = window.getComputedStyle(e);
        (e.style.top = i.getPropertyValue('top')),
          (e.style.left = i.getPropertyValue('left')),
          (e.style.right = i.getPropertyValue('right')),
          (e.style.bottom = i.getPropertyValue('bottom')),
          (this.style.position = 'absolute'),
          (r = this.offsetLeft),
          (n = this.offsetTop),
          (o = t.clientX),
          (a = t.clientY),
          this.addEventListener('mousemove', l, !1),
          window.addEventListener(
            'mouseup',
            function () {
              e.removeEventListener('mousemove', l, !1);
            },
            !1,
          );
      },
      !1,
    ),
    e
  );
};
export let addEventListeners = (e, t, r = {}, n = !1, o = !1) => {
  if (!(t instanceof Array))
    throw 'addMultipleListeners: please supply an array of eventstrings (like ["click","mouseover"])';
  for (
    var a = function (e) {
        r.apply(this, o && o instanceof Array ? o : []);
      },
      l = 0;
    l < t.length;
    l += 1
  )
    e.addEventListener(t[l], a, n);
};
export let sortTable = (e) => {
  var t = function (e, t) {
    return e.children[t].innerText || e.children[t].textContent;
  };
  Array.prototype.slice
    .call(e.querySelectorAll('th'))
    .forEach(function (e) {
      e.addEventListener('click', function () {
        for (
          var r, n, o = e.parentNode;
          'TABLE' != o.tagName.toUpperCase();

        )
          o = o.parentNode;
        Array.prototype.slice
          .call(o.querySelectorAll('tr:nth-child(n+2)'))
          .sort(
            ((r = Array.prototype.slice
              .call(e.parentNode.children)
              .indexOf(e)),
            (n = this.asc = !this.asc),
            function (e, o) {
              return (
                (a = t(n ? e : o, r)),
                (l = t(n ? o : e, r)),
                '' === a || '' === l || isNaN(a) || isNaN(l)
                  ? a.toString().localeCompare(l)
                  : a - l
              );
              var a, l;
            }),
          )
          .forEach(function (e) {
            o.appendChild(e);
          });
      });
    });
};
export let sortTableBy = (e, t) => {
  for (
    var r,
      n,
      o = function (e, t) {
        return e.children[t].innerText || e.children[t].textContent;
      },
      a = e.parentNode;
    'TABLE' != a.tagName.toUpperCase();

  )
    a = a.parentNode;
  Array.prototype.slice
    .call(a.querySelectorAll('tr:nth-child(n+2)'))
    .sort(
      ((r = Array.prototype.slice
        .call(e.parentNode.children)
        .indexOf(e)),
      (n = t),
      function (e, t) {
        return (
          (a = o(n ? e : t, r)),
          (l = o(n ? t : e, r)),
          '' === a || '' === l || isNaN(a) || isNaN(l)
            ? a.toString().localeCompare(l)
            : a - l
        );
        var a, l;
      }),
    )
    .forEach(function (e) {
      a.appendChild(e);
    });
};
export let addStyles = (e, r) => (t(), Object.assign(e.style, r));
export let createElement = (e) => {
  t();
  const r = document.createElement('div');
  return (r.innerHTML = e), r.firstElementChild;
};
export let compStyle = (e, r) => (
  t(), window.getComputedStyle(e).getPropertyValue(r)
);
export let elementSiblings = (e) =>
  [...e.parentElement.children].filter((t) => t != e);
export let disableRightClick = (e) => (t(), (e.oncontextmenu = !1));
export let inlineCSS = (e) => {
  var t,
    r = getComputedStyle(e, null);
  for (t = 0; t < r.length; t++) {
    var n = r[t] + '';
    e.style[n] = r[n];
  }
};
export let attributes = (e) => {
  t();
  for (
    var r, n = [], o = 0, a = e.attributes, l = a.length;
    o < l;
    o++
  )
    (r = a[o]), n.push({ name: r.nodeName, value: r.nodeValue });
  return n;
};
export let observeMutations = (e, t, r) => {
  const n = new MutationObserver((e) => e.forEach((e) => t(e)));
  return (
    n.observe(
      e,
      Object.assign(
        {
          childList: !0,
          attributes: !0,
          attributeOldValue: !0,
          characterData: !0,
          characterDataOldValue: !0,
          subtree: !0,
        },
        r,
      ),
    ),
    n
  );
};
export let tilt = (e, t, r, n = 500, o = 30) => {
  e.style.transform = `perspective(${n}px) scale(1.1) rotateX(${
    -1 * o * ((r - e.clientHeight / 2) / e.clientHeight)
  }deg) rotateY(${o * ((t - e.clientWidth / 2) / e.clientWidth)}deg)`;
};
export let fullScreen = (e) =>
  e.requestFullScreen ||
  e.mozRequestFullScreen ||
  e.webkitRequestFullScreen() ||
  new Error('Fullscreen failed');
export let replaceSelection = (e) => {
  var t, r;
  if (window.getSelection) {
    if ((t = window.getSelection()).rangeCount) {
      (r = t.getRangeAt(0)).deleteContents();
      let n = document.createElement('span');
      n.insertAdjacentHTML('beforeend', e), r.insertNode(n);
    }
  } else
    document.selection &&
      document.selection.createRange &&
      (console.warn(
        'You are using IE < 9, you are evil. Falling back to text not HTML.',
      ),
      ((r = document.selection.createRange()).text = e.replace(
        /<[^>]*>/g,
        '',
      )));
};
export let onOutsideClick = (e, r) => (
  t(),
  document.addEventListener('click', (t) => {
    e.contains(t.target) || r();
  }),
  r
);
export let onScrollStop = (e) => {
  let r;
  t(),
    window.addEventListener(
      'scroll',
      (t) => {
        clearTimeout(r),
          (r = setTimeout(() => {
            e(t);
          }, 150));
      },
      !1,
    );
};
export let hub = () => ({
  hub: Object.create(null),
  emit(e, t) {
    (this.hub[e] || []).forEach((e) => e(t));
  },
  on(e, t) {
    this.hub[e] || (this.hub[e] = []), this.hub[e].push(t);
  },
  off(e, t) {
    const r = (this.hub[e] || []).findIndex((e) => e === t);
    r > -1 && this.hub[e].splice(r, 1),
      0 === this.hub[e].length && delete this.hub[e];
  },
});
export let dispatch = (e, t, r = window) => {
  let n = new Event(e);
  for (let e in t) n[e] = t[e];
  r.dispatchEvent(n);
};
export let playSection = (e, t, r) => {
  let n = e.cloneNode(!0);
  (n.currentTime = t),
    n.play(),
    (n.int = setInterval(function () {
      n.currentTime > r && (n.pause(), clearInterval(n.int));
    }, 10));
};
export let formatHTML = (e) => {
  var t = '',
    r = '';
  return (
    e.split(/>\s*</).forEach(function (e) {
      e.match(/^\/\w/) && (r = r.substring('\t'.length)),
        (t += r + '<' + e + '>\r\n'),
        e.match(/^<?\w[^>]*[^\/]$/) &&
          !e.startsWith('input') &&
          (r += '\t');
    }),
    t.substring(1, t.length - 3)
  );
};
export let getJSON = (e, r) => {
  t(),
    fetch(e)
      .then((e) => e.json())
      .then((e) => r(e))
      ['catch']((e) => {
        throw new Error(e.stack);
      });
};
export let getHTML = (e, r) => {
  t(),
    fetch(e)
      .then((e) => e.text())
      .then((e) => r(_$.parseHTML(e)))
      ['catch']((e) => {
        throw new Error(e.stack);
      });
};
export let preloadImage = () => {
  for (var e = 0; e < arguments.length; e++)
    (images[e] = new Image()), (images[e].src = preload.arguments[e]);
};
export let saveBlob = (e, r = 'output.txt') => {
  t();
  var n = document.createElement('a');
  document.body.appendChild(n), (n.style = 'display: none');
  var o = window.URL.createObjectURL(e);
  (n.href = o),
    (n.download = r),
    n.click(),
    window.URL.revokeObjectURL(o);
};
export let requestInterval = function (e, r) {
  t();
  var n =
      window.requestAnimationFrame ||
      function (e) {
        window.setTimeout(e, 1e3 / 60);
      },
    o = new Date().getTime(),
    a = {};
  return (
    (a.value = n(function l() {
      (a.value = n(l)),
        new Date().getTime() - o >= r &&
          (e.call(), (o = new Date().getTime()));
    })),
    a
  );
};
export let loadScript = (e, r) => {
  t();
  var n = document.createElement('script');
  (n.type = 'text/javascript'),
    n.readyState
      ? (n.onreadystatechange = function () {
          ('loaded' !== n.readyState &&
            'complete' !== n.readyState) ||
            ((n.onreadystatechange = null), r());
        })
      : (n.onload = function () {
          r();
        }),
    (n.src = e),
    document.getElementsByTagName('head')[0].appendChild(n);
};
export let imageToData = async (e, t) => {
  let r = await fetch(e).then((e) => e.blob());
  t(
    await new Promise((e) => {
      let t = new FileReader();
      (t.onload = () => e(t.result)), t.readAsDataURL(r);
    }),
  );
};
export let cookies = {
  setItem: (e, r, n = 1e3) => {
    t();
    var o = '';
    if (n) {
      var a = new Date();
      a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3),
        (o = '; expires=' + a.toUTCString());
    }
    document.cookie = e + '=' + (r || '') + o + '; path=/';
  },
  getItem: (e) => {
    t();
    for (
      var r = e + '=', n = document.cookie.split(';'), o = 0;
      o < n.length;
      o++
    ) {
      for (var a = n[o]; ' ' == a.charAt(0); )
        a = a.substring(1, a.length);
      if (0 == a.indexOf(r)) return a.substring(r.length, a.length);
    }
    return null;
  },
  removeItem: (e) => {
    t(),
      (document.cookie =
        e + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;');
  },
};
export let regex = {
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
  discoverCredit: /^6(?:011|5[0–9]{2})[0–9]{12}$/,
};
export let jsonToCsv = (e, t, r = ',') =>
  [
    t.join(r),
    ...e.map((e) =>
      t.reduce(
        (t, n) => `${t}${t.length ? r : ''}"${e[n] ? e[n] : ''}"`,
        '',
      ),
    ),
  ].join('\n');
export let arrayToCSV = (e, t = ',') =>
  e
    .map((e) =>
      e
        .map((e) => (isNaN(e) ? `"${e.replace(/"/g, '""')}"` : e))
        .join(t),
    )
    .join('\n');
export let timeFunction = (e, t = '_$ function timer') => {
  console.time(t), e(), console.timeEnd(t);
};
export let notify = (e, r, n) => {
  t(),
    window.Notification
      ? 'granted' === Notification.permission ||
        Notification.requestPermission()
          .then(function (e) {
            'granted' === e ||
              console.log('User blocked notifications.');
          })
          ['catch'](function (e) {
            console.error(e);
          })
      : console.log('Browser does not support notifications.');
};
export let copy = (e) => {
  t();
  const r = document.createElement('textarea');
  (r.value = e),
    r.setAttribute('readonly', ''),
    (r.style.position = 'absolute'),
    (r.style.left = '-9999px'),
    document.body.appendChild(r);
  const n =
    document.getSelection().rangeCount > 0 &&
    document.getSelection().getRangeAt(0);
  return (
    r.select(),
    document.execCommand('copy'),
    document.body.removeChild(r),
    n &&
      (document.getSelection().removeAllRanges(),
      document.getSelection().addRange(n)),
    e
  );
};
export let browser = () => {
  t();
  var e =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(' OPR/') >= 0,
    r = 'undefined' != typeof InstallTrigger,
    n =
      /constructor/i.test(window.HTMLElement) ||
      '[object SafariRemoteNotification]' ===
        (
          !window.safari ||
          ('undefined' != typeof safari &&
            window.safari.pushNotification)
        ).toString(),
    o = !!document.documentMode,
    a = !o && !!window.StyleMedia,
    l = !(
      !window.chrome ||
      (!window.chrome.webstore && !window.chrome.runtime)
    ),
    i = l && -1 != navigator.userAgent.indexOf('Edg'),
    s = (l || e) && !!window.CSS;
  return e
    ? 'Opera'
    : r
    ? 'Firefox'
    : n
    ? 'Safari'
    : a
    ? 'Edge'
    : o
    ? 'Internet Explorer'
    : l
    ? 'Chrome'
    : i
    ? 'Edge Chromium'
    : s
    ? 'Blink'
    : void 0;
};
export let rgbToHex = (e) => {
  let t = e.indexOf(',') > -1 ? ',' : ' ',
    r = (+(e = e.substr(4).split(')')[0].split(t))[0]).toString(16),
    n = (+e[1]).toString(16),
    o = (+e[2]).toString(16);
  return (
    1 == r.length && (r = '0' + r),
    1 == n.length && (n = '0' + n),
    1 == o.length && (o = '0' + o),
    '#' + r + n + o
  );
};
export let hexToRGB = (e) => {
  if (
    ((e.length - 1 != 6 &&
      e.length - 1 != 8 &&
      e.length - 1 != 4 &&
      e.length - 1 != 3) ||
      !e.startsWith('#')) &&
    ((6 !== e.length &&
      8 !== e.length &&
      4 !== e.length &&
      3 !== e.length) ||
      e.startsWith('#'))
  )
    throw new Error('Invalid hex');
  let t = !1,
    r = e.slice(e.startsWith('#') ? 1 : 0);
  return (
    3 === r.length
      ? (r = [...r].map((e) => e + e).join(''))
      : 8 === r.length && (t = !0),
    (r = parseInt(r, 16)),
    'rgb' +
      (t ? 'a' : '') +
      '(' +
      (r >>> (t ? 24 : 16)) +
      ', ' +
      ((r & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)) +
      ', ' +
      ((r & (t ? 65280 : 255)) >>> (t ? 8 : 0)) +
      (t ? ', ' + (255 & r) : '') +
      ')'
  );
};
export let blendColors = (e, t, r = 50) => {
  const n = (e, t, r) => e + (r / 100) * (t - e),
    o = parseInt(`${e[1]}${e[2]}`, 16),
    a = parseInt(`${e[3]}${e[4]}`, 16),
    l = parseInt(`${e[5]}${e[6]}`, 16),
    i = parseInt(`${t[1]}${t[2]}`, 16),
    s = parseInt(`${t[3]}${t[4]}`, 16),
    u = parseInt(`${t[5]}${t[6]}`, 16);
  return ((e, t, r) => {
    let n = e.toString(16),
      o = t.toString(16),
      a = r.toString(16);
    for (; n.length < 2; ) n = `0${n}`;
    for (; o.length < 2; ) o = `0${o}`;
    for (; a.length < 2; ) a = `0${a}`;
    return `#${n}${o}${a}`;
  })(
    Math.round(n(o, i, r)),
    Math.round(n(a, s, r)),
    Math.round(n(l, u, r)),
  );
};
export let randomColor = () =>
  `#${Math.floor(16777215 * Math.random()).toString(16)}`;
export let lightenColor = (e, t) => {
  var r = !1;
  '#' == e[0] && ((e = e.slice(1)), (r = !0));
  var n = parseInt(e, 16),
    o = (n >> 16) + t;
  o > 255 ? (o = 255) : o < 0 && (o = 0);
  var a = ((n >> 8) & 255) + t;
  a > 255 ? (a = 255) : a < 0 && (a = 0);
  var l = (255 & n) + t;
  return (
    l > 255 ? (l = 255) : l < 0 && (l = 0),
    (r ? '#' : '') + (l | (a << 8) | (o << 16)).toString(16)
  );
};
export let lightOrDark = (e) => {
  var t, r, n, o;
  return (
    e.match(/^rgb/)
      ? ((t = (e = e.match(
          /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
        ))[1]),
        (r = e[2]),
        (n = e[3]))
      : ((t =
          (e = +(
            '0x' + e.slice(1).replace(e.length < 5 && /./g, '$&$&')
          )) >> 16),
        (r = (e >> 8) & 255),
        (n = 255 & e)),
    (o = Math.sqrt(t * t * 0.299 + r * r * 0.587 + n * n * 0.114)) >
    127.5
      ? { lightOrDark: 'light', hsp: o }
      : { lightOrDark: 'dark', hsp: o }
  );
};
let r = {
  addEventListeners,
  addStyles,
  animate,
  arrayDiff,
  arrayToCSV,
  attributes,
  averageBy,
  beautifyJS,
  blendColors,
  browser,
  byteSize,
  camelCase,
  capitalize,
  clone,
  compStyle,
  composeFunction,
  contains,
  context,
  cookies,
  copy,
  createElement,
  curryFunction,
  dayName,
  diff,
  disableRightClick,
  dispatch,
  drag,
  each,
  ease,
  editDistance,
  elementSiblings,
  escapeHTML,
  flatten,
  formToObject,
  formatHTML,
  formatMilliseconds,
  formatNumber,
  fullScreen,
  getHTML,
  getJSON,
  hashString,
  hexToRGB,
  hub,
  imageToData,
  inPartialView,
  inView,
  inlineCSS,
  isAsync,
  jsonToCsv,
  lightOrDark,
  lightenColor,
  listen,
  loadScript,
  mapObjectKeys,
  mapObjectValues,
  markdownToHTML,
  memoize,
  merge,
  mobileOrDesktop,
  nFlatten,
  notify,
  observeMutations,
  onOutsideClick,
  onScrollStop,
  parseHTML,
  preloadImage,
  previousPage,
  primesTo,
  querySelector,
  random,
  randomColor,
  range,
  regex,
  remove,
  removeComments,
  removeTags,
  replaceBetween,
  replaceMultiple,
  replaceSelection,
  replaceText,
  requestInterval,
  rgbToHex,
  runAsync,
  sanitize,
  saveBlob,
  scrambleString,
  seedRandom,
  serializeForm,
  shuffleArray,
  sortObj,
  sortTable,
  sortTableBy,
  speak,
  splice,
  spliceArrayBuffer,
  syllables,
  syntaxHighlight,
  textNodes,
  throttle,
  tilt,
  timeFunction,
  unCamelCase,
  unescapeHTML,
  unionArrays,
  uniqueArray,
  urlQuery,
  uuid,
  widows,
};
export default r;
e || (window._$ = r);
export const _$ = r;
if (e)
  try {
    module.exports = r;
  } catch (n) {
    console.error(n);
  }
