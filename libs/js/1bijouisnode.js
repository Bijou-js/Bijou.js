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
//#region Bijou