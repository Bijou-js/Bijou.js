/**
 * @file bijou.js
 * @author Explosion-Scratch, Bijou.js contributors
 * @since v0.0.0
 * @copyright © Explosion-Scratch and GrahamSH, All rights reserved.
 */

/* --------------------------------------------------------------------------|
  ____ ___    _  ___  _   _   _     
 | __ )_ _|  | |/ _ \| | | | (_)___ 
 |  _ \| |_  | | | | | | | | | / __|
 | |_) | | |_| | |_| | |_| | | \__ \
 |____/___\___/ \___/ \___(_)/ |___/
                           |__/     
------------------------------------------------------------------------------|
Bijou.js is copyrighted by Explosion-Scratch and GrahamSH-LLK of GitHub and released under the MIT license.
This software comes with ABSOLUTELY NO WARRANTY and is provided "As is" (with the best intentions of Explosion-Scratch and contributors! =D )

-----------------------------------------------------------------------------|
   ____ ___  _   _ _____ ____  ___ ____  _   _ _____ ___  ____  ____
  / ___/ _ \| \ | |_   _|  _ \|_ _| __ )| | | |_   _/ _ \|  _ \/ ___|
 | |  | | | |  \| | | | | |_) || ||  _ \| | | | | || | | | |_) \___ \
 | |__| |_| | |\  | | | |  _ < | || |_) | |_| | | || |_| |  _ < ___) |
  \____\___/|_| \_| |_| |_| \_\___|____/ \___/  |_| \___/|_| \_\____/
-----------------------------------------------------------------------------|
Contributors to Bijou.js:
╔═══════════════════╦════════════════════════════╗
║ GITHUB USERNAME   ║ CONTRIBUTIONS              ║
╠═══════════════════╬════════════════════════════╣
║ Explosion-Scratch ║ Founder and creator of     ║
║                   ║ Bijou.js, over 1500        ║
║                   ║ commits to the source      ║
║                   ║ repository.                ║
╠═══════════════════╬════════════════════════════╣
║ GrahamSH-LLK      ║ Great guy, contributed     ║
║                   ║ a ton towards the          ║
║                   ║ development of this        ║
║                   ║ project. He fixed glitches ║
║                   ║ suggested new features,    ║
║                   ║ and helped publish this    ║
║                   ║ to NPM and fix the GitHub  ║
║                   ║ actions on the project.    ║
╠═══════════════════╬════════════════════════════╣
║ Touchcreator      ║ Pointed out several bugs   ║
║                   ║ in Bijou.js and suggested  ║
║                   ║ several new features.      ║
╠═══════════════════╬════════════════════════════╣
║ TheColaber        ║ Collaborated?? (lol)       ║
║                   ║ Fixed tons of bugs         ║
╠═══════════════════╬════════════════════════════╣
║ Hans5958          ║ Helped fix glitches in the ║
║                   ║ website and suggested      ║
║                   ║ fixes for GitHub actions   ║
║                   ║ glitches.                  ║
╠═══════════════════╬════════════════════════════╣
║ YOYITsM3M8        ║ Suggested a lot of         ║
║ (AKA retronbv)    ║ features and bug fixes.    ║
║═══════════════════║════════════════════════════║
║ thecoder876       ║ Made some improvements.    ║
╚═══════════════════╩════════════════════════════╝


(c) 2021 Explosion-Scratch, all rights reserved.

 */
/**
 * @description Tests if the user is using Node.js or not and throws an error in specific functions (that require the DOM) if they are.
 */
let node = () => { 
  return new Error("You are using Node.js")
};
let isNode = false;
if (typeof window === "undefined" || typeof document === "undefined") {
  isNode = true;
} else {
  isNode = false;
}

if (isNode) {
  console.warn(
    "There is no document element in Node, some functions of bijou.js will not work. If you need these functions consider using a package like jsDom to recreate the document element."
  );
}
/**
 * Bijou.js source object. It contains all the functions of Bijou.
 * @type {Object}
 * @namespace bijou
 * @author Explosion-Scratch, Bijou.js contributors
 */

let _temp = {
  /**
   * Gives an array of prime numbers up to a certain one.
   * @function
   * @memberOf bijou
   * @param {Number} num - The number to give primes to.
   * @example
   * _$.primesTo(100);//Returns an array of prime numbers up to 100.
   * @returns {Array} Returns an array of prime numbers up to the given number.
   */
  primesTo: (num) => {
    let arr = Array.from({
      length: num - 1,
    }).map((x, i) => i + 2),
      sqroot = Math.floor(Math.sqrt(num)),
      numsTillSqroot = Array.from({
        length: sqroot - 1,
      }).map((x, i) => i + 2);
    numsTillSqroot.forEach(
      (x) => (arr = arr.filter((y) => y % x !== 0 || y === x))
    );
    return arr;
  },
  /**
   * Runs a function asynchronously in a web worker.
   * @function
   * @memberOf bijou
   * @param {Function} fn The function to run
   * @example
   * _$.async(() => {console.log("Function!"); return "hello"});//Returns a promise that resolves into "hello".
   * @returns {Promise} A promise that resolves into the return value of the function.
   */
  async: (fn) => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
        type: "application/javascript; charset=utf-8",
      })
    );
    return new Promise((res, rej) => {
      worker.onmessage = ({ data }) => {
        res(data), worker.terminate();
      };
      worker.onerror = (err) => {
        rej(err), worker.terminate();
      };
    });
  },
  /**
   * Formats a number of milliseconds
   * @function
   * @memberOf bijou
   * @param {Number} ms The number of milliseconds to format to a string.
   * @example
   * _$.formatMilliseconds(4000);//Returns "4 seconds"
   * @returns {Array}
   */
  formatMilliseconds: (ms) => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000,
    };
    return Object.entries(time)
      .filter((val) => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
      .join(", ");
  },
  /**
   * Adds the specified styles to the element specified.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to add the styles to.
   * @param {Object} styles An object that represents the styles to be added. (camelCased)
   * @example
   * _$.addStyles(document.documentElement, {backgroundColor: "#101010", color: "white"})
   * @returns {Object} the assigned object.
   */
  addStyles: (el, styles) => {
    throw node();
    return Object.assign(el.style, styles);
  },
  /**
   * Returns the callback when a a click is registered outside the selected element
   * @function
   * @memberOf bijou
   * @param {Element} element The element to use as the outsideclick element.
   * @param {Function} callback The function to run when a click is registered outside the specified element.
   * @example
   * _$.onOutsideClick(document.querySelector("div"), () => {alert("You clicked outside the DIV!")});
   * @returns {Function} the function that was called.
   */
  onOutsideClick: (element, callback) => {
    throw node();
    document.addEventListener("click", (e) => {
      if (!element.contains(e.target)) callback();
    });
    return callback;
  },
  /**
   * Returns the callback when the user stops scrolling.
   * @function
   * @memberOf bijou
   * @param {Function} callback The callback to call when the user stops scrolling.
   * @example
   * _$.onScrollStop(() => {alert("You stopped scrolling!")})
   * @returns {undefined} Returns undefined.
   */
  onScrollStop: (callback) => {
    let isScrolling;
    throw node();
    window.addEventListener(
      "scroll",
      (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback(e);
        }, 150);
      },
      false
    );
  },
  /**
   * Copies the string inputted the clipboard.
   * @function
   * @memberOf bijou
   * @param {String} str The string to copy.
   * @example
   * _$.copy("Hello world")
   * @returns {String} The string copied.
   */
  copy: (str) => {
    throw node();
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return str;
  },
  /**
  * Only runs the input function at MAX with the delay specified.
  * @function
  * @memberOf bijou
  * @param {Function} fn The function to run.
  * @param {Number} wait The number of milliseconds to wait.
  * @example
  * const alert_function = _$.throttle(() => {alert("hello")}, 5000)
  * setInterval(alert_function, 1)
  * @returns {Function} The throttled function
  */
  throttle: (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function () {
      const context = this,
        args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(function () {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, Math.max(wait - (Date.now() - lastTime), 0));
      }
    };
  },
  /**
   * Creates an HTML element from the specified string.
   * @function
   * @memberOf bijou
   * @param {String} str The string of the HTML element to create.
   * @example
   * //Returns a div with an id of "id_here" and innerText of "Testing!"
   * _$.createElement("<div id='id_here'>Testing!</div>");
   * @returns {Element} The created element.
   */
  createElement: (str) => {
    throw node();
    const el = document.createElement("div");
    el.innerHTML = str;
    return el.firstElementChild;
  },
  /**
   * Returns the browser that the user is using.
   * @function
   * @memberOf bijou
   * @example
   * _$.browser();//For me this (correctly) returns "Chrome"
   * @returns {String} A string of the browser name that the user is using.
   */
  browser: () => {
    throw node();
    var isOpera =
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;
    var isFirefox = typeof InstallTrigger !== "undefined";
    var isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
        (typeof safari !== "undefined" && window["safari"].pushNotification)
      );
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    if (isOpera) {
      return "Opera";
    }
    if (isFirefox) {
      return "Firefox";
    }
    if (isSafari) {
      return "Safari";
    }
    if (isEdge) {
      return "Edge";
    }
    if (isIE) {
      return "Internet Explorer";
    }
    if (isChrome) {
      return "Chrome";
    }
    if (isEdgeChromium) {
      return "Edge Chromium";
    }
    if (isBlink) {
      return "Blink";
    }
  },
  /**
   * Displays a desktop notification with the specified text.
   * @function
   * @memberOf bijou
   * @param {String} text The title of the notification.
   * @param {String} body The body of the notification.
   * @param {String} icon The url to the image for the icon of the notification.
   * @example
   * _$.notify("Hello", "Hi there! This is a notification!");//Returns an array of prime numbers up to 100.
   * @returns {undefined}
   */
  notify: (text, body, icon) => {
    throw node();
    if (!window.Notification) {
      console.log("Browser does not support notifications.");
    } else {
      if (Notification.permission === "granted") {
        var notify = new Notification(text, {
          body: body,
          icon: icon,
        });
      } else {
        Notification.requestPermission()
          .then(function (p) {
            if (p === "granted") {
              var notify = new Notification(text, {
                body: body,
                icon: icon,
              });
            } else {
              console.log("User blocked notifications.");
            }
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    }
  },
  /**
   * Returns the name of the weekday from the Date object specified.
   * @function
   * @memberOf bijou
   * @param {Date} date The date object to use.
   * @param {String} [locale=en-US] The locale to use.
   * @example
   * _$.primesTo(100);//Returns an array of prime numbers up to 100.
   * @returns {String} The day name from the date.
   */
  dayName: (date, locale = "en-US") =>
    date.toLocaleDateString(locale, {
      weekday: "long",
    }),
  /**
   * Converts JSON to a CSV string
   * @function
   * @memberOf bijou
   * @param {Array} arr The array of objects to convert to CSV.
   * @param {String} columns The number of columns to use.
   * @param {String} [delimiter=","] The delimiter between cells, by default this is a comma.
   * @example
   * _$.jsonToCsv(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b']
  ); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
   * @returns {String} The string of comma separated values (CSV) created from the JSON.
   */
  jsonToCsv: (arr, columns, delimiter = ",") =>
    [
      columns.join(delimiter),
      ...arr.map((obj) =>
        columns.reduce(
          (acc, key) =>
            `${acc}${!acc.length ? "" : delimiter}"${
            !obj[key] ? "" : obj[key]
            }"`,
          ""
        )
      ),
    ].join("\n"),
  /**
   * Joins two arrays together and removes duplicates.
   * @function
   * @memberOf bijou
   * @param {Array} x The first array to join.
   * @param {Array} y The second array to join.
   * @example
   * _$.unionArrays([1,2,3], [4,5,6]);//Returns [1,2,3,4,5,6]
   * @returns {Array} The joined array from the two other arrays.
   */
  unionArrays: (x, y) => {
    var obj = {};
    for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
    for (var i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
    var res = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) res.push(obj[k]);
    }
    return res;
  },
  /**
   * For each item in an array, run a callback with it.
   * @function
   * @memberOf bijou
   * @param {Array} array The array of items to run the callback with.
   * @param {Function} callback The callback function to run on the array items.
   * @example
   * _$.each(new Array(40), (i) => console.log(i));//Logs the numbers up to 40.
   * @returns {undefined}
   */
  each: (array, callback) => {
    for (let i = 0; i < array.length; i++) {
      callback(array[i], i, array);
    }
  },
  /**
   * Maps the keys of an object.
   * @function
   * @memberOf bijou
   * @param {Object} obj The object to map.
   * @param {Function} fn The function to run (passed the current key of the object) which returns the new value from that key.
   * @example
   * _$.mapObjectKeys({something: "A value", anotherThing: "Another value!"}, (key) => key.toUpperCase());
   * //Returns {SOMETHING: "A value", ANOTHERTHING: "Another value!"}
   * @returns {Object} The new Object.
   */
  mapObjectKeys: (obj, fn) =>
    Array.isArray(obj)
      ? obj.map((val) => _$.mapObjectKeys(val, fn))
      : typeof obj === "object"
        ? Object.keys(obj).reduce((acc, current) => {
          const key = fn(current);
          const val = obj[current];
          acc[key] =
            val !== null && typeof val === "object"
              ? _$.mapObjectKeys(val, fn)
              : val;
          return acc;
        }, {})
        : obj,
  /**
   * Converts an array to CSV (Comma separated values) data.
   * @function
   * @memberOf bijou
   * @param {Array} arr The array to convert.
   * @param {String} [delimiter=,] The separator (By default this is a comma.)
   * @example
   * _$.arrayToCSV([1,2,3,4]);//Returns "1,2,3,4"
   * @returns {String} The comma separated array.
   */
  arrayToCSV: (arr, delimiter = ",") =>
    arr
      .map((v) =>
        v
          .map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x))
          .join(delimiter)
      )
      .join("\n"),
  /**
   * averageBy
   * @function
   * @memberOf bijou
   * @param {Array.<number>} arr The array to average
   * @param {Function} fn The function to apply to each item of the array.
   * @example
   * //Averages the array 1,2,3,4 after squaring each number.
   * _$.averageBy([1,2,3,4], (v) => v ** 2);
   * @returns {Number} The average of the array.
   */
  averageBy: (arr, fn) =>
    arr
      .map(typeof fn === "function" ? fn : (val) => val[fn])
      .reduce((acc, val) => acc + val, 0) / arr.length,
  /**
   * Tests whether the specified element is fully in view.
   * @function
   * @memberOf bijou
   * @param {Element} el The DOM element to test.
   * @example
   * //Alerts "In view!" if the first <div> in the document is in view.
   * if (_$.inView(document.querySelector("div"))) alert("In view!");
   * @returns {Boolean} Whether the element is completely in view.
   */
  inView: (el) => {
    throw node();
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      top + height <= window.pageYOffset + window.innerHeight &&
      left + width <= window.pageXOffset + window.innerWidth
    );
  },
  /**
   * Tests if the given DOM element is partially (or fully) in view.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to test.
   * @example
   * //Alerts "In view!" if the first <div> in the document is partially or fully view.
   * if (_$.inPartialView(document.querySelector("div"))) alert("In view!");
   * @returns {Boolean} Whether the DOM element is partially in view.
   */
  inPartialView: (el) => {
    throw node();
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  },
  /**
   * Converts a form to URL queries using the name attribute.
   * @function
   * @memberOf bijou
   * @param {Element} form The form element.
   * @returns {String} The string of url queries (Excluding the hostname and path) of the form data.
   */
  serializeForm: (form) => {
    throw node();
    return Array.from(new FormData(form), (field) =>
      field.map(encodeURIComponent).join("=")
    ).join("&");
  },
  /**
   * Converts a form to an Object.
   * @function
   * @memberOf bijou
   * @param {Element} form The form element.
   * @example
   * //
   * @returns {Object} The object of form data (The keys are the "name" attributes of the form inputs and the values are the value attributes of the form data.)
   */
  formToObject: (form) => {
    throw node();
    return Array.from(new FormData(form)).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }));
  },
  /**
   * Generates a unique ID from a seed
   * @function
   * @memberOf bijou
   * @param {Number|String} [seed=Math.random()] The seed to use.
   * @example
   * _$.uuid();//Returns a uuid!
   * @returns {String} The UUID
   */
  uuid: (seed = Math.random()) => {
    if (typeof seed === "string") {
      // Convert string to a number between 0 and 1
      seed = _temp.hashString(seed) / 10000000000000000;
    }
    function _p8(s) {
      var p = (seed.toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  },
  /**
   * Escapes a string of HTML
   * @function
   * @memberOf bijou
   * @param {String} str The string of HTML to escape.
   * @example
   * _$.escapeHTML("<div>"); Returns the escaped HTML: "&lt;div&gt;"
   * @returns {String} The escaped HTML.
   */
  escapeHTML: (str) =>
    str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[tag] || tag)
    ),
  /**
   * Unescapes a string of HTML
   * @function
   * @memberOf bijou
   * @param {String} str The string of HTML to unescape.
   * @example
   * _$.unescapeHTML("&lt;div&gt;");//Returns "<div>"
   * @returns {String} The unescaped HTML.
   */
  unescapeHTML: (str) =>
    str.replace(
      /&amp;|&lt;|&gt;|&#39;|&quot;/g,
      (tag) =>
        ({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&#39;": "'",
          "&quot;": '"',
        }[tag] || tag)
    ),
  /**
   * Returns the previous page that the user visited.
   * @function
   * @memberOf bijou
   * @example
   * _$.previousPage()
   * @returns {String} The url of the previous page the user visited.
   */
  previousPage: () => {
    throw node();
    return document.referrer || window.location.href;
  },
  /**
   * Replaces the text in an element by running it through a callback.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to replace the text of.
   * @param {Function} callback The callback to run (Gets passed the element's text).
   * @example
   * _$.replaceText(document.querySelector("div"), (text) => text.toUpperCase());
   * //Converts the text of the first <div> element to upperCase.
   * @returns {String} The element who's text was replaced.
   */
  replaceText: (el, callback) => {
    throw node();
    for (
      var e,
      t = (function () {
        for (var e, t = el, o = [], a = 0; a < t.length; a++)
          (e = t[a].childNodes[0]),
            t[a].hasChildNodes() && 3 == e.nodeType && o.push(e);
        return o;
      })(),
      o = 0,
      a = t.length;
      o < a;
      o++
    )
      (e = t[o].nodeValue), (t[o].nodeValue = callback(e));
    return el;
  },
  /**
   * Times the function passed.
   * @function
   * @memberOf bijou
   * @param {Function} fn The function to run and time.
   * @param {String} [name=_$ function timer]
   * @example
   * //Times how long it took the user to enter their name.
   * _$.timeFunction(() => prompt("What's your name?"));
   * @returns {undefined}
   */
  timeFunction: (fn, name = "_$ function timer") => {
    console.time(name);
    fn();
    console.timeEnd(name);
  },
  /**
   * Sorts an object alphabetically by its keys.
   * @function
   * @memberOf bijou
   * @param {Object} obj The object to sort.
   * @example
   * let object = _$.sortObj({testing: "A value", anotherThing: "Another value!"});
   * // The object is now {anotherThing: "Another value!", testing: "A value"}
   * @returns {Object} The sorted object.
   */
  sortObj: (obj) => {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  },
  /**
   * Returns the last space in the string given replaced with "&nbsp;"
   * @function
   * @memberOf bijou
   * @param {String} text The string to replace
   * @example
   * document.querySelector("h1").innerHTML = _$.widows(document.querySelector("h1").innerHTML);
   * //Replaces the last space in the <h1>'s innerText with "&nbsp;"
   * @returns {String} The replaced string.
   */
  widows: (text) => {
    var wordArray = text.split(" ");
    var finalTitle = "";
    for (var i = 0; i <= wordArray.length - 1; i++) {
      finalTitle += wordArray[i];
      if (i == wordArray.length - 2) {
        finalTitle += "&nbsp;";
      } else {
        finalTitle += " ";
      }
    }
    return finalTitle;
  },
  /**
   * Generates a random hex color.
   * @function
   * @memberOf bijou
   * @example
   * document.querySelector("div").style.backgroundColor = _$.randomColor()
   * @returns {String} A random Hex color
   */
  randomColor: () => "#" + Math.floor(Math.random() * 16777215).toString(16),
  /**
   * Lighten or darken a color by a certain amount
   * @function
   * @memberOf bijou
   * @param {String} color The color to lighten/darken
   * @param {Number} amt The amount to lighten the color.
   * @example
   * _$.lightenColor("#000000", 50);//Lightens black by 50 (Out of 255)
   * @returns {String} The color lightened.
   */
  lightenColor: (col, amt) => {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  },
  /**
  * Tests if a color is light or dark and returns an object representation.
  * @function
  * @memberOf bijou
  * @param
  * @example
  * if (_$.lightOrDark("#333333").lightOrDark === 'dark'){
    document.querySelector("DIV").style.color = "white";
  } else {
      document.querySelector("DIV").style.color = "black";
  }
  * @returns {Object} An object that represents if the color is light or dark and how much. The object key "hsp" represents a value out of 255 of how light the color is and the object's key "lightOrDark" is a string (Either "light" or "dark") of whether the color is light or dark.
  */
  lightOrDark: (color) => {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );

      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +(
        "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
      );

      r = color >> 16;
      g = (color >> 8) & 255;
      b = color & 255;
    }

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    if (hsp > 127.5) {
      return { lightOrDark: "light", hsp: hsp };
    } else {
      return { lightOrDark: "dark", hsp: hsp };
    }
  },
  /**
   * Gets a property from the computed style of an element.
   * @function
   * @memberOf bijou
   * @param {Element} el The element whose styles to get.
   * @param {String} prop The css-property value to get of the styles.
   * @example
   * console.log(_$.compStyle(document.documentElement, "background-color"));
   * @returns {String} The computed style property for the element specified.
   */
  compStyle: (el, prop) => {
    throw node();
    var computedStyles = window.getComputedStyle(el);
    return computedStyles.getPropertyValue(prop);
  },
  rgbToHex: (rgb) => {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  },
  /**
   * Converts a hex code to a RGB color.
   * @function
   * @memberOf bijou
   * @param {String} hex The hex code to convert.
   * @returns {String} The RGB color converted from the hex code.
   */
  hexToRGB: (hex) => {
    let alpha = false,
      h = hex.slice(hex.startsWith("#") ? 1 : 0);
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
      "rgb" +
      (alpha ? "a" : "") +
      "(" +
      (h >>> (alpha ? 24 : 16)) +
      ", " +
      ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
      ", " +
      ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
      (alpha ? `, ${h & 0x000000ff}` : "") +
      ")"
    );
  },
  /**
   * Generates a querySelector for an element passed in.
   * @function
   * @memberOf bijou
   * @param {Element} elem The element to generate the querySelector for.
   * @example
   * const textarea = document.getElementById('textarea');
   * console.log(_$.querySelector(textarea)); //Logs "#textarea" to the console.
   * @returns {String} The generated querySelector.
   */
  querySelector: (elem) => {
    throw node();
    var element = elem;
    var str = "";

    function loop(element) {
      if (
        element.getAttribute("id") &&
        document.querySelectorAll(`#${element.getAttribute("id")}`).length === 1
      ) {
        str = str.replace(/^/, " #" + element.getAttribute("id"));
        str = str.replace(/\s/, "");
        str = str.replace(/\s/g, " > ");
        return str;
      }
      if (document.body === element) {
        str = str.replace(/^/, " body");
        str = str.replace(/\s/, "");
        str = str.replace(/\s/g, " > ");
        return str;
      }
      if (element.getAttribute("class")) {
        var elemClasses = ".";
        elemClasses += element.getAttribute("class");
        elemClasses = elemClasses.replace(/\s/g, ".");
        elemClasses = elemClasses.replace(/^/g, " ");
        var classNth = "";
        var childrens = element.parentNode.children;

        if (childrens.length < 2) {
          return;
        }

        var similarClasses = [];

        for (var i = 0; i < childrens.length; i++) {
          if (
            element.getAttribute("class") == childrens[i].getAttribute("class")
          ) {
            similarClasses.push(childrens[i]);
          }
        }

        if (similarClasses.length > 1) {
          for (var j = 0; j < similarClasses.length; j++) {
            if (element === similarClasses[j]) {
              j++;
              classNth = ":nth-of-type(" + j + ")";
              break;
            }
          }
        }

        str = str.replace(/^/, elemClasses + classNth);
      } else {
        var name = element.nodeName;
        name = name.toLowerCase();
        var nodeNth = "";

        var childrens = element.parentNode.children;

        if (childrens.length > 2) {
          var similarNodes = [];

          for (var i = 0; i < childrens.length; i++) {
            if (element.nodeName == childrens[i].nodeName) {
              similarNodes.push(childrens[i]);
            }
          }

          if (similarNodes.length > 1) {
            for (var j = 0; j < similarNodes.length; j++) {
              if (element === similarNodes[j]) {
                j++;
                nodeNth = ":nth-of-type(" + j + ")";
                break;
              }
            }
          }
        }

        str = str.replace(/^/, " " + name + nodeNth);
      }

      if (element.parentNode) {
        loop(element.parentNode);
      } else {
        str = str.replace(/\s/g, " > ");
        str = str.replace(/\s/, "");
        return str;
      }
    }

    loop(element);

    return str;
  },
  /**
   * Removes comments from the element or string of code specified.
   * @function
   * @memberOf bijou
   * @param {Element|String} el The element or string or code to remove comments from.
   * @example
   * _$.removeComments(document.documentElement);//Removes the comments from the document element.
   * @returns {String|Element} The string removed of comments or the element removed of comments.
   */
  removeComments: (el) => {
    if (typeof el === "element") {
      if (isNode) {
        throw new Error(
          "No document element! (You are probably using Node.js)"
        );
      }
      el.innerHTML = el.innerHTML.replace(
        /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
        ""
      );
      return el;
    } else if (typeof el === "string") {
      return string.replace(
        /<!--[\s\S]*?(?:-->)?<!---+>?|<!(?![dD][oO][cC][tT][yY][pP][eE]|\[CDATA\[)[^>]*>?|<[?][^>]*>?/g,
        ""
      );
    }
  },
  /**
   * Generates a random number between a minimum and maximum number
   * @function
   * @memberOf bijou
   * @param {Number} min The lowest number that the random value generated can be.
   * @param {Number} max The highest number that the random value generated can be.
   * @param {Number} [round=true] Weather to round the generated number
   * @param {Number} [seed=Math.random()] The seed for the generated number (Between 0 and 1).
   * @returns {Number} The random numebr generated.
   */
  random: (min, max, round = true, seed = Math.random()) => {
    if (round) {
      return Math.floor(seed * (max - min + 1) + min);
    } else {
      return Math.random() * (max - min + 1) + min;
    }
  },
  /**
   * Get a random number from a seed.
   * @function
   * @memberOf bijou
   * @param {Number} seed The seed to use to generate random numbers.
   * @example
   * console.log(_$.seedRandom(13));
   * @returns {Number} The random number from the seed.
   */
  seedRandom: (seed) => {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  },
  /**
  * Removes duplicates from an array
  * @function
  * @memberOf bijou
  * @param {Array} array The array to remove duplicates from.
  * @example
  * let an_array = [1,1,2,3,4,5,5,6]
  an_array = _$.uniqueArray(an_array);
  //Now an_array is [1,2,3,4,5,6]
  * @returns {Array} The array with no duplicates.
  */
  uniqueArray: (array) => [...new Set(array)],
  /**
   * Formats a number by adding commas to it.
   * @function
   * @memberOf bijou
   * @param {Number} n The number to format.
   * @example
   * console.log(_$.formatNumber(100000000)); Logs "100,000,000 to the console."
   * @returns {String} The formatted string representation of the number.
   */
  formatNumber: (n) => n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
  /**
   * Splices an array buffer
   * @function
   * @memberOf bijou
   */
  spliceArrayBuffer: (arr, start, end, endian) => {
    endian = endian || false;
    var direction = endian ? -1 : 1;
    if (endian) [start, end] = [end, start];
    start = Math.floor(start);
    end = Math.floor(end) + direction;
    for (var i = start, value = 0; i != end; i += direction)
      value = 256 * value + arr[i];
    return value;
  },
  /**
   * Undoes camelCase.
   * @function
   * @memberOf bijou
   * @param {String} str The string to camelCase.
   * @example
   * console.log(_$.unCamelCase("helloWorld"));//Logs "Hello World" to the console.
   * @returns {String} The string of unCamelCased code.
   */
  unCamelCase: function (str) {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      .replace(/^./, function (s) {
        return s.toUpperCase();
      });
  },
  /**
   * Parses the string of HTML specified and returns an HTML element of it.
   * @function
   * @memberOf bijou
   * @param {String} string The HTML string to parse.
   * @param {String} [mimeType=text/html] The mimeType of the string.
   * @example
   * let html = _$.parseHTML("<div id='hello'><textarea></textarea></div>");
   * html.querySelector("textarea");//Returns the textarea!
   * @returns {Element} The HTML document element of the HTML string specified.
   */
  parseHTML: (string, mimeType = "text/html") => {
    const domparser = new DOMParser();
    return domparser.parseFromString(string, mimeType);
  },
  /**
   * Syntax highlights a string of code.
   * @function
   * @memberOf bijou
   * @param {String} string The string of HTML to highlight.
   * @param {String} [mode=html] The mode to use for highlighting. (CSS, JS or HTML).
   * @example
   * _$.syntaxHighlight('alert(\"Hello\")', 'js');//Returns html of the syntax highlighted version.
   * @returns {String} The highlighted string of code as HTML code.
   */
  syntaxHighlight: (string, mode = "html", colors = {}) => {
    throw node();
    let el = document.createElement("DIV");
    el.innerText = string;
    let highlightel = (elmnt, mode, colors = {}) => {
      if (isNode) {
        throw new Error(
          "No document element! (You are probably using Node.js)"
        );
      }
      // Credit to w3schools for this
      var lang = mode || "html";
      var elmntObj = document.getElementById(elmnt) || elmnt;
      var elmntTxt = elmntObj.innerHTML;
      var tagcolor = colors.tagColor || "mediumblue";
      var tagnamecolor = colors.tagNameColor || "brown";
      var attributecolor = colors.attributeColor || "red";
      var attributevaluecolor = colors.attributeValueColor || "mediumblue";
      var commentcolor = colors.commentColor || "green";
      var cssselectorcolor = colors.cssSelectorColor || "brown";
      var csspropertycolor = colors.cssPropertyColor || "red";
      var csspropertyvaluecolor = colors.cssPropertyValueColor || "mediumblue";
      var cssdelimitercolor = colors.cssLimiterColor || "black";
      var cssimportantcolor = colors.cssImportantColor || "red";
      var jscolor = colors.jsColor || "black";
      var jskeywordcolor = colors.jsKeywordColor || "mediumblue";
      var jsstringcolor = colors.jsStringColor || "brown";
      var jsnumbercolor = colors.jsNumberColor || "red";
      var jspropertycolor = colors.jsPropertyColor || "black";
      elmntObj.style.fontFamily =
        colors.fontFamily || "Consolas,'Courier New', monospace";
      if (!lang) {
        lang = "html";
      }
      if (lang == "html") {
        elmntTxt = htmlMode(elmntTxt);
      }
      if (lang == "css") {
        elmntTxt = cssMode(elmntTxt);
      }
      if (lang == "js") {
        elmntTxt = jsMode(elmntTxt);
      }
      elmntObj.innerHTML = elmntTxt;

      function extract(str, start, end, func, repl) {
        var s,
          e,
          d = "",
          a = [];
        while (str.search(start) > -1) {
          s = str.search(start);
          e = str.indexOf(end, s);
          if (e == -1) {
            e = str.length;
          }
          if (repl) {
            a.push(func(str.substring(s, e + end.length)));
            str = str.substring(0, s) + repl + str.substr(e + end.length);
          } else {
            d += str.substring(0, s);
            d += func(str.substring(s, e + end.length));
            str = str.substr(e + end.length);
          }
        }
        this.rest = d + str;
        this.arr = a;
      }
      function htmlMode(txt) {
        var rest = txt,
          done = "",
          php,
          comment,
          angular,
          startpos,
          endpos,
          note,
          i;
        comment = new extract(
          rest,
          "&lt;!--",
          "--&gt;",
          commentMode,
          "W3HTMLCOMMENTPOS"
        );
        rest = comment.rest;
        while (rest.indexOf("&lt;") > -1) {
          note = "";
          startpos = rest.indexOf("&lt;");
          if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
            note = "css";
          }
          if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
            note = "javascript";
          }
          endpos = rest.indexOf("&gt;", startpos);
          if (endpos == -1) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += tagMode(rest.substring(startpos, endpos + 4));
          rest = rest.substr(endpos + 4);
          if (note == "css") {
            endpos = rest.indexOf("&lt;/style&gt;");
            if (endpos > -1) {
              done += cssMode(rest.substring(0, endpos));
              rest = rest.substr(endpos);
            }
          }
          if (note == "javascript") {
            endpos = rest.indexOf("&lt;/script&gt;");
            if (endpos > -1) {
              done += jsMode(rest.substring(0, endpos));
              rest = rest.substr(endpos);
            }
          }
        }
        rest = done + rest;
        for (i = 0; i < comment.arr.length; i++) {
          rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
        }
        return rest;
      }
      function tagMode(txt) {
        var rest = txt,
          done = "",
          startpos,
          endpos,
          result;
        while (rest.search(/(\s|<br>)/) > -1) {
          startpos = rest.search(/(\s|<br>)/);
          endpos = rest.indexOf("&gt;");
          if (endpos == -1) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += attributeMode(rest.substring(startpos, endpos));
          rest = rest.substr(endpos);
        }
        result = done + rest;
        result =
          "<span style=color:" +
          tagcolor +
          ">&lt;</span>" +
          result.substring(4);
        if (result.substr(result.length - 4, 4) == "&gt;") {
          result =
            result.substring(0, result.length - 4) +
            "<span style=color:" +
            tagcolor +
            ">&gt;</span>";
        }
        return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
      }
      function attributeMode(txt) {
        var rest = txt,
          done = "",
          startpos,
          endpos,
          singlefnuttpos,
          doublefnuttpos,
          spacepos;
        while (rest.indexOf("=") > -1) {
          endpos = -1;
          startpos = rest.indexOf("=");
          singlefnuttpos = rest.indexOf("'", startpos);
          doublefnuttpos = rest.indexOf('"', startpos);
          spacepos = rest.indexOf(" ", startpos + 2);
          if (
            spacepos > -1 &&
            (spacepos < singlefnuttpos || singlefnuttpos == -1) &&
            (spacepos < doublefnuttpos || doublefnuttpos == -1)
          ) {
            endpos = rest.indexOf(" ", startpos);
          } else if (
            doublefnuttpos > -1 &&
            (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) &&
            (doublefnuttpos < spacepos || spacepos == -1)
          ) {
            endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
          } else if (
            singlefnuttpos > -1 &&
            (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) &&
            (singlefnuttpos < spacepos || spacepos == -1)
          ) {
            endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
          }
          if (!endpos || endpos == -1 || endpos < startpos) {
            endpos = rest.length;
          }
          done += rest.substring(0, startpos);
          done += attributeValueMode(rest.substring(startpos, endpos + 1));
          rest = rest.substr(endpos + 1);
        }
        return (
          "<span style=color:" + attributecolor + ">" + done + rest + "</span>"
        );
      }
      function attributeValueMode(txt) {
        return (
          "<span style=color:" + attributevaluecolor + ">" + txt + "</span>"
        );
      }
      function commentMode(txt) {
        return "<span style=color:" + commentcolor + ">" + txt + "</span>";
      }
      function cssMode(txt) {
        var rest = txt,
          done = "",
          s,
          e,
          comment,
          i,
          midz,
          c,
          cc;
        comment = new extract(
          rest,
          /\/\*/,
          "*/",
          commentMode,
          "W3CSSCOMMENTPOS"
        );
        rest = comment.rest;
        while (rest.search("{") > -1) {
          s = rest.search("{");
          midz = rest.substr(s + 1);
          cc = 1;
          c = 0;
          for (i = 0; i < midz.length; i++) {
            if (midz.substr(i, 1) == "{") {
              cc++;
              c++;
            }
            if (midz.substr(i, 1) == "}") {
              cc--;
            }
            if (cc == 0) {
              break;
            }
          }
          if (cc != 0) {
            c = 0;
          }
          e = s;
          for (i = 0; i <= c; i++) {
            e = rest.indexOf("}", e + 1);
          }
          if (e == -1) {
            e = rest.length;
          }
          done += rest.substring(0, s + 1);
          done += cssPropertyMode(rest.substring(s + 1, e));
          rest = rest.substr(e);
        }
        rest = done + rest;
        rest = rest.replace(
          /{/g,
          "<span style=color:" + cssdelimitercolor + ">{</span>"
        );
        rest = rest.replace(
          /}/g,
          "<span style=color:" + cssdelimitercolor + ">}</span>"
        );
        for (i = 0; i < comment.arr.length; i++) {
          rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
        }
        return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
      }
      function cssPropertyMode(txt) {
        var rest = txt,
          done = "",
          s,
          e,
          n,
          loop;
        if (rest.indexOf("{") > -1) {
          return cssMode(rest);
        }
        while (rest.search(":") > -1) {
          s = rest.search(":");
          loop = true;
          n = s;
          while (loop == true) {
            loop = false;
            e = rest.indexOf(";", n);
            if (rest.substring(e - 5, e + 1) == "&nbsp;") {
              loop = true;
              n = e + 1;
            }
          }
          if (e == -1) {
            e = rest.length;
          }
          done += rest.substring(0, s);
          done += cssPropertyValueMode(rest.substring(s, e + 1));
          rest = rest.substr(e + 1);
        }
        return (
          "<span style=color:" +
          csspropertycolor +
          ">" +
          done +
          rest +
          "</span>"
        );
      }
      function cssPropertyValueMode(txt) {
        var rest = txt,
          done = "",
          s;
        rest =
          "<span style=color:" +
          cssdelimitercolor +
          ">:</span>" +
          rest.substring(1);
        while (rest.search(/!important/i) > -1) {
          s = rest.search(/!important/i);
          done += rest.substring(0, s);
          done += cssImportantMode(rest.substring(s, s + 10));
          rest = rest.substr(s + 10);
        }
        result = done + rest;
        if (
          result.substr(result.length - 1, 1) == ";" &&
          result.substr(result.length - 6, 6) != "&nbsp;" &&
          result.substr(result.length - 4, 4) != "&lt;" &&
          result.substr(result.length - 4, 4) != "&gt;" &&
          result.substr(result.length - 5, 5) != "&amp;"
        ) {
          result =
            result.substring(0, result.length - 1) +
            "<span style=color:" +
            cssdelimitercolor +
            ">;</span>";
        }
        return (
          "<span style=color:" +
          csspropertyvaluecolor +
          ">" +
          result +
          "</span>"
        );
      }
      function cssImportantMode(txt) {
        return (
          "<span style=color:" +
          cssimportantcolor +
          ";font-weight:bold;>" +
          txt +
          "</span>"
        );
      }
      function jsMode(txt) {
        var rest = txt,
          done = "",
          esc = [],
          i,
          cc,
          tt = "",
          sfnuttpos,
          dfnuttpos,
          compos,
          comlinepos,
          keywordpos,
          numpos,
          mypos,
          dotpos,
          y;
        for (i = 0; i < rest.length; i++) {
          cc = rest.substr(i, 1);
          if (cc == "\\") {
            esc.push(rest.substr(i, 2));
            cc = "W3JSESCAPE";
            i++;
          }
          tt += cc;
        }
        rest = tt;
        y = 1;
        while (y == 1) {
          sfnuttpos = getPos(rest, "'", "'", jsStringMode);
          dfnuttpos = getPos(rest, '"', '"', jsStringMode);
          compos = getPos(rest, /\/\*/, "*/", commentMode);
          comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
          numpos = getNumPos(rest, jsNumberMode);
          keywordpos = getKeywordPos("js", rest, jsKeywordMode);
          dotpos = getDotPos(rest, jsPropertyMode);
          if (
            Math.max(
              numpos[0],
              sfnuttpos[0],
              dfnuttpos[0],
              compos[0],
              comlinepos[0],
              keywordpos[0],
              dotpos[0]
            ) == -1
          ) {
            break;
          }
          mypos = getMinPos(
            numpos,
            sfnuttpos,
            dfnuttpos,
            compos,
            comlinepos,
            keywordpos,
            dotpos
          );
          if (mypos[0] == -1) {
            break;
          }
          if (mypos[0] > -1) {
            done += rest.substring(0, mypos[0]);
            done += mypos[2](rest.substring(mypos[0], mypos[1]));
            rest = rest.substr(mypos[1]);
          }
        }
        rest = done + rest;
        for (i = 0; i < esc.length; i++) {
          rest = rest.replace("W3JSESCAPE", esc[i]);
        }
        return "<span style=color:" + jscolor + ">" + rest + "</span>";
      }
      function jsStringMode(txt) {
        return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
      }
      function jsKeywordMode(txt) {
        return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
      }
      function jsNumberMode(txt) {
        return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
      }
      function jsPropertyMode(txt) {
        return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
      }
      function getDotPos(txt, func) {
        var x,
          i,
          j,
          s,
          e,
          arr = [
            ".",
            "<",
            " ",
            ";",
            "(",
            "+",
            ")",
            "[",
            "]",
            ",",
            "&",
            ":",
            "{",
            "}",
            "/",
            "-",
            "*",
            "|",
            "%",
          ];
        s = txt.indexOf(".");
        if (s > -1) {
          x = txt.substr(s + 1);
          for (j = 0; j < x.length; j++) {
            cc = x[j];
            for (i = 0; i < arr.length; i++) {
              if (cc.indexOf(arr[i]) > -1) {
                e = j;
                return [s + 1, e + s + 1, func];
              }
            }
          }
        }
        return [-1, -1, func];
      }
      function getMinPos() {
        var i,
          arr = [];
        for (i = 0; i < arguments.length; i++) {
          if (arguments[i][0] > -1) {
            if (arr.length == 0 || arguments[i][0] < arr[0]) {
              arr = arguments[i];
            }
          }
        }
        if (arr.length == 0) {
          arr = arguments[i];
        }
        return arr;
      }
      function getKeywordPos(typ, txt, func) {
        var words,
          i,
          pos,
          rpos = -1,
          rpos2 = -1,
          patt;
        if (typ == "js") {
          words = [
            "abstract",
            "arguments",
            "boolean",
            "break",
            "byte",
            "case",
            "catch",
            "char",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "double",
            "else",
            "enum",
            "eval",
            "export",
            "extends",
            "false",
            "final",
            "finally",
            "float",
            "for",
            "function",
            "goto",
            "if",
            "implements",
            "import",
            "in",
            "instanceof",
            "int",
            "interface",
            "let",
            "long",
            "NaN",
            "native",
            "new",
            "null",
            "package",
            "private",
            "protected",
            "public",
            "return",
            "short",
            "static",
            "super",
            "switch",
            "synchronized",
            "this",
            "throw",
            "throws",
            "transient",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "volatile",
            "while",
            "with",
            "yield",
          ];
        }
        for (i = 0; i < words.length; i++) {
          pos = txt.indexOf(words[i]);
          if (pos > -1) {
            patt = /\W/g;
            if (
              txt.substr(pos + words[i].length, 1).match(patt) &&
              txt.substr(pos - 1, 1).match(patt)
            ) {
              if (pos > -1 && (rpos == -1 || pos < rpos)) {
                rpos = pos;
                rpos2 = rpos + words[i].length;
              }
            }
          }
        }
        return [rpos, rpos2, func];
      }
      function getPos(txt, start, end, func) {
        var s, e;
        s = txt.search(start);
        e = txt.indexOf(end, s + end.length);
        if (e == -1) {
          e = txt.length;
        }
        return [s, e + end.length, func];
      }
      function getNumPos(txt, func) {
        var arr = [
          "<br>",
          " ",
          ";",
          "(",
          "+",
          ")",
          "[",
          "]",
          ",",
          "&",
          ":",
          "{",
          "}",
          "/",
          "-",
          "*",
          "|",
          "%",
          "=",
        ],
          i,
          j,
          c,
          startpos = 0,
          endpos,
          word;
        for (i = 0; i < txt.length; i++) {
          for (j = 0; j < arr.length; j++) {
            c = txt.substr(i, arr[j].length);
            if (c == arr[j]) {
              if (
                c == "-" &&
                (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")
              ) {
                continue;
              }
              endpos = i;
              if (startpos < endpos) {
                word = txt.substring(startpos, endpos);
                if (!isNaN(word)) {
                  return [startpos, endpos, func];
                }
              }
              i += arr[j].length;
              startpos = i;
              i -= 1;
              break;
            }
          }
        }
        return [-1, -1, func];
      }
    };
    highlightel(el, mode, colors);
    return el.innerHTML;
  },
  /**
   * Composes two functions together. Read more here: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
   * @function
   * @memberOf bijou
   * @returns {Function} The composed function.
   */
  composeFunction: (...functions) => (args) =>
    functions.reduceRight((arg, fn) => fn(arg), args),
  /**
   * Returns the curried version of a function. Read more here: https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb
   * @function
   * @memberOf bijou
   * @param
   * @returns {Function} The curried version of the function.
   */
  curryFunction: (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args),
  /**
   * Returns either "mobile" or "desktop" depending on which type of device the user is using.
   * @function
   * @memberOf bijou
   * @param
   * @returns {String} Either "mobile" or "desktop" depending on which type of device the user is using.
   */
  mobileOrDesktop: () => {
    throw node();
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  },
  /**
   * Removes tags from the HTML string specified.
   * @function
   * @memberOf bijou
   * @param {String} html The string of HTML to remove tags from.
   * @example
   * console.log(_$.removeTags("<div>Hello</div>"));//Logs "Hello" to the console.
   * @returns {String} THe string of HTML without the tags.
   */
  removeTags: (html) => html.replace(/<[^>]*>/g, ""),
  /**
   * camelCases a string.
   * @function
   * @memberOf bijou
   * @param {String} str The string of non-camelCased text.
   * @example
   * console.log(_$.camelCase("Hello world"));//Logs "helloWorld" to the console.
   * @returns {String} The camelCased string.
   */
  camelCase: (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  },
  /**
   * Scrambles the order of characters in a string. Thanks to @\Touchcreator for the suggestion for this.
   * @function
   * @memberOf bijou
   * @param {String} str The string to be scrambled
   * @example
   * console.log(_$.scrambleString("Hello world"));//Logs "owllH rdloe" to the console
   * @returns {String} The scrambled text.
   */
  scrambleString: (str) => {
    var a = str.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  },
  /**
   * Allows an element to be dragged and dropped.
   * @function
   * @memberOf bijou
   * @param {Element} el The element to be dragged (And dropped :P ).
   * @example
   * _$.drag(document.querySelector('div'));//Allows the first <div> on the page to be dragged.
   * @returns {Element} The element.
   */
  drag: (el) => {
    throw node();
    var initX, initY, mousePressX, mousePressY;
    el.addEventListener(
      "mousedown",
      function (event) {
        var style = window.getComputedStyle(el);
        el.style.top = style.getPropertyValue("top");
        el.style.left = style.getPropertyValue("left");
        el.style.right = style.getPropertyValue("right");
        el.style.bottom = style.getPropertyValue("bottom");
        this.style.position = "absolute";
        initX = this.offsetLeft;
        initY = this.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;
        this.addEventListener("mousemove", repositionElement, false);

        window.addEventListener(
          "mouseup",
          function () {
            el.removeEventListener("mousemove", repositionElement, false);
          },
          false
        );
      },
      false
    );

    function repositionElement(event) {
      this.style.left = initX + event.clientX - mousePressX + "px";
      this.style.top = initY + event.clientY - mousePressY + "px";
    }
    return el;
  },
  /**
   * Easing functions
   * @Object
   * @memberOf bijou
   * @example
   * _$.ease.easeInOutQuad(.3);//Returns the eased point of about 1/3 along the animation.
   * @returns {Function} The easing function.
   */
  ease: {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeInQuad: (t) => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    // accelerating from zero velocity
    easeInCubic: (t) => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t) => --t * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // accelerating from zero velocity
    easeInQuart: (t) => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: (t) => 1 - --t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    // accelerating from zero velocity
    easeInQuint: (t) => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: (t) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  },
  /**
   * Gets JSON from a URL and performs a callback with it.
   * @function
   * @memberOf bijou
   * @param {String} url The url of the JSON to be fetched.
   * @param {Function} callback The function to be run with the JSON code.
   * @example
   * _$.getJSON("http://date.jsontest.com/", (json) => {alert("The current time is " + json.time)})
   * @returns {undefined}
   */
  getJSON: (url, callback) => {
    throw node();
    fetch(url)
      .then((res) => res.json())
      .then((json) => callback(json))
      .catch((error) => { throw new Error(error.stack) });
  },
  /**
   * Gets HTML from a URL and performs a callback with it.
   * @function
   * @memberOf bijou
   * @param {String} url The url of the HTML to be fetched.
   * @param {Function} callback The function to be run with the HTML code.
   * @example
   * //Logs the HTML of wikipedia.org to the console.
   * _$.getHTML("https://wikipedia.org", (html) => console.log(html));
   * @returns {undefined}
   */
  getHTML: (url, callback) => {
    throw node();
    fetch(url)
      .then((res) => res.text())
      .then((html) => callback(_$.parseHTML(html)))
      .catch((error) => { throw new Error(error.stack) });
  },
  /**
   * Shuffles an array
   * @function
   * @memberOf bijou
   * @param {Array} array The array to shuffle.
   * @example
   * let array = [1,2,3,4,5];
   * array = _$.shuffleArray(array);
   * //array is now something like this: [2,4,1,5,3].
   * @returns {Array} The shuffled array.
   */
  shuffleArray: (array) => array.sort(() => Math.random() - 0.5),
  /**
   * Hashes a string to a unique integer (This cannot be decrypted easily).
   * @function
   * @memberOf bijou
   * @param {String} str The String to hash.
   * @param {Number} [seed=0] The seed of the hash.
   * @example
   * console.log(_$.hashString("Hello world"));//Logs 3494146707865688 to the console.
   * @returns {Number} The hashed string.
   */
  hashString: (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  },
  /**
   * Blends two colors through additive blending by a percentage.
   * @function
   * @memberOf bijou
   * @param {String} color1 The hex code of the first color to be blended
   * @param {String} color2 The hex code of the second color to be blended.
   * @param {Number} percent A number between 0 and 100 of the percentage to blend the two colors, 0 being completely the first color and 100 being completely the second color.
   * @example
   * _$.blendColors("#ffffff", "#000000", 80); Blends white and black together, ending up in a color that is 80% white and 20% black.
   * @returns {String} The blended color (A hex code).
   */
  blendColors: (color1, color2, percent = 50) => {
    const generateHex = (r, g, b) => {
      let R = r.toString(16);
      let G = g.toString(16);
      let B = b.toString(16);

      while (R.length < 2) {
        R = `0${R}`;
      }
      while (G.length < 2) {
        G = `0${G}`;
      }
      while (B.length < 2) {
        B = `0${B}`;
      }

      return `#${R}${G}${B}`;
    };

    const mix = (start, end, percent) =>
      start + (percent / 100) * (end - start);

    const red1 = parseInt(`${color1[1]}${color1[2]}`, 16);
    const green1 = parseInt(`${color1[3]}${color1[4]}`, 16);
    const blue1 = parseInt(`${color1[5]}${color1[6]}`, 16);

    const red2 = parseInt(`${color2[1]}${color2[2]}`, 16);
    const green2 = parseInt(`${color2[3]}${color2[4]}`, 16);
    const blue2 = parseInt(`${color2[5]}${color2[6]}`, 16);

    const red = Math.round(mix(red1, red2, percent));
    const green = Math.round(mix(green1, green2, percent));
    const blue = Math.round(mix(blue1, blue2, percent));

    return generateHex(red, green, blue);
  },
  /**
   * Gets the edit distance between two strings.
   * @function
   * @memberOf bijou
   * @param {String} a The first string
   * @param {String} b The seconds string
   * @example
   * _$.editDistance("hello", "Hello");//Returns 1
   * @returns {Number} The edit distance between two strings
   */
  editDistance: (a, b) => {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) == a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(
              matrix[i][j - 1] + 1, // insertion
              matrix[i - 1][j] + 1
            )
          ); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  },
  /**
   * Returns the size of a string in bytes.
   * @function
   * @memberOf bijou
   * @param {String} str
   * @example
   * console.log(_$.byteSize("Hello world"));//Logs
   * @returns {Number} The byte size of the string.
   */
  byteSize: (str) => new Blob([str]).size,
  /**
   * Get the siblings of a DOM element
   * @function
   * @memberOf bijou
   * @param {Element} e The element to get siblings of
   * @example
   * _.each(_$.elementSiblings(document.querySelector("li")), (el) => el.style.backgroundColor = 'white');
   * //Make every sibling of the first list item's background color white.
   * @returns {Element[]} The array of sibling elements.
   */
  elementSiblings: (n) => [...n.parentElement.children].filter((c) => c != n),
  /**
   * Preloads all of the image urls given in the arguments
   * @function
   * @memberOf bijou
   * @param {...String} urls The urls of the images to be preloaded.
   * @example
   * _$.preloadImage("https://unsplash.com/some_huge_image.png");//Preloads the unsplash image "some_huge_image.png" :P
   * @returns {undefined}
   */
  preloadImage: (urls) => {
    for (var i = 0; i < arguments.length; i++) {
      images[i] = new Image();
      images[i].src = preload.arguments[i];
    }
  },
  /**
* Finds and replace multiple values with multiple other values.
* @function
* @memberOf bijou
* @param {String} text The text to operate the replace on.
* @param {Object} replace The object with find and replace values.
* @example
* _$.replaceMultiple("I have a cat, a dog, and a goat.", {dog: "cat", goat: "dog", cat: "goat"});//Returns "I have a goat, a cat and a dog"
* @returns {String} The replaced string
*/
  replaceMultiple: (text, replace) => {
    var re = new RegExp(Object.keys(replace).join("|"), "gi");
    text = text.replace(re, function (matched) {
      return mapObj[matched];
    });
    return text;
  },
  /**
  * Returns the queries from a given url (Or just the current url)
  * @function
  * @memberOf bijou
  * @param {String} query The url query to get.
  * @param {String} [url=window.location.href] The url to find the query in. (By default this is the current url)
  * @example
  * //If the website adress of the current page was "https://example.com/?q=hello&hello=world"
  * console.log(_$.urlQuery("hello"));//Returns "world";
  * //Or on a custom url:
  * console.log(_$.urlQuery("q", "https://google.com/search?q=something"));//Would return "something"
  * @returns {String} The url query
  */
  urlQuery: (query, url = window.location.href) => {
    query = query.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + query + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },
  /**
  * Disables right click on the element spcified.
  * @function
  * @memberOf bijou
  * @param {Element} el The element to disable right click on.
  * @example
  * _$.disableRightClick(document.documentElement)
  * @returns {undefined}
  */
  disableRightClick: (el) => { throw node(); return el.oncontextmenu = false; },
  /**
  * Sanitizes an HTML string. It is quite possible that this is not production ready so use with caution. (I did my best though >=( )
  * @function
  * @memberOf bijou
  * @param {String} html The input string to sanitize.
  * @param {Array} [tags=undefined] The array of tags to allow, there is a default list though.
  * @param {Array} [attributes=undefined] The array of attributes to allow. By default only allows "href" and "src" attributes.
  * @example
  * _$.sanitizeHTML("<script>alert('hello')></script><b>A normal tag</b>");//Returns "<b>A normal tag</b>"
  * @returns {String} The sanitized HTML string.
  */
  sanitize: (html, tags = undefined, attributes = undefined) => {
    throw node();
    var attributes = attributes || [
      { attribute: "src", tags: "*", regex: /^(?:https|http|\/\/):/ },
      { attribute: "href", tags: "*", regex: /^(?!javascript:).+/ },
      { attribute: "width", tags: "*", regex: /^[0-9]+$/ },
      { attribute: "height", tags: "*", regex: /^[0-9]+$/ },
      { attribute: "id", tags: "*", regex: /^[a-zA-Z]+$/ },
      { attribute: "class", tags: "*", regex: /^[a-zA-Z ]+$/ },
      { attribute: "value", tags: ["INPUT", "TEXTAREA"], regex: /^.+$/ },
      { attribute: "checked", tags: ["INPUT"], regex: /^(?:true|false)+$/ },
      {
        attribute: "placeholder",
        tags: ["INPUT", "TEXTAREA"],
        regex: /^.+$/,
      },
      {
        attribute: "alt",
        tags: ["IMG", "AREA", "INPUT"],
        //"^" and "$" match beggining and end
        regex: /^[0-9a-zA-Z]+$/,
      },
      { attribute: "autofocus", tags: ["INPUT"], regex: /^(?:true|false)+$/ },
      { attribute: "for", tags: ["LABEL", "OUTPUT"], regex: /^[a-zA-Z0-9]+$/ },
    ];
    var tags = tags || [
      "I",
      "P",
      "B",
      "BODY",
      "HTML",
      "DEL",
      "INS",
      "STRONG",
      "SMALL",
      "A",
      "IMG",
      "CITE",
      "FIGCAPTION",
      "ASIDE",
      "ARTICLE",
      "SUMMARY",
      "DETAILS",
      "NAV",
      "TD",
      "TH",
      "TABLE",
      "THEAD",
      "TBODY",
      "NAV",
      "SPAN",
      "BR",
      "CODE",
      "PRE",
      "BLOCKQUOTE",
      "EM",
      "HR",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "DIV",
      "MAIN",
      "HEADER",
      "FOOTER",
      "SELECT",
      "COL",
      "AREA",
      "ADDRESS",
      "ABBR",
      "BDI",
      "BDO",
    ];

    attributes = attributes.map((el) => {
      if (typeof el === "string") {
        return { attribute: el, tags: "*", regex: /^.+$/ };
      }
      let output = el;
      if (!el.hasOwnProperty("tags")) {
        output.tags = "*";
      }
      if (!el.hasOwnProperty("regex")) {
        output.regex = /^.+$/;
      }
      return output;
    });
    var el = new DOMParser().parseFromString(html, "text/html");
    var elements = el.querySelectorAll("*");
    for (let i = 0; i < elements.length; i++) {
      const current = elements[i];
      let attr_list = get_attributes(current);
      for (let j = 0; j < attr_list.length; j++) {
        const attribute = attr_list[j];
        if (!attribute_matches(current, attribute)) {
          current.removeAttribute(attr_list[j]);
        }
      }
      if (!tags.includes(current.tagName)) {
        current.remove();
      }
    }
    return el.documentElement.innerHTML;
    function attribute_matches(element, attribute) {
      let output = attributes.filter((attr) => {
        let returnval =
          attr.attribute === attribute &&
          (attr.tags === "*" || attr.tags.includes(element.tagName)) &&
          attr.regex.test(element.getAttribute(attribute));
        return returnval;
      });

      return output.length > 0;
    }
    function get_attributes(element) {
      for (
        var i = 0, atts = element.attributes, n = atts.length, arr = [];
        i < n;
        i++
      ) {
        arr.push(atts[i].nodeName);
      }
      return arr;
    }
  },
  /**
  * Converts all of the styles for an element to inline CSS. This is nice for production sites because it means that they will look the same on all browsers. (Because it uses computed style.)
  * @function
  * @memberOf bijou
  * @param {Element} el The element to convert.
  * @example
  * _$.inlineCSS(document.querySelector("h1"));//Converts the styles for the <h1> element to inline using the style="___" attribute
  * @returns {undefined}
  */
  inlineCSS: (el) => {
    throw node();
    s = getComputedStyle(el);

    for (let key in s) {
      let prop = key.replace(/\-([a-z])/g, v => v[1].toUpperCase());
      el.style[prop] = s[key];
    }
  },
  /**
  * Saves a blob as a file!
  * @function
  * @memberOf bijou
  * @param {Blob} blob The blob to save as a file.
  * @param {String} [fileName=output.txt] The name of the output file (Must include the extension.)
  * @example
  * _$.saveBlob(new Blob(["Yay! I'm in a text file!"]), "Cool file.txt");
  * @returns {undefined}
  */
  saveBlob: (blob, fileName = "output.txt") => {
    throw node();
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  },
  /**
  * Deep clones an object
  * @function
  * @memberOf bijou
  * @param {Object} object The object to clone.
  * @returns {Object} The output cloned object.
  */
  clone: (object) => { throw node(); return JSON.parse(JSON.stringify(object)) },
  /**
 * Converts markdown to HTML. 
 * @param {String} src The markdown to convert to HTML.
 * @memberOf bijou
 * @function
 * @example
 * _$.markdownToHTML("_Italic text_, **bold text**");//Returns "<em>Italic text</em>, <b>bold text</b>"
 * @returns {String} The string of HTML converted from the markdown input.
 */
  markdownToHTML: (src) => {

    var rx_lt = /</g;
    var rx_gt = />/g;
    var rx_space = /\t|\r|\uf8ff/g;
    var rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
    var rx_hr = /^([*\-=_] *){3,}$/gm;
    var rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
    var rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
    var rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
    var rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
    var rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g;
    var rx_link = /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
    var rx_table = /\n(( *\|.*?\| *\n)+)/g;
    var rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
    var rx_row = /.*\n/g;
    var rx_cell = /\||(.*?[^\\])\|/g;
    var rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
    var rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
    var rx_stash = /-\d+\uf8ff/g;

    function replace(rex, fn) {
      src = src.replace(rex, fn);
    }

    function element(tag, content) {
      return '<' + tag + '>' + content + '</' + tag + '>';
    }

    function blockquote(src) {
      return src.replace(rx_blockquote, function (all, content) {
        return element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, ''))));
      });
    }

    function list(src) {
      return src.replace(rx_list, function (all, ind, ol, num, low, content) {
        var entry = element('li', highlight(content.split(
          RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g')).map(list).join('</li><li>')));

        return '\n' + (ol
          ? '<ol start="' + (num
            ? ol + '">'
            : parseInt(ol, 36) - 9 + '" style="list-style-type:' + (low ? 'low' : 'upp') + 'er-alpha">') + entry + '</ol>'
          : element('ul', entry));
      });
    }

    function highlight(src) {
      return src.replace(rx_highlight, function (all, _, p1, emp, sub, sup, small, big, p2, content) {
        return _ + element(
          emp ? (p2 ? 'strong' : 'em')
            : sub ? (p2 ? 's' : 'sub')
              : sup ? 'sup'
                : small ? 'small'
                  : big ? 'big'
                    : 'code',
          highlight(content));
      });
    }

    function unesc(str) {
      return str.replace(rx_escape, '$1');
    }

    var stash = [];
    var si = 0;

    src = '\n' + src + '\n';

    replace(rx_lt, '&lt;');
    replace(rx_gt, '&gt;');
    replace(rx_space, '  ');

    // blockquote
    src = blockquote(src);

    // horizontal rule
    replace(rx_hr, '<hr/>');

    // list
    src = list(src);
    replace(rx_listjoin, '');

    // code
    replace(rx_code, function (all, p1, p2, p3, p4) {
      stash[--si] = element('pre', element('code', p3 || p4.replace(/^    /gm, '')));
      return si + '\uf8ff';
    });

    // link or image
    replace(rx_link, function (all, p1, p2, p3, p4, p5, p6) {
      stash[--si] = p6 ? p6 : p2
        ? p4
          ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
          : p1
        : '<a href="' + p4 + '">' + unesc(highlight(p3)) + '</a>';
      return si + '\uf8ff';
    });

    // table
    replace(rx_table, function (all, table) {
      var sep = table.match(rx_thead)[1];
      return '\n' + element('table',
        table.replace(rx_row, function (row, ri) {
          return row == sep ? '' : element('tr', row.replace(rx_cell, function (all, cell, ci) {
            return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
          }))
        })
      )
    });

    // heading
    replace(rx_heading, function (all, _, p1, p2) { return _ + element('h' + p1.length, unesc(highlight(p2))) });

    // paragraph
    replace(rx_para, function (all, content) { return element('p', unesc(highlight(content))) });

    // stash
    replace(rx_stash, function (all) { return stash[parseInt(all)] });

    return src.trim();
  },
  /**
   * Animates a number from one value to another.
   * @function
   * @memberOf bijou
   * @param {Number} start The initial value of the number in the animation
   * @param {Number} end The final value of the number in the animation
   * @param {Number} duration The duration of the animation in milliseconds
   * @param {Function} callback The callback function to run with the number and the percentage (Between 0 and 1) of the animation.
   * @param {Number} [interval=20] The amount of time to wait between frames in milliseconds.
   * @param {Function} num The function to run to manipulate the timing of the animation, for example setting this to (current_number) => current_number **2 would make a simple ease in function. (The value recieved by this is also between 0 and 1, feel free to use some stuff from _$.ease.FUNCTION_HERE(current_number) to incorporate easy easing!)
   * @example
   * Animates from 50 to 100 over the course of 3 seconds, updating every half second, and writing the current value to the document body.
   * _$.animate(50,100, 3000, (e) => document.body.innerHTML = (Math.round(e)), 500, (num) => _$.ease.easeInOutQuart(num));
   */
  animate: (
    start,
    end,
    duration,
    callback,
    interval = 20,
    num = (num) => num,
  ) => {
    var value = start;
    var steps = duration / interval;
    var step = 0;
    var start_time = Date.now();
    var percentage = 0;
    let update = setInterval(() => {
      value = num((Date.now() - start_time) / duration) * (end - start) + start;
      callback(value, num((Date.now() - start_time) / duration));
    }, interval);
    setTimeout(() => {
      clearInterval(update);
      callback(end, 1);
      return;
    }, duration);
  },
  requestInterval: function (fn, delay) {
    var requestAnimFrame = (function () {
      return window.requestAnimationFrame || function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
    })(),
      start = new Date().getTime(),
      handle = {};
    function loop() {
      handle.value = requestAnimFrame(loop);
      var current = new Date().getTime(),
        delta = current - start;
      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }
    }
    handle.value = requestAnimFrame(loop);
    return handle;
  },
  /**
   * A set of functions to set and modify cookies.
   * @memberOf bijou
   * @Object
   * @example
   * _$.cookies.setItem("a_cookie", "Hello world!", 1);//Set a_cookie to "Hello world" and have it expire in a day.
   * @returns {Function} The function that the user wanted
   */
  cookies: {
    /**
     * Sets a cookie to a value
     * @function
     * @memberOf bijou
     * @param {String} name The name of the cookie to set
     * @param {String} value The value of the cookie
     * @param {Number} [days=1000] The days that the cookie should last.
     * @returns {String} The value of the cookie
     */
    setItem: (name, value, days = 1000) => {
      throw node();
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    /**
     * Gets a cookie from its name.
     * @function
     * @memberOf bijou
     * @param {String} name The name of the cookie.
     * @returns {String} The value of the cookie
    */
    getItem: (name) => {
      throw node();

      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    /**
     * Deletes a cookie
     * @memberOf bijou
     * @param {String} name The name of the cookie to delete.
     * @returns {undefined}
     */
    removeItem: (name) => {
      throw node();

      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
  },
  /**
   * A collection of regular expressions to validate and get common things from a page
   * @memberOf bijou
   * @Object
   * @example
   * if (_$.regex.email.test("email@gmail.com") alert("That is a valid email!")
   * @returns {Regexp} A regex
   */
  regex: {
    /**
     * Valid formats:
     * (123) 456-7890
     * (123)456-7890
     * 123-456-7890
     * 123.456.7890
     * 1234567890
     * +31636363634
     * 075-63546725
     */
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    /** Validates names, examples:
     * John Smith
     * John D'Largy
     * John Doe-Smith
     * John Doe Smith
     * Hector Sausage-Hausen
     * Mathias d'Arras
     * Martin Luther King
     * Ai Wong
     * Chao Chang
     * Alzbeta Bara
     */
    name: /^(?:[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?(?:[a-zA-Z]{1,})?)/,
    /**
    Validates email adresses
    */
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    /** Validates a link
     */
    link: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
    /** 
     * Tests for a strong password.
     * Should have:
     * 1 lowercase letter
     * 1 uppercase letter
     * 1 number
     * 1 special character 
     * At least 8 characters long
    */
    strongPassword: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    /**
     * Tests for a moderate password.
     * Should have:
     * 1 lowercase letter
     * 1 uppercase letter
     * 1 number 
     * At least 8 characters long */
    moderatePassword: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
    /** Ip adresses */
    /* Match IPv4 address */
    ipv4: /^ (([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2}| 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3 } ([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5]) $ /,
    /* Match IPv6 address */
    ipv6: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
    /**Both ipv4 and ipv6 */
    ip: / ((^\s*((([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2} | 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3}([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5])) \s * $)| (^\s * ((([0 - 9A - Fa - f]{ 1, 4 }:) { 7 } ([0 - 9A - Fa - f]{ 1, 4 }|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 6 } (: [0 - 9A - Fa - f]{ 1, 4 }| ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 5 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 2 })|: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 4 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 3 })| ((: [0 - 9A - Fa - f]{ 1, 4 })?: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 3 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 4 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 2 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 2 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 5 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 3 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 1 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 6 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 4 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (: (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 7 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 5 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))) (%.+) ?\s * $)) /,
    /**Social security number */
    socialSecurity: /^((?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|((?!219 09 9999|078 05 1120)(?!666|000|9\d{2})\d{3} (?!00)\d{2} (?!0{4})\d{4})|((?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4})$/,
    /**Hex color */
    hex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    /** Zip code */
    zipCode: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/,
    /**Phone */
    phone: /^\+?[\d\s]{3,}$/,
    /**Credit cards */
    visaCredit: /^4[0–9]{12}(?:[0–9]{3})?$/,
    expressCredit: /^3[47][0–9]{13}$/,
    mastercardCredit: /^(?:5[1–5][0–9]{2}|222[1–9]|22[3–9][0–9]|2[3–6][0–9]{2}|27[01][0–9]|2720)[0–9]{12}$/,
    discoverCredit: /^6(?:011|5[0–9]{2})[0–9]{12}$/,
  }
};
// Sort the object
_temp = _temp.sortObj(_temp);

// Imports and exports
const _$ = _temp;
const _ = _temp;
const explosion = _temp;
if (isNode) {
  module.exports = _temp;
}
