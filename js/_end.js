//#endregion bijou
/**
 * Bijou.js source documentation. In the `Bijou` namespace you will find the documentation for all of the functions in Bijou.js, if you have any questions, suggestions or bug reports pleast make an issue (here)[https://github.com/bijou-js/bijou.js/issues/new/choose]. Best of luck! Thanks for using Bijou.js! --Explosion--
 * @type {Object}
 * @author Explosion-Scratch, GrahamSH-LLK, Bijou.js contributors
 */
let _temp = {
  addDaysToDate: addDaysToDate,
  addEventListeners: addEventListeners,
  addMinutesToDate: addMinutesToDate,
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
  create: create,
  createElement: createElement,
  curryFunction: curryFunction,
  dayName: dayName,
  debounce: debounce,
  deburr: deburr,
  diff: diff,
  disableRightClick: disableRightClick,
  dispatch: dispatch,
  drag: drag,
  each: each,
  ease: ease,
  editDistance: editDistance,
  elementSiblings: elementSiblings,
  escapeHTML: escapeHTML,
  factorial: factorial,
  fastestFunction: fastestFunction,
  flatten: flatten,
  flattenObj: flattenObj,
  forTemplateLiteral: forTemplateLiteral,
  formToObject: formToObject,
  formatHTML: formatHTML,
  formatMilliseconds: formatMilliseconds,
  formatNumber: formatNumber,
  fullScreen: fullScreen,
  getHTML: getHTML,
  getImages: getImages,
  getJSON: getJSON,
  hash: hash,
  hashString: hashString,
  hexToRGB: hexToRGB,
  hub: hub,
  imageToData: imageToData,
  inPartialView: inPartialView,
  inView: inView,
  injectCSS: injectCSS,
  inlineCSS: inlineCSS,
  isAsync: isAsync,
  isDateValid: isDateValid,
  isPrime: isPrime,
  jsonToCsv: jsonToCsv,
  juxt: juxt,
  lightOrDark: lightOrDark,
  lightenColor: lightenColor,
  listen: listen,
  loadScript: loadScript,
  luhnCheck: luhnCheck,
  mapObjectKeys: mapObjectKeys,
  mapObjectValues: mapObjectValues,
  mapString: mapString,
  markdownToHTML: markdownToHTML,
  memoize: memoize,
  merge: merge,
  mobileOrDesktop: mobileOrDesktop,
  nFlatten: nFlatten,
  notify: notify,
  observeMutations: observeMutations,
  onOutsideClick: onOutsideClick,
  onScrollStop: onScrollStop,
  parseCookie: parseCookie,
  parseHTML: parseHTML,
  playSection: playSection,
  prefixCSS: prefixCSS,
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
  renderElement: renderElement,
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
  sleep: sleep,
  sortObj: sortObj,
  sortTable: sortTable,
  sortTableBy: sortTableBy,
  speak: speak,
  splice: splice,
  spliceArrayBuffer: spliceArrayBuffer,
  spread: spread,
  syllables: syllables,
  syntaxHighlight: syntaxHighlight,
  textNodes: textNodes,
  throttle: throttle,
  tilt: tilt,
  timeFunction: timeFunction,
  titleCase: titleCase,
  unCamelCase: unCamelCase,
  unescapeHTML: unescapeHTML,
  unionArrays: unionArrays,
  uniqueArray: uniqueArray,
  urlQuery: urlQuery,
  uuid: uuid,
  widows: widows,
};
_temp = sortObj(_temp);
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
