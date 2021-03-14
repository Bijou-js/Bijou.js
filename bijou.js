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
║ retronbv          ║ Suggested a lot of         ║
║                   ║ features and bug fixes.    ║
║═══════════════════║════════════════════════════║
║ thecoder876       ║ Made some improvements.    ║
╚═══════════════════╩════════════════════════════╝


(c) 2021 Explosion-Scratch, all rights reserved.

 */

let isNode = false;
if (
  typeof window === 'undefined' ||
  typeof document === 'undefined'
) {
  isNode = true;
} else {
  isNode = false;
}

if (isNode) {
  console.warn(
    'There is no document element in Node, some functions of bijou.js will not work. If you need these functions consider using a package like jsDom to recreate the document element.',
  );
}
/**
 * @description Tests if the user is using Node.js or not and throws an error in specific functions (that require the DOM) if they are.
 */
let node = () => {
  if (isNode) {
    throw new Error(
      'You are using Node.js, this function does not work in Node.js! Sorry!',
    );
  }
};
/*
  ____   ___  _   _ ____   ____ _____
 / ___| / _ \| | | |  _ \ / ___| ____|
 \___ \| | | | | | | |_) | |   |  _|
  ___) | |_| | |_| |  _ <| |___| |___
 |____/ \___/ \___/|_| \_\\____|_____|
*/
//#region bijou
//#region Array

/**
 * Returns the difference between two arrays or strings.
 * @memberOf array
 * @function
 * @returns {Array|String} The difference between two arrays or strings.
 * @example
 * console.log(_$.arrayDiff(['a', 'b'], ['a', 'b', 'c', 'd'])); // ["c", "d"]
 * @param {Array|String} a1 The first array or string
 * @param {Array|String} a2 The 2nd array or string.
 */
export let arrayDiff = (a1, a2) => {
  var a = [],
    diff = [];
  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }
  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }
  for (var k in a) {
    diff.push(k);
  }
  return diff;
};

/**
 * Gets the difference between two strings.
 * @memberOf array
 * @function
 * @param {String} text1 The 1st text to compare
 * @param {String} text2 The 2nd text to compare with the 1st one.
 * @example
 * console.log(_$.diff("hello earthlings", "hello world"); // [[6,8],[9,16]]
 * @returns {Array.<Array.<number>>} An array of arrays, each array in the main array contains 2 numbers, the start and then end of the difference.
 */
export let diff = function (text1, text2) {
  //Takes in two strings
  //Returns an array of the span of the differences
  //So if given:
  // text1: "that is number 124"
  // text2: "this is number 123"
  //It will return:
  // [[2,4],[17,18]]
  //If the strings are of different lengths, it will check up to the end of text1
  //If you want it to do case-insensitive difference, just convert the texts to lowercase before passing them in
  var diffRange = [];
  var currentRange = undefined;
  for (var i = 0; i < text1.length; i++) {
    if (text1[i] != text2[i]) {
      //Found a diff!
      if (currentRange == undefined) {
        //Start a new range
        currentRange = [i];
      }
    }
    if (currentRange != undefined && text1[i] == text2[i]) {
      //End of range!
      currentRange.push(i);
      diffRange.push(currentRange);
      currentRange = undefined;
    }
  }
  //Push any last range if there's still one at the end
  if (currentRange != undefined) {
    currentRange.push(i);
    diffRange.push(currentRange);
  }
  return diffRange;
};

/**
 * Removes an item from the array specified.
 * @memberOf array
 * @function
 * @param {Array} array The array to remove the item from.
 * @param {*} item The item to remove.
 * @example
 * console.log(_$.remove([5, 4, 3, 2, 1], 4)); // [5, 3, 2, 1]
 */
export let remove = (array, item) => {
  if (typeof array === 'string') {
    return array.replace(item, '');
  }
  if (typeof array === 'object') {
    array[`${item}`] = undefined;
    array = _$.clone(array, (itm) => itm !== undefined);
    return array;
  }
  if (array.indexOf(item) > -1) {
    array.splice(array.indexOf(item), 1);
  }
  return array;
};
/**
 * Splices an ArrayBuffer.
 * @function
 * @memberOf array
 * @param {ArrayBuffer|Buffer} arr The ArrayBuffer to splice.
 * @param {Number} start The start index.
 * @param {Number} end The end index.
 * @param {Boolean} [endian=false] Whether to use big endian or not.
 * @returns {Number} The hex representation of part of the ArrayBuffer.
 */
export let spliceArrayBuffer = (arr, start, end, endian = false) => {
  var direction = endian ? -1 : 1;
  if (endian) [start, end] = [end, start];
  start = Math.floor(start);
  end = Math.floor(end) + direction;
  for (var i = start, value = 0; i != end; i += direction)
    value = 256 * value + arr[i];
  return value;
};

/**
 * Flattens an array `level` times.
 * @memberOf array
 * @function
 * @returns {Array} The flattened array.
 * @example
 * console.log(_$.flatten(['a', 'b', ['c', 'd']])); // ['a', 'b', 'c', 'd'];
 * @param {Array} array The array to flatten.
 * @param {Number} [level=1] The number of iterations to flatten it.
 */
export let flatten = (array, level = 1) => {
  var output = array;
  _$.each(level, () => {
    output = [].concat.apply([], array);
  });
  return output;
};

/**
 * Flattens an array recursively.
 * @function
 * @memberOf array
 * @param {Array} arr The array to flatten.
 * @returns {Array} The flattened array.
 * @example
 * console.log(_$.nFlatten([5,[[9,4],0],[7,6]])); // [5,9,4,0,6,7]
 */
export let nFlatten = (arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten,
    );
  }, []);
};

/**
 * Returns whether the specified array or string contains the item given.
 * @memberOf array
 * @function
 * @param {Array} array The array to test with.
 * @param {String} item The item to see if the array contains.
 * @example
 * console.log(_$.contains([1,2,3,4,5], 3)); // true
 * @returns {Boolean} True or false depending on if the array contains that item.
 */
export let contains = (array, item) => array.includes(item);

/**
 * Shuffles an array
 * @function
 * @memberOf array
 * @param {Array} array The array to shuffle.
 * @example
 * let array = [1,2,3,4,5];
 * console.log(_$.shuffleArray(array)); // e.g. [2,4,1,5,3]
 * @returns {Array} The shuffled array.
 */
export let shuffleArray = (array) =>
  array.sort(() => Math.random() - 0.5);

/**
 * Splice but also for strings
 * @memberOf array
 * @function
 * @param {String|Array} array The array or string to operate on
 * @param {Number} index The index to splice
 * @param {*} item The item
 * @param {Number} [remove=0] How many to remove.
 * @returns {String|Array} the spliced array or string
 * @example
 * console.log(_$.splice("hello earthlings", 5, " puny")); // "hello puny earthlings"
 */
export let splice = (array, index, remove = 0, item) => {
  let args = Array.from(arguments);
  args.shift();
  return typeof array === 'string'
    ? array
        .split('')
        .splice(...args)
        .join('')
    : array.splice(...args);
};
/**
 * Joins two arrays together and removes duplicate items.
 * @function
 * @memberOf array
 * @param {Array} x The first array to join.
 * @param {Array} y The second array to join.
 * @example
 * console.log(_$.unionArrays([1,2,3,4], [4,5,6])); // [1,2,3,4,5,6]
 * @returns {Array} The joined array from the two other arrays.
 */
export let unionArrays = (x, y) => {
  var obj = {};
  for (var i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
  for (var i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
  var res = [];
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) res.push(obj[k]);
  }
  return res;
};
/**
 * averageBy
 * @function
 * @memberOf array
 * @param {Array.<number>} arr The array to average
 * @param {Function} fn The function to apply to each item of the array.
 * @example
 * Logs the average of the first 4 square numbers:
 * console.log(_$.averageBy([1,2,3,4], (v) => v ** 2)); // 7.5
 * @returns {Number} The average of the array.
 */
export let averageBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;

/**
 * Removes duplicates from an array
 * @function
 * @memberOf array
 * @param {Array} array The array to remove duplicates from.
 * @example
 * console.log(_$.uniqueArray([1,1,2,3,4,4,4,5,6)); // [1,2,3,4,5,6]
 * @returns {Array} The array with no duplicates.
 */
export let uniqueArray = (array) => [...new Set(array)];
/**
 * For each item in an array, run a callback with it.
 * @function
 * @memberOf array
 * @param {Array|String|Number} array The array, string or number to run the callback with.
 * @param {Function} callback The callback function to run on the array items.
 * @example
 * _$.each(new Array(6), (array_item, i) => console.log(i));
 * // 0
 * // 1
 * // 2
 * // 3
 * // 4
 * // 5
 * @returns {undefined}
 */
export let each = (array, callback) => {
  array =
    typeof array === 'number'
      ? _$.range(1, array)
      : typeof array === 'string'
      ? array.split('')
      : array;
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
};
//#endregion Array
//#region Color
/**
 * Converts a rgb(a) color to hex.
 * @memberOf color
 * @function
 * @example
 * console.log(_$.rgbToHex("rgb(255,255,255)")); // "#ffffff"
 * @param {String} rgb The string of RGB colors.
 * @returns {String} The hex color.
 */
export let rgbToHex = (rgb) => {
  let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  rgb = rgb.substr(4).split(')')[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;

  return '#' + r + g + b;
};
/**
 * Converts a hex code to a RGB color.
 * @function
 * @memberOf color
 * @param {String} hex The hex code to convert.
 * @example
 * console.log(_$.rgbToHex("#ffffff")); // "rgb(255,255,255)"
 * @returns {String} The RGB color converted from the hex code.
 */
export let hexToRGB = (hex) => {
  if (
    ((hex.length - 1 === 6 ||
      hex.length - 1 === 8 ||
      hex.length - 1 === 4 ||
      hex.length - 1 === 3) &&
      hex.startsWith('#')) ||
    ((hex.length === 6 ||
      hex.length === 8 ||
      hex.length === 4 ||
      hex.length === 3) &&
      !hex.startsWith('#'))
  ) {
  } else {
    throw new Error('Invalid hex');
  }
  let alpha = false,
    h = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join('');
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    'rgb' +
    (alpha ? 'a' : '') +
    '(' +
    (h >>> (alpha ? 24 : 16)) +
    ', ' +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ', ' +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : '') +
    ')'
  );
};
/**
 * Blends two colors through additive blending by a percentage.
 * @function
 * @memberOf color
 * @param {String} color1 The hex code of the first color to be blended
 * @param {String} color2 The hex code of the second color to be blended.
 * @param {Number} [percent=50] A number between 0 and 100 of the percentage to blend the two colors, 0 being completely the first color and 100 being completely the second color.
 * @example
 * console.log(_$.blendColors("#ffffff", "#000000", 80)); // #333333
 * @returns {String} The blended color (A hex code).
 */
export let blendColors = (color1, color2, percent = 50) => {
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
};
/**
 * Generates a random hex color.
 * @function
 * @memberOf color
 * @example
 * console.log(_$.randomColor()); // e.g. #5bf462
 * @returns {String} A random Hex color
 */
export let randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
/**
 * Lighten or darken a color by a certain amount
 * @function
 * @memberOf color
 * @param {String} color The color to lighten/darken
 * @param {Number} amt The amount to lighten the color (out of 255).
 * @example
 * _$.lightenColor("#000000", 50); // #323232
 * @returns {String} The color lightened.
 */
export let lightenColor = (col, amt) => {
  var usePound = false;

  if (col[0] == '#') {
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

  return (
    (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
  );
};
/**
  * Tests if a color is light or dark and returns an object representation.
  * @function
  * @memberOf color
  * @param {string} color The hex color to test.
  * @example
  * if (_$.lightOrDark("#333333").lightOrDark === 'dark'){
    document.querySelector("DIV").style.color = "white";
  } else {
      document.querySelector("DIV").style.color = "black";
  }
  * @returns {Object} An object that represents if the color is light or dark and how much. The object key "hsp" represents a value out of 255 of how light the color is and the object's key "lightOrDark" is a string (Either "light" or "dark") of whether the color is light or dark.
  */
export let lightOrDark = (color) => {
  var r, g, b, hsp;
  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    color = +(
      '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
    );

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  hsp = Math.sqrt(
    0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b),
  );
  if (hsp > 127.5) {
    return { lightOrDark: 'light', hsp: hsp };
  } else {
    return { lightOrDark: 'dark', hsp: hsp };
  }
};
//#endregion Color
//#region Date
/**
 * Returns the name of the weekday from the Date object specified.
 * @function
 * @memberOf date
 * @param {Date} [date=new Date()] The date object to use.
 * @param {String} [locale=en-US] The locale to use.
 * @example
 * console.log(_$.dayName)); // e.g. "Friday"
 * @returns {String} The day name from the date.
 */
export let dayName = (date = new Date(), locale = 'en-US') =>
  date.toLocaleDateString(locale, {
    weekday: 'long',
  });

/**
 * Formats a number of milliseconds
 * @function
 * @memberOf date
 * @param {Number|String} ms The number of milliseconds to format to a string.
 * @example
 * console.log(_$.formatMilliseconds(1324765128475)); // "1 century, 7 years, 2 days, 22 hours, 18 minutes, 48 seconds, 475 milliseconds"
 * @returns {String} The string of formatted milliseconds.
 */
export let formatMilliseconds = (ms) => {
  ms = typeof ms === 'string' ? +ms : ms;
  if (ms < 0) ms = -ms;
  const time = {
    century: Math.floor(ms / 1144800000000),
    year: Math.floor(ms / 22896000000) % 50,
    day: Math.floor(ms / 86400000) % 365,
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
    .join(', ');
};
//#endregion Date
//#region Element
/**
 * Create a DOM element from a querySelector with option to include content
 * @memberOf element
 * @param {String} querySelector (optional) default to div
 * @param {...*} [content] (optional) String|Number|DOMElement
 * @returns DOMElement
 *
 * @example
 * - createElement(); // <div>
 * - createElement('span#my-id.my-class.second-class'); // <span id="my-id" class="my-class second-class">
 * - createElement('#my-id.my-class.second-class', 'text to insert', 12345); // <div id="my-id" class="my-class second-class">
 */
export function create(querySelector = 'div', ...content) {
  let nodeType = querySelector.match(/^[a-z0-9]+/i);
  let id = querySelector.match(/#([a-z]+[a-z0-9-]*)/gi);
  let classes = querySelector.match(/\.([a-z]+[a-z0-9-]*)/gi);
  let attributes = querySelector.match(
    /\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi,
  );
  let node = nodeType ? nodeType[0] : 'div';

  if (id && id.length > 1) {
    throw new Error('only 1 ID is allowed');
  }

  const elt = document.createElement(node);

  if (id) {
    elt.id = id[0].replace('#', '');
  }

  if (classes) {
    const attrClasses = classes.join(' ').replace(/\./g, '');
    elt.setAttribute('class', attrClasses);
  }

  if (attributes) {
    attributes.forEach((item) => {
      item = item.slice(0, -1).slice(1);
      let [label, value] = item.split('=');
      if (value) {
        value = value.replace(/^['"](.*)['"]$/, '$1');
      }
      elt.setAttribute(label, value || '');
    });
  }

  content.forEach((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      elt.appendChild(document.createTextNode(item));
    } else if (item.nodeType === document.ELEMENT_NODE) {
      elt.appendChild(item);
    }
  });

  return elt;
}
/**
 * Re-enables the use of &lt;menu&gt; and &lt;menuitem&gt; tags for corner clicking.
 * @memberOf element
 * @function
 * @example
 * //HTML:
 * ```
 * <h1 contextmenu="menu">Corner click me</h1>
 * <menu>
 *  <menuitem label="An item!">
 *  <menuitem label="Another item!">
 * </menu>
 * ```
 * //JS
 * _$.context();
 * // Now the user can corner click the items that have parents with a "contextmenu" attribute! Try it out here: https://bcs88.csb.app/
 * @returns {undefined};
 */
export let context = () => {
  var menu = document.createElement('UL');
  menu.id = 'contextMenu';
  document.body.appendChild(menu);
  let styles = document.createElement('STYLE');
  styles.innerHTML = `#contextMenu {
       pointer-events: none;
       padding: 0;
       opacity: 0;
       transition: opacity .3s ease;
       position: fixed;
       padding-top: 3px;
       padding-bottom: 3px;
       max-height: 200px;
       overflow-y: scroll;
       overflow-x: hidden;
       list-style: none;
       z-index: 10000;
       background: white;
       color: #333;
       font-family: sans-serif;
       border-radius: 5px;
       box-shadow: 2px 2px 5px #0004;
       width: fit-content;
       min-width: 50px;
       max-width: 150px;
     }
     #contextMenu li {
       transition: background-color .3s ease;
       display: block;
       min-width: 150px;
       margin: 0;
       padding: 10px;
     }
     #contextMenu li:hover {
       background-color: #ddd;
       cursor: pointer;
     }
     `;
  document.body.appendChild(styles);
  var elements = document.querySelectorAll('[contextmenu]');
  for (let i = 0; i < elements.length; i++) {
    window.addEventListener('contextmenu', (e) => {
      menu.style.pointerEvents = 'auto';
      let items;
      try {
        items = document.querySelectorAll(
          `#${e.target
            .closest('[contextmenu]')
            .getAttribute('contextmenu')} menuitem`,
        );
        e.preventDefault();
      } catch (e) {
        return true;
      }
      menu.innerHTML = '';
      for (let j = 0; j < items.length; j++) {
        const contextMenu = items[j];
        const liTag = document.createElement('li');
        liTag.onclick = contextMenu.getAttribute('onclick');
        liTag.textContent = contextMenu.getAttribute('label');
        menu.innerHTML += liTag.outerHTML;
      }
      console.log(menu.innerHTML);
      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;
      menu.style.opacity = 1;
    });
  }
  var contextTimer = 0;
  requestInterval(() => {
    contextTimer += 100;
    if (contextTimer > 3000) {
      menu.style.opacity = 0;
      menu.style.pointerEvents = 'none';
      contextTimer = 0;
      return;
    }
  }, 100);
  addEventListeners(menu, ['mousemove', 'click', 'scroll'], () => {
    contextTimer = 0;
  });
  onOutsideClick(menu, () => {
    menu.style.opacity = 0;
    menu.style.pointerEvents = 'none';
  });
};
/**
 * Tests whether the specified element is fully in view.
 * @function
 * @memberOf element
 * @param {Element} el The DOM element to test.
 * @example
 * // Alerts "In view!" if the first <div> in the document is in view.
 * if (_$.inView(document.querySelector("div"))) alert("In view!");
 * @returns {Boolean} Whether the element is completely in view.
 */
export let inView = (el) => {
  node();
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
};
/**
 * Tests if the given DOM element is partially (or fully) in view.
 * @function
 * @memberOf element
 * @param {Element} el The element to test.
 * @example
 * // Alerts "In view!" if the first <div> in the document is partially or fully view.
 * if (_$.inPartialView(document.querySelector("div"))) alert("In view!");
 * @returns {Boolean} Whether the DOM element is partially in view.
 */
export let inPartialView = (el) => {
  node();
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
};
/**
 * Converts a form to URL queries using the name attribute.
 * @function
 * @memberOf element
 * @param {HTMLFormElement} form The form element.
 * @returns {String} The string of url queries (Excluding the hostname and path) of the form data.
 */
export let serializeForm = (form) => {
  node();
  return Array.from(new FormData(form), (field) =>
    field.map(encodeURIComponent).join('='),
  ).join('&');
};

/**
 * Replaces the text in an element by running it through a callback.
 * @function
 * @memberOf element
 * @param {Element} el The element to replace the text of.
 * @param {Function} callback The callback to run (Gets passed the element's text).
 * @example
 * _$.replaceText(document.querySelector("div"), (text) => text.toUpperCase());
 * // Converts the text of the first <div> element to upperCase.
 * @returns {undefined}
 */
export let replaceText = (el, callback) => {
  node();
  _$.each(_$.textNodes(el), (node) => {
    node.textContent = callback(node.textContent);
  });
};
/**
 * Gets a list of all the text nodes in an element
 * @memberOf element
 * @function
 * @param {Element} el The element to get the text nodes of.
 * @returns {Array} The text nodes.
 * @example
 * _$.textNodes(document.querySelector("h1"))[0].textContent = "hello world"; // replaces the text with "hello world" without deleting other elements
 */
export let textNodes = (el) => {
  return [...el.childNodes].filter((node) => {
    return (
      node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== ''
    );
  });
};
/**
 * Generates a querySelector for an element passed in.
 * @function
 * @memberOf element
 * @param {Element} elem The element to generate the querySelector for.
 * @example
 * const textarea = document.getElementById('textarea');
 * console.log(_$.querySelector(textarea)); //Logs "#textarea" to the console.
 * @returns {String} The generated querySelector.
 */
export let querySelector = (elem) => {
  node();
  var element = elem;
  var str = '';

  function loop(element) {
    if (
      element.getAttribute('id') &&
      document.querySelectorAll(`#${element.getAttribute('id')}`)
        .length === 1
    ) {
      str = str.replace(/^/, ' #' + element.getAttribute('id'));
      str = str.replace(/\s/, '');
      str = str.replace(/\s/g, ' > ');
      return str;
    }
    if (document.body === element) {
      str = str.replace(/^/, ' body');
      str = str.replace(/\s/, '');
      str = str.replace(/\s/g, ' > ');
      return str;
    }
    if (element.getAttribute('class')) {
      var elemClasses = '.';
      elemClasses += element.getAttribute('class');
      elemClasses = elemClasses.replace(/\s/g, '.');
      elemClasses = elemClasses.replace(/^/g, ' ');
      var classNth = '';
      var childrens = element.parentNode.children;

      if (childrens.length < 2) {
        return;
      }

      var similarClasses = [];

      for (var i = 0; i < childrens.length; i++) {
        if (
          element.getAttribute('class') ==
          childrens[i].getAttribute('class')
        ) {
          similarClasses.push(childrens[i]);
        }
      }

      if (similarClasses.length > 1) {
        for (var j = 0; j < similarClasses.length; j++) {
          if (element === similarClasses[j]) {
            j++;
            classNth = ':nth-of-type(' + j + ')';
            break;
          }
        }
      }

      str = str.replace(/^/, elemClasses + classNth);
    } else {
      var name = element.nodeName;
      name = name.toLowerCase();
      var nodeNth = '';

      childrens = element.parentNode.children;

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
              nodeNth = ':nth-of-type(' + j + ')';
              break;
            }
          }
        }
      }

      str = str.replace(/^/, ' ' + name + nodeNth);
    }

    if (element.parentNode) {
      loop(element.parentNode);
    } else {
      str = str.replace(/\s/g, ' > ');
      str = str.replace(/\s/, '');
      return str;
    }
  }

  loop(element);

  return str;
};
/**
 * Removes comments from the element or string of code specified.
 * @function
 * @memberOf element
 * @param {Element|String} el The element or string or code to remove comments from.
 * @example
 * _$.removeComments(document.documentElement);//Removes the comments from the document element.
 * @returns {String|Element} The string removed of comments or the element removed of comments.
 */
export let removeComments = (el) => {
  const isString = typeof el === 'string';
  el = isString ? _$.parseHTML(el) : el.cloneNode(true);
  for (const child of [...el.querySelectorAll('*'), el]) {
    for (const grandchild of child.childNodes) {
      if (grandchild instanceof Comment)
        child.removeChild(grandchild);
    }
  }
  return isString ? el.outerHTML : el;
};
/**
 * Parses the string of HTML specified and returns an HTML element of it.
 * @function
 * @memberOf element
 * @param {String} string The HTML string to parse.
 * @param {String} [mimeType="text/html"] The mimeType of the string.
 * @example
 * let html = _$.parseHTML("<div id='hello'><textarea></textarea></div>");
 * html.querySelector("textarea");//Returns the textarea!
 * @returns {HTMLDocument} The HTML document element of the HTML string specified.
 */
export let parseHTML = (string, mimeType = 'text/html') => {
  const domparser = new DOMParser();
  return domparser.parseFromString(string, mimeType);
};
/**
 * Allows an element to be dragged and dropped.
 * @function
 * @memberOf element
 * @param {Element} el The element to be dragged (And dropped :P ).
 * @example
 * _$.drag(document.querySelector('div')); // Allows the first <div> on the page to be dragged.
 * @returns {Element} The element.
 */
export let drag = (el) => {
  node();
  var initX, initY, mousePressX, mousePressY;
  el.addEventListener(
    'mousedown',
    function (event) {
      var style = window.getComputedStyle(el);
      el.style.top = style.getPropertyValue('top');
      el.style.left = style.getPropertyValue('left');
      el.style.right = style.getPropertyValue('right');
      el.style.bottom = style.getPropertyValue('bottom');
      this.style.position = 'absolute';
      initX = this.offsetLeft;
      initY = this.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;
      this.addEventListener('mousemove', repositionElement, false);

      window.addEventListener(
        'mouseup',
        function () {
          el.removeEventListener(
            'mousemove',
            repositionElement,
            false,
          );
        },
        false,
      );
    },
    false,
  );

  function repositionElement(event) {
    this.style.left = initX + event.clientX - mousePressX + 'px';
    this.style.top = initY + event.clientY - mousePressY + 'px';
  }
  return el;
};
/**
 * Adds multiple event listeners with one callback to the element specified.
 * @memberOf element
 * @function
 * @param {Element} element The element to add the event listeners to.
 * @param {Array.<String>} events The array of events to listen for.
 * @param {Function} handler The function to run when the events happen.
 * @param {Boolean} [useCapture=false] Wether to use capture.
 * @param {Array} [args=false] The arguments to use in the handler function.
 * @example
 * // Reset a timer every user interaction.
 * let timer = 0;
 * setInterval(() => timer++, 1);
 * _$.addEventListeners(
 *  document,
 *  ["mousemove", "click", "scroll", "keypress"],
 *  () => timer = 0,
 * );
 * @returns {undefined}
 */
export let addEventListeners = (
  element,
  events,
  handler = {},
  useCapture = false,
  args = false,
) => {
  if (!(events instanceof Array)) {
    throw (
      'addMultipleListeners: ' +
      'please supply an array of eventstrings ' +
      '(like ["click","mouseover"])'
    );
  }
  //create a wrapper to be able to use additional arguments
  var handlerFn = function (e) {
    handler.apply(this, args && args instanceof Array ? args : []);
  };
  for (var i = 0; i < events.length; i += 1) {
    element.addEventListener(events[i], handlerFn, useCapture);
  }
};
/**
 * @memberOf element
 * @function
 * @returns {undefined}
 * Sorts a table using JavaScript. This appends click listeners to every TH in the table.
 * @param {HTMLTableElement} element The table to sort
 */
export let sortTable = (element) => {
  var getCellValue = function (tr, idx) {
    return tr.children[idx].innerText || tr.children[idx].textContent;
  };

  var comparer = function (idx, asc) {
    return function (a, b) {
      return (function (v1, v2) {
        return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2);
      })(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx),
      );
    };
  };

  Array.prototype.slice
    .call(element.querySelectorAll('th'))
    .forEach(function (th) {
      th.addEventListener('click', function () {
        var table = th.parentNode;
        while (table.tagName.toUpperCase() != 'TABLE')
          table = table.parentNode;
        Array.prototype.slice
          .call(table.querySelectorAll('tr:nth-child(n+2)'))
          .sort(
            comparer(
              Array.prototype.slice
                .call(th.parentNode.children)
                .indexOf(th),
              (this.asc = !this.asc),
            ),
          )
          .forEach(function (tr) {
            table.appendChild(tr);
          });
      });
    });
};
/**
 * Sorts a table by a <th> element.
 * @memberOf element
 * @function
 * @returns {undefined}
 * @example
 * //Note that this example pretty much recreates the _$ sortTable function, which is much more cross browser and good than this recreation. If sorting a whole table please use that.
 * _$.each(document.querySelectorAll("#table th"), (th) => {
 *  th.addEventListener("click", () => {
 *    //Add event listeners to each of them.
 *    _$.sortTableBy(th, th.asc = !th.asc);//Toggle the "asc" attribute on the th.
 *  });
 * })
 * @param {HTMLTableElement} th The table header (<th> element) to sort with.
 * @param {Boolean} acending Whether to sort the table ascending or descending.
 */
export let sortTableBy = (th, acending) => {
  var getCellValue = function (tr, idx) {
    return tr.children[idx].innerText || tr.children[idx].textContent;
  };

  var comparer = function (idx, asc) {
    return function (a, b) {
      return (function (v1, v2) {
        return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2)
          ? v1 - v2
          : v1.toString().localeCompare(v2);
      })(
        getCellValue(asc ? a : b, idx),
        getCellValue(asc ? b : a, idx),
      );
    };
  };

  var table = th.parentNode;
  while (table.tagName.toUpperCase() != 'TABLE')
    table = table.parentNode;
  Array.prototype.slice
    .call(table.querySelectorAll('tr:nth-child(n+2)'))
    .sort(
      comparer(
        Array.prototype.slice
          .call(th.parentNode.children)
          .indexOf(th),
        acending,
      ),
    )
    .forEach(function (tr) {
      table.appendChild(tr);
    });
};
/**
 * Adds the specified styles to the element specified.
 * @function
 * @memberOf element
 * @param {Element} el The element to add the styles to.
 * @param {Object} styles An object that represents the styles to be added. (camelCased)
 * @example
 * _$.addStyles(document.documentElement, {backgroundColor: "#101010", color: "white"})
 * @returns {Object} the style object of the element.
 */
export let addStyles = (el, styles) => {
  node();
  return Object.assign(el.style, styles);
};

/**
 * Creates an HTML element from the specified string.
 * @function
 * @memberOf element
 * @param {String} str The string of the HTML element to create.
 * @example
 * //Returns a div with an id of "id_here" and innerText of "Testing!"
 * _$.createElement("<div id='id_here'>Testing!</div>");
 * @returns {Element} The created element.
 */
export let createElement = (str) => {
  node();
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstElementChild;
};
/**
 * Gets a property from the computed style of an element.
 * @function
 * @memberOf element
 * @param {Element} el The element whose styles to get.
 * @param {String} prop The css-property value to get of the styles.
 * @example
 * console.log(_$.compStyle(document.documentElement, "background-color")); // logs the background colour of the document
 * @returns {String} The computed style property for the element specified.
 */
export let compStyle = (el, prop) => {
  node();
  var computedStyles = window.getComputedStyle(el);
  return computedStyles.getPropertyValue(prop);
};

/**
 * Get the siblings of a DOM element
 * @function
 * @memberOf element
 * @param {Element} n The element to get siblings of
 * @example
 * _$.each(_$.elementSiblings(document.querySelectorAll("li")), (el) => el.style.backgroundColor = 'white');
 * // Make every sibling of the first list item's background color white.
 * @returns {Element[]} The array of sibling elements.
 */
export let elementSiblings = (n) =>
  [...n.parentElement.children].filter((c) => c != n);
/**
 * Disables right click on the element spcified.
 * @function
 * @memberOf element
 * @param {Element} el The element to disable right click on.
 * @example
 * _$.disableRightClick(document.documentElement)
 * @returns {undefined}
 */
export let disableRightClick = (el) => {
  node();
  return (el.oncontextmenu = false);
};
/**
 * Converts all of the styles for an element to inline CSS. This is nice for production sites because it means that they will look the same on all browsers. (Because it uses computed style.)
 * @function
 * @memberOf element
 * @param {Element} el The element to convert.
 * @example
 * _$.inlineCSS(document.querySelector("h1")); // Converts the styles for the <h1> element to inline using the style="___" attribute
 * @returns {undefined}
 */
export let inlineCSS = (el) => {
  var cs = getComputedStyle(el, null);
  var i;
  for (i = 0; i < cs.length; i++) {
    var s = cs[i] + '';
    el.style[s] = cs[s];
  }
};
/**
 * Returns an array of objects representing the attributes of a passed element.
 * @param {Element} el The HMTL element to get attributes from.
 * @function
 * @memberOf element
 * @example
 * // Say the <html> tag of the document was "<html style='background-color: #101010;'>", then the function below would log "style," to the console.
 * console.log(Object.keys(_$.attributes(document.documentElement).join(", "));
 * @return {Array.<object>} The array of objects representing the attributes
 */
export let attributes = (el) => {
  node();
  var output = [];
  for (
    var att, i = 0, atts = el.attributes, n = atts.length;
    i < n;
    i++
  ) {
    att = atts[i];
    output.push({
      name: att.nodeName,
      value: att.nodeValue,
    });
  }
  return output;
};
/**
 * Observes the mutations of the html element specified.
 * @memberOf element
 * @function
 * @param {Element} element The element to observe
 * @param {Function} callback The callback function to run when a mutation happens.
 * @param {Object} options The options to use.
 * @example
 * _$.observeMutations(document, console.log); // Logs all the mutations that happen to the console.
 * @returns {undefined}
 */
export let observeMutations = (element, callback, options) => {
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((m) => callback(m)),
  );
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true,
      },
      options,
    ),
  );
  return observer;
};
/**
 * Tilts a specified element to point towards the specified position. Note that 0,0 is the center of the screen in coordinates.
 * @memberOf element
 * @function
 * @param {Element} el The element to tilt.
 * @param {Number} x The x value of the mouse
 * @param {Number} y The y value of the mouse
 * @param {Number} [perspective=500] The perspective
 * @param {Number} [amount=30] The amount to tilt.
 * @returns {undefined}
 * @example
 * // Tilt the first image in the document whenever the mouse moves.
 * let el = document.querySelector("img");
 * el.onmousemove = (e) => {
 *  let x = e.layerX;
 *  let y = e.layerY
 *  _$.tilt(el, x, y);
 * }
 */
export let tilt = (el, x, y, perspective = 500, amount = 30) => {
  //Old code
  /*  const xVal = x
      const yVal = y
      const yRotation = amount * ((xVal - width / 2) / width)
      const xRotation = amount * -1 * ((yVal - height / 2) / height)
      const string = `perspective(${perspective}px) scale(1.1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
      el.style.transform = string */

  //One liner
  el.style.transform = `perspective(${perspective}px) scale(1.1) rotateX(${
    amount * -1 * ((y - el.clientHeight / 2) / el.clientHeight)
  }deg) rotateY(${
    amount * ((x - el.clientWidth / 2) / el.clientWidth)
  }deg)`;
};
/**
 * Enters fullscreen on an element.
 * @memberOf element
 * @function
 * @param {Element} element The element to enter full screen with.
 * @returns {undefined}
 * @example
 * _$.fullScreen(document.documentElement); // Make the window fullscreen
 */
export let fullScreen = (element) => {
  return (
    element.requestFullScreen ||
    element.mozRequestFullScreen ||
    element.webkitRequestFullScreen() ||
    new Error('Fullscreen failed')
  );
};
/**
 * Replaces the selected text in a contentEditable div with the HTML given.
 * @memberOf element
 * @function
 * @returns {undefined}
 * @example
 * // Add a simple contenteditable div to the page.
 * document.appendChild(_$.createElement("<div contenteditable id='text'></div>"));
 * _$.replaceSelection("<b>BOLD TEXT</b> <small>Bijou is awesome</small><h1>You need to use it</h1>");
 * //Replaces the selection! =)
 * @param {String} replacementText The replacement HTML to replace with.
 */
export let replaceSelection = (replacementText) => {
  var sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      let n = document.createElement('span');
      n.insertAdjacentHTML('beforeend', replacementText);
      range.insertNode(n);
    }
  } else if (document.selection && document.selection.createRange) {
    console.warn(
      'You are using IE < 9, you are evil. Falling back to text not HTML.',
    );
    range = document.selection.createRange();
    range.text = replacementText.replace(/<[^>]*>/g, '');
  }
};
//#endregion Element
//#region Event
/**
 * Returns the callback when a a click is registered outside the selected element
 * @function
 * @memberOf event
 * @param {Element} element The element to use as the outsideclick element.
 * @param {Function} callback The function to run when a click is registered outside the specified element.
 * @example
 * _$.onOutsideClick(document.querySelector("div"), () => {alert("You clicked outside the DIV!")});
 * @returns {Promise} A promise that is resolved when the user clicks outside the specified element.
 */
export let onOutsideClick = (element, callback) => {
  node();
  return new Promise((resolve, reject) => {
    document.addEventListener('click', (e) => {
      if (!element.contains(e.target)) {
        callback();
        resolve();
      }
    });
  });
};
/**
 * Returns the callback when the user stops scrolling.
 * @function
 * @memberOf event
 * @param {Function} callback The callback to call when the user stops scrolling.
 * @param {Number} [time=150]
 * @example
 * _$.onScrollStop(() => {alert("You stopped scrolling!")})
 * @returns {Promise} Returns a promise that is resolved when the user stops scrolling.
 */
export let onScrollStop = (callback, time = 150) => {
  let isScrolling;
  node();
  return new Promise((resolve, reject) => {
    window.addEventListener(
      'scroll',
      (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          callback(e);
          resolve(e);
        }, time);
      },
      false,
    );
  });
};
/**
 * A lot like socket.io, this allows emit, on and off handlers. (Note that this is local, only your computer sends and recieves your data. Still useful though)
 * @memberOf event
 * @function
 * @returns {Object} The object with the emit, on and off functions in it.
 * @example
 * let thing = _$.hub();
 * // Log any new data to the console
 * thing.on("data", (data) => console.log(data));
 * setTimeout(() => {
 *   thing.emit("data", "Yay! Some data!!"); // Logs "Yay! Some data!!" to the console after 2 seconds.
 * }, 2000)
 */
export let hub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach((handler) => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex((h) => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  },
});
/**
 * Dispatches an event of the type specified with custom arguments.
 * @memberOf event
 * @function
 * @example
 * //Dispatch a custom mouse move event to the window.
 * _$.dispatch("mousemove", {clientX: 100, clientY: 150, target: document.documentElement}, window);
 * @param {String} type The type of event to dispatch (E.g. "mousemove")
 * @param {Object} args The argument representing the event, e.g. {clientX: 100, clientY: 150}
 * @param {EventTarget} [target=window] What to dispatch the event to.
 * @returns {undefined}
 */
export let dispatch = (type, args, target = window) => {
  let e = new Event(type);
  for (let o in args) {
    e[o] = args[o];
  }
  target.dispatchEvent(e);
};
//#endregion Event
//#region Function
/**
 * Uses an array of arguments to make a function based on the one inputted.
 * @memberOf function
 * @function
 * @returns {Function}
 * @example
 * var say = _$.spread(function(who, what) {
    return who + ' says ' + what;
  });
  say(["Fred", "hi"]);//"Fred says hi"
 * @param {Function} fn The function to use
 */
export let spread = (fn) => {
  return (args) => {
    call_me.apply(this, args);
  };
};
/**
 * Memoizes a function, bascally caching the result of past operations so that if the exact same thing is called again it will return the same value instantly.
 * @function
 * @memberOf function
 * @param {Function} fn The function to memoize.
 * @example
 * let uuid = _$.memoize(() => _$.uuid()); // uuid will always return the same uuid. (Note that _$.uuid is already very fast - it can generate up to 10 million values in 20 seconds.)
 * @returns {Function} The memoized function.
 */
export let memoize = (fn) => {
  let cache = {};
  return function () {
    let args = JSON.stringify(Array.from(arguments));
    let arg_array = Array.from(arguments);
    if (cache[args]) {
      return cache[args];
    } else {
      cache[args] = fn(...arg_array);
      return cache[args];
    }
  };
};
/**
 * Composes two functions together. Read more here: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
 * @function
 * @memberOf function
 * @param {...Function} The functions to be composed.
 * @returns {Function} The composed function.
 * @example
 * const add2 = (x) => x + 2;
 * const multiply2 = (x) => x * 2;
 * console.log(_$.composeFunction(add2, multiply2)(3)) // 8 - i.e  6 * 2 + 2
 */
export let composeFunction = (...functions) => (args) =>
  functions.reduceRight((arg, fn) => fn(arg), args);
/**
 * Returns the curried version of a function. Read more here: https://medium.com/@abitoprakash/implementing-a-curry-function-in-javascript-6a249dbcb1bb
 * @function
 * @memberOf function
 * @param {Function} fn The function to curry.
 * @param {Number} [arity=fn.length] The arity (number of params) of the function to curry.
 * {...*} [args] Optional arguments to pass to the function being curried.
 * @returns {Function} The curried version of the function.
 * @example
 * let fn = (x, y, z, w) => x * y * z * w;
 * console.log(_$.curryFunction(fn, 4, 5)(4)(3)(2)); // 120 i.e. 5 * 4 * 3 * 2
 */
export let curryFunction = (fn, arity = fn.length, ...args) =>
  arity <= args.length
    ? fn(...args)
    : curryFunction.bind(null, fn, arity, ...args);
/**
 * Returns if the given function is async or not.
 * @memberOf function
 * @function
 * @param {Function} val The function to test.
 * @returns {Boolean} True if the function is async and false if not.
 * @example
 * const asyncFn = async (x) => x ** 3; // It's a silly function, but a good example
 * console.log(_$.isAsync(asyncFn)); // true
 */
export let isAsync = (val) =>
  Object.prototype.toString.call(val) === '[object AsyncFunction]';
/**
 * Only runs the input function at MAX with the delay specified.
 * @function
 * @memberOf function
 * @param {Function} func The function to run.
 * @param {Object.<Boolean>} options The options.
 * @param {Number} wait The number of milliseconds to wait.
 * @example
 * const alert_function = _$.throttle(() => {alert("hello")}, 5000)
 * setInterval(alert_function, 1)
 * @returns {Function} The throttled function
 */
export let throttle = (func, wait, options) => {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
/**
 * Debounces a function
 * @memberOf function
 * @function
 * @example
 * window.addEventListener("keyup", _$.debounce(expensiveFunction, 100));//Run the function expensiveFunction at most every 100ms.
 * @param {Function} func The function to throttle.
 * @param {Number} wait The milliseconds to wait between executions.
 * @param {Boolean} [immediate=false] Whether or not to run immediately, or after a group of executions.
 */
export let debounce = (func, wait, immediate = false) => {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function () {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   [before or after imposing a delay].
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function () {
      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  };
};
/**
 * Runs a function asynchronously in a web worker.
 * @function
 * @memberOf function
 * @param {Function} fn The function to run
 * @example
 * _$.runAsync(() =>  "hello world").then(console.log); // "hello world"
 * @returns {Promise} A promise that resolves into the return value of the function.
 */
export let runAsync = (fn) => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8',
    }),
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = (err) => {
      rej(err), worker.terminate();
    };
  });
};
//#endregion Function
//#region Math
/**
 * Animates a number from one value to another.
 * @function
 * @memberOf math
 * @param {Number} start The initial value of the number in the animation
 * @param {Number} end The final value of the number in the animation
 * @param {Number} duration The duration of the animation in milliseconds
 * @param {Function} callback The callback function to run with the number and the percentage (Between 0 and 1) of the animation.
 * @param {Number} [interval=20] The amount of time to wait between frames in milliseconds.
 * @param {Function} num The function to run to manipulate the timing of the animation, for example setting this to (current_number) => current_number **2 would make a simple ease in function. (The value recieved by this is also between 0 and 1, feel free to use some stuff from _$.ease.FUNCTION_HERE(current_number) to incorporate easy easing!)
 * @example
 * Animates from 50 to 100 over the course of 3 seconds, updating every half second, and writing the current value to the document body.
 * _$.animate(50,100, 3000, (e) => document.body.innerHTML = (Math.round(e)), 500, (num) => _$.ease.easeInOutQuart(num));
 * @returns {undefined}
 */
// prettier-ignore
export let animate = (start, end, duration, callback, interval = 20, num = (num) => num) => {
    var value = start;
    var start_time = Date.now();
    let update = setInterval(() => {
        value = num((Date.now() - start_time) / duration) * (end - start) + start;
        callback(value, num((Date.now() - start_time) / duration));
    }, interval);
    setTimeout(() => {
        clearInterval(update);
        callback(end, 1);
        return;
    }, duration);
}
/**
 * Returns an array of the whole numbers (inclusive) between the numbers specified.
 * @memberOf math
 * @function
 * @param {Number} start The start value of the array.
 * @param {Number} end The end value of the array.
 * @example
 * console.log(_$.range(-2, 1)); // [-2, -1, 0, 1]
 * @returns {Array.<Number>} An array of whole numbers (inclusive) between the numbers specified.
 */
export let range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};
/**
 * Generates a unique ID from a seed
 * @function
 * @memberOf math
 * @param {Number|String} [seed=Math.random()] The seed to use.
 * @example
 * console.log(_$.uuid()); // e.g. "863d0193-863d-0193-863d-0193863d0193"
 * @returns {String} The UUID
 */
export let uuid = (seed = Math.random()) => {
  //Magic. Do not touch.
  if (typeof seed === 'string') {
    // Convert string to a number between 0 and 1
    seed = _temp.hashString(seed) / 10000000000000000;
  }
  function _p8(s) {
    var p = (seed.toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};
/**
 * Gives an array of prime numbers up to a certain one.
 * @function
 * @memberOf math
 * @param {Number} num - The number to give primes to.
 * @example
 * console.log(_$.primesTo(10)); // [2, 3, 5, 7]
 * @returns {Array.<Number>} Returns an array of prime numbers up to the given number.
 */
export let primesTo = (num) => {
  let arr = Array.from({
      length: num - 1,
    }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({
      length: sqroot - 1,
    }).map((x, i) => i + 2);
  numsTillSqroot.forEach(
    (x) => (arr = arr.filter((y) => y % x !== 0 || y === x)),
  );
  return arr;
};
/**
 * Generates a random number between a minimum and maximum number
 * @function
 * @memberOf math
 * @param {Number} min The lowest number that the random value generated can be.
 * @param {Number} max The highest number that the random value generated can be.
 * @param {Boolean} [round=true] Weather to round the generated number
 * @param {Number} [seed=Math.random()] The seed for the generated number (Between 0 and 1).
 * @returns {Number} The random number generated.
 * @example
 * console.log(_$.random(0, 100)); // e.g. 47
 */
export let random = (
  min,
  max,
  round = true,
  seed = Math.random(),
) => {
  if (round) {
    return Math.floor(seed * (max - min + 1) + min);
  } else {
    return Math.random() * (max - min + 1) + min;
  }
};
/**
 * Get a random number from a seed.
 * @function
 * @memberOf math
 * @param {number} seed The seed to use to generate random numbers.
 * @example
 * console.log(_$.seedRandom(13)); // 0.5663226493634284
 * @returns {Number} The random number from the seed.
 */
export let seedRandom = (seed) => {
  var t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Formats a number by adding commas to it.
 * @function
 * @memberOf math
 * @param {Number} n The number to format.
 * @example
 * console.log(_$.formatNumber(100000000)); // "100,000,000"
 * @returns {String} The formatted string representation of the number.
 */
export let formatNumber = (n) =>
  n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
/**
 * Easing functions
 * @Object
 * @memberOf math
 * @example
 * console.log(_$.ease.easeInOutQuad(.3)); // 0.18 - the eased point of about 1/3 along the animation.
 * @returns {Function} The easing function.
 */
export let ease = {
  // no easing, no acceleration
  linear: (t) => t,
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
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
  easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeIntOutExpo: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2,
  easeInCirc: (t) => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t) => Math.sqrt(1 - (t - 1) * (t - 1)),
  easeInOutCirc: (t) =>
    t < 0.5
      ? 1 - Math.sqrt(1 - 4 * t * t) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
  easeInBack: (t) => 2.70158 * t * t * t - 1.70158 * t * t,
  easeOutBack: (t) =>
    1 + 2.70158 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2),
  easeInOutBack: (t) => {
    const c = 2.5949095;

    return t < 0.5
      ? (4 * t * t * ((c + 1) * 2 * t - c)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c + 1) * (t * 2 - 2) + c) + 2) /
          2;
  },
  easeInElastic: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) *
        Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3),
  easeOutElastic: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : Math.pow(2, -10 * t) *
          Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) +
        1,
  easeInOutElastic: (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? -(
          Math.pow(2, 20 * t - 10) *
          Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)
        ) / 2
      : (Math.pow(2, -20 * t + 10) *
          Math.sin(((20 * t - 11.125) * (2 * Math.PI)) / 4.5)) /
          2 +
        1,
  easeInBounce: (t) => 1 - ease.easeOutBounce(1 - t),
  easeOutBounce: (t) => {
    const n = 7.5625;
    const d = 2.75;

    if (t < 1 / d) {
      return n * t * t;
    } else if (t < 2 / d) {
      return n * (t -= 1.5 / d) * t + 0.75;
    } else if (t < 2.5 / d) {
      return n * (t -= 2.25 / d) * t + 0.9375;
    } else {
      return n * (t -= 2.625 / d) * t + 0.984375;
    }
  },
  easeInOutBounce: (t) =>
    t < 0.5
      ? (1 - ease.easeOutBounce(1 - 2 * t)) / 2
      : (1 + ease.easeOutBounce(2 * t - 1)) / 2,
};

//#endregion Math
//#region String
/**
 * Lets you use a for loop in template literals.
 * @function
 * @memberOf string
 * @param {arr} The array to loop.
 * @param {callback} Callback to return strings
 * @example
 * `Things: ${_$.forTemplateLiteral(["apple"], (item, i) => {return `an ${item}`})}`
 * // "Things: an apple
 * @returns {String} String that has been for looped
 */
export let forTemplateLiteral = (arr, callback) => {
  return arr.map((item, i) => callback(item, i)).join``;
};

/**
 * Removes the accents from a string.
 * @memberOf string
 * @function
 * @returns {String} The string without accents.
 * @example
 * console.log(_$.decurr("déjà vu")); // "deja vu"
 * @param {String} str The string to use.
 */
export let deburr = (str) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
/**
 * Returns either "mobile" or "desktop" depending on which type of device the user is using.
 * @function
 * @memberOf string
 * @param
 * @returns {String} Either "mobile" or "desktop" depending on which type of device the user is using.
 * @example
 * console.log(_$.mobileOrDesktop()); // e.g. "desktop"
 */
export let mobileOrDesktop = () => {
  node();
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'mobile'
    : 'desktop';
};
/**
 * Removes tags from the HTML string specified.
 * @function
 * @memberOf string
 * @param {String} html The string of HTML to remove tags from.
 * @example
 * console.log(_$.removeTags("<div>Hello</div>")); // "Hello"
 * @returns {String} THe string of HTML without the tags.
 */
export let removeTags = (html) => html.replace(/<[^>]*>/g, '');

/**
 * Speaks the text given.
 * @memberOf string
 * @function
 * @param {String} text The text to split
 * @param {String} [lang=en-US] The language to speak with.
 * @param {Number} [volume=1] The volume
 * @param {String|Number} [voice=1] The voice to use.
 * @param {Number} [pitch=1] The pitch
 * @param {Number} [volume=1] The volume
 * @param {Number} [rate=1] The speed.
 * @example
 * _$.speak("Bijou is awesome!"); // speaks "Bijou is awesome!"
 * @returns {undefined}
 */
export let speak = (
  text,
  lang = 'en',
  volume = 1,
  voice = 1,
  pitch = 1,
  rate = 1,
) => {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  let def = voices.filter((c) => c.default);
  msg.voice = voice
    ? typeof voice === 'number'
      ? voices[voice]
      : voice
    : def;
  msg.volume = volume; // From 0 to 1
  msg.rate = rate; // From 0.1 to 10
  msg.pitch = pitch; // From 0 to 2
  msg.text = text;
  msg.lang = lang;
  speechSynthesis.speak(msg);
};
/**
 * Returns the last space in the string given replaced with "&nbsp;"
 * @function
 * @memberOf string
 * @param {String} text The string to replace
 * @example
 * document.querySelector("h1").innerHTML = _$.widows(document.querySelector("h1").innerHTML);
 * //Replaces the last space in the <h1>'s innerText with "&nbsp;"
 * @returns {String} The replaced string.
 */
export let widows = (text) => {
  var wordArray = text.split(' ');
  var finalTitle = '';
  for (var i = 0; i <= wordArray.length - 1; i++) {
    finalTitle += wordArray[i];
    if (i == wordArray.length - 2) {
      finalTitle += '&nbsp;';
    } else {
      finalTitle += ' ';
    }
  }
  return finalTitle;
};

/**
 * Undoes camelCase.
 * @function
 * @memberOf string
 * @param {String} str The string to unCamelCase.
 * @example
 * console.log(_$.unCamelCase("helloWorld")); // "Hello World"
 * @returns {String} The string of unCamelCased code.
 */
export let unCamelCase = function (str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
    .replace(/^./, function (s) {
      return s.toUpperCase();
    });
};

/**
 * Syntax highlights a string of code.
 * @function
 * @memberOf string
 * @param {String} string The string of HTML to highlight.
 * @param {String} [mode=html] The mode to use for highlighting. (CSS, JS or HTML).
 * @param {Object} [colors={}] The colors to use for highlighting.
 * @param {String} [colors.tagNameColor='mediumblue'] The color to use for HTML tags.
 * @param {String} [colors.tagColor='brown'] The color to use for HTML tag names.
 * @param {String} [colors.attributeColor='red'] The color to use for HTML attributes.
 * @param {String} [colors.attributeValueColor='mediumblue'] The color to use for HTML attribute values.
 * @param {String} [colors.commentColor='green'] The color to use for comments.
 * @param {String} [colors.cssSelectorColor='brown'] The color to use for CSS selectors.
 * @param {String} [colors.cssPropertyColor='red'] The color to use for CSS properties.
 * @param {String} [colors.cssPropertyValueColor='mediumblue'] The color to use for CSS propertie values.
 * @param {String} [colors.cssLimiterColor='black'] The color to use for css limiters.
 * @param {String} [colors.cssImportantColor='red'] The color to use for `!important` in CSS.
 * @param {String} [colors.jsColor='black'] The color to use for the majority of javascript.
 * @param {String} [colors.jsKeywordColor='black'] The color to use for javascript keywords.
 * @param {String} [colors.jsStringColor='brown'] The color to use for javascript strings.
 * @param {String} [colors.jsNumberColor='black'] The color to use for javascript numbers.
 * @param {String} [colors.jsPropertyColor='black'] The color to use for javascript properties.
 * @param {String} [colors.fontFamily="Consolas,'Courier New', monospace"] The font to use for syntax highlighting.
 * @example
 * _$.syntaxHighlight('alert(\"Hello\")', 'js'); // <span style="color:black">alert(<span style="color:brown">"Hello"</span>)</span>
 * @returns {String} The highlighted string of code as HTML code.
 */
export let syntaxHighlight = (string, mode = 'html', colors = {}) => {
  node();
  //        .==.        .==.
  //       //`^\\      //^`\\
  //      // ^ ^\(\__/)/^ ^^\\
  //     //^ ^^ ^/6  6\ ^^ ^ \\
  //    //^ ^^ ^/( .. )\^ ^ ^ \\
  //   // ^^ ^/\| v""v |/\^ ^ ^\\
  //  // ^^/\/ /  `~~`  \ \/\^ ^\\
  //  -----------------------------
  /// HERE BE DRAGONS
  let el = document.createElement('DIV');
  el.innerText = string;
  let highlightel = (elmnt, mode, colors = {}) => {
    // Credit to w3schools for this
    var lang = mode || 'html';
    var elmntObj = document.getElementById(elmnt) || elmnt;
    var elmntTxt = elmntObj.innerHTML;
    var tagcolor = colors.tagColor || 'mediumblue';
    var tagnamecolor = colors.tagNameColor || 'brown';
    var attributecolor = colors.attributeColor || 'red';
    var attributevaluecolor =
      colors.attributeValueColor || 'mediumblue';
    var commentcolor = colors.commentColor || 'green';
    var cssselectorcolor = colors.cssSelectorColor || 'brown';
    var csspropertycolor = colors.cssPropertyColor || 'red';
    var csspropertyvaluecolor =
      colors.cssPropertyValueColor || 'mediumblue';
    var cssdelimitercolor = colors.cssLimiterColor || 'black';
    var cssimportantcolor = colors.cssImportantColor || 'red';
    var jscolor = colors.jsColor || 'black';
    var jskeywordcolor = colors.jsKeywordColor || 'mediumblue';
    var jsstringcolor = colors.jsStringColor || 'brown';
    var jsnumbercolor = colors.jsNumberColor || 'red';
    var jspropertycolor = colors.jsPropertyColor || 'black';
    elmntObj.style.fontFamily =
      colors.fontFamily || "Consolas,'Courier New', monospace";
    if (!lang) {
      lang = 'html';
    }
    if (lang == 'html') {
      elmntTxt = htmlMode(elmntTxt);
    }
    if (lang == 'css') {
      elmntTxt = cssMode(elmntTxt);
    }
    if (lang == 'js') {
      elmntTxt = jsMode(elmntTxt);
    }
    elmntObj.innerHTML = elmntTxt;

    function extract(str, start, end, func, repl) {
      var s,
        e,
        d = '',
        a = [];
      while (str.search(start) > -1) {
        s = str.search(start);
        e = str.indexOf(end, s);
        if (e == -1) {
          e = str.length;
        }
        if (repl) {
          a.push(func(str.substring(s, e + end.length)));
          str =
            str.substring(0, s) + repl + str.substr(e + end.length);
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
        done = '',
        comment,
        startpos,
        endpos,
        note,
        i;
      comment = new extract(
        rest,
        '&lt;!--',
        '--&gt;',
        commentMode,
        'W3HTMLCOMMENTPOS',
      );
      rest = comment.rest;
      while (rest.indexOf('&lt;') > -1) {
        note = '';
        startpos = rest.indexOf('&lt;');
        if (rest.substr(startpos, 9).toUpperCase() == '&LT;STYLE') {
          note = 'css';
        }
        if (rest.substr(startpos, 10).toUpperCase() == '&LT;SCRIPT') {
          note = 'javascript';
        }
        endpos = rest.indexOf('&gt;', startpos);
        if (endpos == -1) {
          endpos = rest.length;
        }
        done += rest.substring(0, startpos);
        done += tagMode(rest.substring(startpos, endpos + 4));
        rest = rest.substr(endpos + 4);
        if (note == 'css') {
          endpos = rest.indexOf('&lt;/style&gt;');
          if (endpos > -1) {
            done += cssMode(rest.substring(0, endpos));
            rest = rest.substr(endpos);
          }
        }
        if (note == 'javascript') {
          endpos = rest.indexOf('&lt;/script&gt;');
          if (endpos > -1) {
            done += jsMode(rest.substring(0, endpos));
            rest = rest.substr(endpos);
          }
        }
      }
      rest = done + rest;
      for (i = 0; i < comment.arr.length; i++) {
        rest = rest.replace('W3HTMLCOMMENTPOS', comment.arr[i]);
      }
      return rest;
    }
    function tagMode(txt) {
      var rest = txt,
        done = '',
        startpos,
        endpos,
        result;
      while (rest.search(/(\s|<br>)/) > -1) {
        startpos = rest.search(/(\s|<br>)/);
        endpos = rest.indexOf('&gt;');
        if (endpos == -1) {
          endpos = rest.length;
        }
        done += rest.substring(0, startpos);
        done += attributeMode(rest.substring(startpos, endpos));
        rest = rest.substr(endpos);
      }
      result = done + rest;
      result =
        '<span style=color:' +
        _$.escapeHTML(tagcolor) +
        '>&lt;</span>' +
        result.substring(4);
      if (result.substr(result.length - 4, 4) == '&gt;') {
        result =
          result.substring(0, result.length - 4) +
          '<span style=color:' +
          _$.escapeHTML(tagcolor) +
          '>&gt;</span>';
      }
      return (
        '<span style=color:' +
        _$.escapeHTML(tagnamecolor) +
        '>' +
        result +
        '</span>'
      );
    }
    function attributeMode(txt) {
      var rest = txt,
        done = '',
        startpos,
        endpos,
        singlefnuttpos,
        doublefnuttpos,
        spacepos;
      while (rest.indexOf('=') > -1) {
        endpos = -1;
        startpos = rest.indexOf('=');
        singlefnuttpos = rest.indexOf("'", startpos);
        doublefnuttpos = rest.indexOf('"', startpos);
        spacepos = rest.indexOf(' ', startpos + 2);
        if (
          spacepos > -1 &&
          (spacepos < singlefnuttpos || singlefnuttpos == -1) &&
          (spacepos < doublefnuttpos || doublefnuttpos == -1)
        ) {
          endpos = rest.indexOf(' ', startpos);
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
        done += attributeValueMode(
          rest.substring(startpos, endpos + 1),
        );
        rest = rest.substr(endpos + 1);
      }
      return (
        '<span style=color:' +
        _$.escapeHTML(attributecolor) +
        '>' +
        done +
        rest +
        '</span>'
      );
    }
    function attributeValueMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(attributevaluecolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function commentMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(commentcolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function cssMode(txt) {
      var rest = txt,
        done = '',
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
        '*/',
        commentMode,
        'W3CSSCOMMENTPOS',
      );
      rest = comment.rest;
      while (rest.search('{') > -1) {
        s = rest.search('{');
        midz = rest.substr(s + 1);
        cc = 1;
        c = 0;
        for (i = 0; i < midz.length; i++) {
          if (midz.substr(i, 1) == '{') {
            cc++;
            c++;
          }
          if (midz.substr(i, 1) == '}') {
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
          e = rest.indexOf('}', e + 1);
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
        '<span style=color:' +
          _$.escapeHTML(cssdelimitercolor) +
          '>{</span>',
      );
      rest = rest.replace(
        /}/g,
        '<span style=color:' +
          _$.escapeHTML(cssdelimitercolor) +
          '>}</span>',
      );
      for (i = 0; i < comment.arr.length; i++) {
        rest = rest.replace('W3CSSCOMMENTPOS', comment.arr[i]);
      }
      return (
        '<span style=color:' +
        _$.escapeHTML(cssselectorcolor) +
        '>' +
        rest +
        '</span>'
      );
    }
    function cssPropertyMode(txt) {
      var rest = txt,
        done = '',
        s,
        e,
        n,
        loop;
      if (rest.indexOf('{') > -1) {
        return cssMode(rest);
      }
      while (rest.search(':') > -1) {
        s = rest.search(':');
        loop = true;
        n = s;
        while (loop == true) {
          loop = false;
          e = rest.indexOf(';', n);
          if (rest.substring(e - 5, e + 1) == '&nbsp;') {
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
        '<span style=color:' +
        _$.escapeHTML(csspropertycolor) +
        '>' +
        done +
        rest +
        '</span>'
      );
    }
    function cssPropertyValueMode(txt) {
      var rest = txt,
        done = '',
        s;
      rest =
        '<span style=color:' +
        _$.escapeHTML(cssdelimitercolor) +
        '>:</span>' +
        rest.substring(1);
      while (rest.search(/!important/i) > -1) {
        s = rest.search(/!important/i);
        done += rest.substring(0, s);
        done += cssImportantMode(rest.substring(s, s + 10));
        rest = rest.substr(s + 10);
      }
      result = done + rest;
      if (
        result.substr(result.length - 1, 1) == ';' &&
        result.substr(result.length - 6, 6) != '&nbsp;' &&
        result.substr(result.length - 4, 4) != '&lt;' &&
        result.substr(result.length - 4, 4) != '&gt;' &&
        result.substr(result.length - 5, 5) != '&amp;'
      ) {
        result =
          result.substring(0, result.length - 1) +
          '<span style=color:' +
          _$.escapeHTML(cssdelimitercolor) +
          '>;</span>';
      }
      return (
        '<span style=color:' +
        _$.escapeHTML(csspropertyvaluecolor) +
        '>' +
        result +
        '</span>'
      );
    }
    function cssImportantMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(cssimportantcolor) +
        ';font-weight:bold;>' +
        txt +
        '</span>'
      );
    }
    function jsMode(txt) {
      var rest = txt,
        done = '',
        esc = [],
        i,
        cc,
        tt = '',
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
        if (cc == '\\') {
          esc.push(rest.substr(i, 2));
          cc = 'W3JSESCAPE';
          i++;
        }
        tt += cc;
      }
      rest = tt;
      y = 1;
      while (y == 1) {
        sfnuttpos = getPos(rest, "'", "'", jsStringMode);
        dfnuttpos = getPos(rest, '"', '"', jsStringMode);
        compos = getPos(rest, /\/\*/, '*/', commentMode);
        comlinepos = getPos(rest, /\/\//, '<br>', commentMode);
        numpos = getNumPos(rest, jsNumberMode);
        keywordpos = getKeywordPos('js', rest, jsKeywordMode);
        dotpos = getDotPos(rest, jsPropertyMode);
        if (
          Math.max(
            numpos[0],
            sfnuttpos[0],
            dfnuttpos[0],
            compos[0],
            comlinepos[0],
            keywordpos[0],
            dotpos[0],
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
          dotpos,
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
        rest = rest.replace('W3JSESCAPE', esc[i]);
      }
      return (
        '<span style=color:' +
        _$.escapeHTML(jscolor) +
        '>' +
        rest +
        '</span>'
      );
    }
    function jsStringMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(jsstringcolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function jsKeywordMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(jskeywordcolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function jsNumberMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(jsnumbercolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function jsPropertyMode(txt) {
      return (
        '<span style=color:' +
        _$.escapeHTML(jspropertycolor) +
        '>' +
        txt +
        '</span>'
      );
    }
    function getDotPos(txt, func) {
      var x,
        i,
        j,
        s,
        e,
        arr = [
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
      s = txt.indexOf('.');
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
      if (typ == 'js') {
        words = [
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
              c == '-' &&
              (txt.substr(i - 1, 1) == 'e' ||
                txt.substr(i - 1, 1) == 'E')
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
};
/**
 * camelCases a string.
 * @function
 * @memberOf string
 * @param {String} str The string of non-camelCased text.
 * @example
 * console.log(_$.camelCase("Hello world")); // "helloWorld"
 * @returns {String} The camelCased string.
 */
export let camelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};
/**
 * Scrambles the order of characters in a string. Thanks to @\Touchcreator for the suggestion for this.
 * @function
 * @memberOf string
 * @param {String} str The string to be scrambled
 * @example
 * console.log(_$.scrambleString("Hello world")); // e.g. "owllH rdloe"
 * @returns {String} The scrambled text.
 */
export let scrambleString = (str) => {
  var a = str.split(''),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};
/**
 * Hashes a string to a unique integer (This cannot be decrypted easily).
 * @function
 * @memberOf string
 * @param {String} str The String to hash.
 * @param {Number} [seed=0] The seed of the hash.
 * @example
 * console.log(_$.hashString("Hello world")); // 3494146707865688
 * @returns {Number} The hashed string.
 */
export let hashString = (str, seed = 0) => {
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
};

/**
 * Gets the edit distance between two strings.
 * @function
 * @memberOf string
 * @param {String} a The first string
 * @param {String} b The seconds string
 * @example
 * console.log(_$.editDistance("hello", "Hello")); // 1
 * @returns {Number} The edit distance between two strings
 */
export let editDistance = (a, b) => {
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
            matrix[i - 1][j] + 1,
          ),
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};
/**
 * Returns the size of a string in bytes.
 * @function
 * @memberOf string
 * @param {String} str
 * @example
 * console.log(_$.byteSize("Hello world")); 11
 * @returns {Number} The byte size of the string.
 */
export let byteSize = (str) => new Blob([str]).size;

/**
 * Finds and replace multiple values with multiple other values.
 * @function
 * @memberOf string
 * @param {String} text The text to operate the replace on.
 * @param {Object} replace The object with find and replace values.
 * @example
 * _$.replaceMultiple("I have a cat, a dog, and a goat.", {dog: "cat", goat: "dog", cat: "goat"});//Returns "I have a goat, a cat and a dog"
 * @returns {String} The replaced string
 */
export let replaceMultiple = (text, replace) => {
  var re = new RegExp(Object.keys(replace).join('|'), 'gi');
  text = text.replace(re, function (matched) {
    return mapObj[matched];
  });
  return text;
};
/**
 * Returns the queries from a given url (Or just the current url)
 * @function
 * @memberOf string
 * @param {String} query The url query to get.
 * @param {String} [url=window.location.href] The url to find the query in. (By default this is the current url)
 * @example
 * // If the website adress of the current page was "https://example.com/?q=hello&hello=world"
 * console.log(_$.urlQuery("hello")); // "world"
 * // Or on a custom url:
 * console.log(_$.urlQuery("q", "https://google.com/search?q=something")); // "something"
 * @returns {String} The url query
 */
export let urlQuery = (query, url = window.location.href) => {
  query = query.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp(`[?&]${query}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Sanitizes an HTML string. It is quite possible that this is not production ready so use with caution. (I did my best though >=( )
 * @function
 * @memberOf string
 * @param {String} html The input string to sanitize.
 * @param {Array} [tags=undefined] The array of tags to allow, there is a default list though.
 * @param {Array} [attributes=undefined] The array of attributes to allow. By default only allows "href" and "src" attributes.
 * @example
 * console.log(_$.sanitizeHTML("<script>alert('hello')></script><b>A normal tag</b>")); // "<b>A normal tag</b>"
 * @returns {String} The sanitized HTML string.
 */
export let sanitize = (
  html,
  tags = undefined,
  attributes = undefined,
) => {
  node();
  var attributes = attributes || [
    { attribute: 'src', tags: '*', regex: /^(?:https|http|\/\/):/ },
    { attribute: 'href', tags: '*', regex: /^(?:https|http|\/\/):/ },
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
      //"^" and "$" match beggining and end
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
  ];
  var tags = tags || [
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

  attributes = attributes.map((el) => {
    if (typeof el === 'string') {
      return { attribute: el, tags: '*', regex: /^.+$/ };
    }
    let output = el;
    if (!el.hasOwnProperty('tags')) {
      output.tags = '*';
    }
    if (!el.hasOwnProperty('regex')) {
      output.regex = /^.+$/;
    }
    return output;
  });
  var el = new DOMParser().parseFromString(html, 'text/html');
  var elements = el.querySelectorAll('*');
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
        (attr.tags === '*' || attr.tags.includes(element.tagName)) &&
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
};
/**
 * Converts markdown to HTML.
 * @param {String} src The markdown to convert to HTML.
 * @memberOf string
 * @function
 * @example
 * console.log(_$.markdownToHTML("_Italic text_, **bold text**")); // "<em>Italic text</em>, <b>bold text</b>"
 * @returns {String} The string of HTML converted from the markdown input.
 */
export let markdownToHTML = (src) => {
  var rx_lt = /</g;
  var rx_gt = />/g;
  var rx_space = /\t|\r|\uf8ff/g;
  var rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
  var rx_hr = /^([*\-=_] *){3,}$/gm;
  var rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
  var rx_list = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
  var rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
  var rx_highlight = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
  var rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g;
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
      return element(
        'blockquote',
        blockquote(highlight(content.replace(/^ *&gt; */gm, ''))),
      );
    });
  }

  function list(src) {
    return src.replace(
      rx_list,
      function (all, ind, ol, num, low, content) {
        var entry = element(
          'li',
          highlight(
            content
              .split(
                RegExp(
                  '\n ?' +
                    ind +
                    '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +',
                  'g',
                ),
              )
              .map(list)
              .join('</li><li>'),
          ),
        );

        return (
          '\n' +
          (ol
            ? '<ol start="' +
              (num
                ? ol + '">'
                : parseInt(ol, 36) -
                  9 +
                  '" style="list-style-type:' +
                  (low ? 'low' : 'upp') +
                  'er-alpha">') +
              entry +
              '</ol>'
            : element('ul', entry))
        );
      },
    );
  }

  function highlight(src) {
    return src.replace(
      rx_highlight,
      function (all, _, p1, emp, sub, sup, small, big, p2, content) {
        return (
          _ +
          element(
            emp
              ? p2
                ? 'strong'
                : 'em'
              : sub
              ? p2
                ? 's'
                : 'sub'
              : sup
              ? 'sup'
              : small
              ? 'small'
              : big
              ? 'big'
              : 'code',
            highlight(content),
          )
        );
      },
    );
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
    stash[--si] = element(
      'pre',
      element('code', p3 || p4.replace(/^ {4}/gm, '')),
    );
    return si + '\uf8ff';
  });

  // link or image
  replace(rx_link, function (all, p1, p2, p3, p4, p5, p6) {
    stash[--si] = p6
      ? p6
      : p2
      ? p4
        ? '<img src="' +
          _$.escapeHTML(p4) +
          '" alt="' +
          _$.escapeHTML(p3) +
          '"/>'
        : p1
      : /^https?:\/\//g.test(p4)
      ? '<a href="' +
        _$.escapeHTML(p4) +
        '">' +
        unesc(highlight(p3)) +
        '</a>'
      : p1;
    return si + '\uf8ff';
  });

  // table
  replace(rx_table, function (all, table) {
    var sep = table.match(rx_thead)[1];
    return (
      '\n' +
      element(
        'table',
        table.replace(rx_row, function (row, ri) {
          return row == sep
            ? ''
            : element(
                'tr',
                row.replace(rx_cell, function (all, cell, ci) {
                  return ci
                    ? element(
                        sep && !ri ? 'th' : 'td',
                        unesc(highlight(cell || '')),
                      )
                    : '';
                }),
              );
        }),
      )
    );
  });

  // heading
  replace(rx_heading, function (all, _, p1, p2) {
    return _ + element('h' + p1.length, unesc(highlight(p2)));
  });

  // paragraph
  replace(rx_para, function (all, content) {
    return element('p', unesc(highlight(content)));
  });

  // stash
  replace(rx_stash, function (all) {
    return stash[parseInt(all)];
  });

  return src.trim();
};

/**
 * Counts the syllables in the word given.
 * @memberOf string
 * @function
 * @param {String} word The word to count syllables of
 * @example
 * console.log(_$.syllables("Hello")); // 2
 * @returns {Number} The number of syllables in the specified word.
 */
export let syllables = (word) => {
  word = word.toLowerCase();
  var t_some = 0;
  if (word.length > 3) {
    if (word.substring(0, 4) == 'some') {
      word = word.replace('some', '');
      t_some++;
    }
  }
  word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  var syl = word.match(/[aeiouy]{1,2}/g);
  console.log(syl);
  if (syl) {
    return syl.length + t_some;
  }
};
/**
 * Capitalizes the first letter of the string
 * @memberOf string
 * @function
 * @param {String} str The string to capitalize.
 * @example
 * console.log(_$.capitalize("hello world")); // "Hello world"
 * @returns {String} The capitalized string.
 */
export let capitalize = (str) => {
  if (!str) throw new TypeError("Missing Param 'Str'.");
  return str
    .split('')
    .map(
      (section) =>
        String.fromCodePoint(section.codePointAt(0)).toUpperCase() +
        section.slice(section.codePointAt(0) > 0xffff ? 2 : 1),
    )
    .join('');
};
/**
 * Replaces between two indexes of a string.
 * @memberOf string
 * @function
 * @example
 * console.log(_$.replaceBetween("Hello world", 6, 11, "earthlings")); // "Hello earthlings"
 * @param {String} string The string to operate on.
 * @param {Number} start The start index
 * @param {Number} end The end index
 * @param {String} what What to replace with.
 * @returns {String} The replaced string
 */
export let replaceBetween = (string, start, end, what) =>
  string.substring(0, start) + what + string.substring(end);
/**
 * Escapes a string of HTML
 * @function
 * @memberOf string
 * @param {String} str The string of HTML to escape.
 * @example
 * console.log(_$.escapeHTML("<div>")); // "&lt;div&gt;"
 * @returns {String} The escaped HTML.
 */
export let escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag),
  );
/**
 * Unescapes a string of HTML
 * @function
 * @memberOf string
 * @param {String} str The string of HTML to unescape.
 * @example
 * console.log(_$.unescapeHTML("&lt;div&gt;")); // "<div>"
 * @returns {String} The unescaped HTML.
 */
export let unescapeHTML = (str) =>
  str.replace(
    /&amp;|&lt;|&gt;|&#39;|&quot;/g,
    (tag) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&#39;': "'",
        '&quot;': '"',
      }[tag] || tag),
  );
/**
 * Returns the previous page that the user visited.
 * @function
 * @memberOf string
 * @example
 * console.log(_$.previousPage()); // e.g. "https://bijou.js.org"
 * @returns {String} The url of the previous page the user visited.
 */
export let previousPage = () => {
  node();
  return document.referrer || window.location.href;
};
//#endregion String
//#endregion bijou
/**
 * Bijou.js source documentation. In the `Bijou` namespace you will find the documentation for all of the functions in Bijou.js, if you have any questions, suggestions or bug reports pleast make an issue (here)[https://github.com/bijou-js/bijou.js/issues/new/choose]. Best of luck! Thanks for using Bijou.js! --Explosion--
 * @type {Object}
 * @namespace bijou
 * @author Explosion-Scratch, GrahamSH-LLK, Bijou.js contributors
 */
let _temp = {
  addEventListeners: addEventListeners,
  addStyles: addStyles,
  animate: animate,
  arrayDiff: arrayDiff,
  arrayToCSV: arrayToCSV,
  attributes: attributes,
  averageBy: averageBy,
  blendColors: blendColors,
  browser: browser,
  byteSize: byteSize,
  camelCase: camelCase,
  capitalize: capitalize,
  clone: clone,
  compStyle: compStyle,
  composeFunction: composeFunction,
  contains: contains,
  context: context,
  cookies: cookies,
  copy: copy,
  createElement: createElement,
  curryFunction: curryFunction,
  dayName: dayName,
  diff: diff,
  disableRightClick: disableRightClick,
  dispatch: dispatch,
  drag: drag,
  each: each,
  ease: ease,
  editDistance: editDistance,
  elementSiblings: elementSiblings,
  escapeHTML: escapeHTML,
  flatten: flatten,
  formToObject: formToObject,
  formatHTML: formatHTML,
  formatMilliseconds: formatMilliseconds,
  formatNumber: formatNumber,
  fullScreen: fullScreen,
  getHTML: getHTML,
  getJSON: getJSON,
  hashString: hashString,
  hexToRGB: hexToRGB,
  hub: hub,
  imageToData: imageToData,
  inPartialView: inPartialView,
  inView: inView,
  inlineCSS: inlineCSS,
  isAsync: isAsync,
  jsonToCsv: jsonToCsv,
  lightOrDark: lightOrDark,
  lightenColor: lightenColor,
  listen: listen,
  loadScript: loadScript,
  mapObjectKeys: mapObjectKeys,
  mapObjectValues: mapObjectValues,
  markdownToHTML: markdownToHTML,
  memoize: memoize,
  merge: merge,
  mobileOrDesktop: mobileOrDesktop,
  nFlatten: nFlatten,
  notify: notify,
  observeMutations: observeMutations,
  onOutsideClick: onOutsideClick,
  onScrollStop: onScrollStop,
  parseHTML: parseHTML,
  preloadImage: preloadImage,
  previousPage: previousPage,
  primesTo: primesTo,
  querySelector: querySelector,
  random: random,
  randomColor: randomColor,
  range: range,
  regex: regex,
  remove: remove,
  removeComments: removeComments,
  removeTags: removeTags,
  replaceBetween: replaceBetween,
  replaceMultiple: replaceMultiple,
  replaceSelection: replaceSelection,
  replaceText: replaceText,
  requestInterval: requestInterval,
  rgbToHex: rgbToHex,
  runAsync: runAsync,
  sanitize: sanitize,
  saveBlob: saveBlob,
  scrambleString: scrambleString,
  seedRandom: seedRandom,
  serializeForm: serializeForm,
  shuffleArray: shuffleArray,
  sortObj: sortObj,
  sortTable: sortTable,
  sortTableBy: sortTableBy,
  speak: speak,
  splice: splice,
  spliceArrayBuffer: spliceArrayBuffer,
  syllables: syllables,
  syntaxHighlight: syntaxHighlight,
  textNodes: textNodes,
  throttle: throttle,
  tilt: tilt,
  timeFunction: timeFunction,
  unCamelCase: unCamelCase,
  unescapeHTML: unescapeHTML,
  unionArrays: unionArrays,
  uniqueArray: uniqueArray,
  urlQuery: urlQuery,
  uuid: uuid,
  widows: widows,
  forTemplateLiteral: forTemplateLiteral,
};
// Imports and exports
export default _temp;
//Export so that when people do <script src="bijou" type="module"></script>
if (!isNode) {
  window._$ = _temp;
}
//So that we can use bijou in the source code.
export const _$ = _temp;
if (isNode) {
  try {
    module.exports = _temp;
  } catch (err) {
    console.error(err);
  }
}
