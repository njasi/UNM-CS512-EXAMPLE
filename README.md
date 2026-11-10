# Example project with webpack & npm


## npm
npm is the node package manager and uh manages packages...

### Installation
Installation will vary across os, but its usually pretty simple

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

I would recommend using nvm (as noted in the above instructions)

- https://github.com/nvm-sh/nvm (linux, macos)
- https://github.com/nvm-windows/nvm (windows)

### Modules
You can install a module like so:
`npm install module_name`

You can install all modules already configured in the `package.json` with `npm i`

### Running scripts
You can predefine helper scripts in the package.json. 

The format I typically use with webpack includes a script to make a production build and another a development build (or launch a dev server). 

```json
"scripts": {
  "start": "webpack serve",
  "build": "webpack --mode production"
}
```

When you use `npm run start` npm executes the command `webpack serve`.

These are just convince helpers but they are quite convenient since you can also put longer commands in there, like a deploy command which updates your github page for example.


## Webpack

### Import / Export
webpack lets you use the ES module format, usually called ESM. It uses import and export to share code between files

```js
// ======== thing.js ========
// default export is usually the main thing in the file; like a class 
// you can only have one of these per file
export default function thing() => 5; 
// you can have many normal export statements per file
export const otherThing = 0; // normal export 
// if you don't export something it cant be imported, useful for internal
// functions and keeping your workspace clean
function _internalHelper(){
    console.log("Hi")
}

export function wrapper(){
    _internalHelper()
}

// ======== otherfile.js ========
import thing from "./thing.js";
import { otherThing } from "./thing.js"
console.log(thing()) // 5
console.log(otherThing) // 0

// ======== thirdfile.js ========
import {otherThing, wrapper} from "./thing.js
wrapper() // Hi
```

Now you do have to be careful to avoid circular imports, that is if you have files A, B, C:
- A imports from B
- B imports from C
- C imports from A

This will prevent your bundle from building, and you'll get an error.

NOTE: values are typically passed by reference when you import but im not sure this is guaranteed, so try avoid using them to directly share global state...

NOTE: most editors will autocomplete imports when you start typing something that needs to be imported.

### Config
Webpack is configured in the webpack.config.js file, they typically look something like this:

```js
const path = require("path");

module.exports = {
  // default mode used 
  mode: "development",
  // webpack starts building the dependency graph here.
  entry: "./src/index.js",
  // where the built output files are put 
  // (multiple can be configured but we wont need this)
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  // configuration for the webpack-dev-server plugin   
  devServer: {
    // files that will not change 
    // these files are served directly ie they are not processed by webpack.
    static: {
      directory: path.resolve(__dirname),
      watch: {
        ignored: /dist/,
      },
    },

    // write webpack-generated assets to disk as well as serving them
    // through the dev server
    devMiddleware: {
      writeToDisk: true,
    },
    // modules can be updated in the browser without reloading the entire page
    hot: true,
    // when changes are detected to a js file the dev server is reloaded 
    // (hot is in place updates, this is reload page to update)
    liveReload: true,
    // dev server update patches are compressed when sent to the client
    compress: true,
    // port the dev server runs on
    port: 8080,
    // do not automatically open the site in a browser when the server starts
    open: false,
  },
};
```

### Development server
Webpack has a plugin that adds a development server (webpack-dev-server) that auto refreshes 
whenever you make changes to the code. The settings important to us are noted above.

`npm run start`


### Production Build
Development builds still contain readable code, but they are not the most optimized
for the web. Production builds minify the code & make it more optimized for the web tm.

`npm run build`


## TLDR
```sh
# install packages from package.json
npm i

# run the devserver 
npm run start

# make a production build
npm run build

# update git submodules
git submodule update --remote
```