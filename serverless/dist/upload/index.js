module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lambdas/upload/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/commons/ResponseModel.js":
/***/ (function(module, exports) {

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN;

class ResponseModel {
  constructor(statusCode, body) {
    console.log('ALLOW_ORIGIN', ALLOW_ORIGIN);
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = {
      'Access-Control-Allow-Origin': ALLOW_ORIGIN
    };
  }

}

module.exports = ResponseModel;

/***/ }),

/***/ "./src/lambdas/upload/index.js":
/***/ (function(module, exports, __webpack_require__) {

const ResponseModel = __webpack_require__("./src/commons/ResponseModel.js");

const AWS = __webpack_require__("aws-sdk");

AWS.config.update({
  region: 'ap-southeast-1'
});
const S3 = new AWS.S3();
const FILE_BUCKET = process.env.FILE_BUCKET;
console.log(`FILE_BUCKET : ${FILE_BUCKET}`);

exports.handler = async event => {
  console.log(event);
  let fileName = event.queryStringParameters['file-name'];
  let gd = event.queryStringParameters['gd'];

  if (!fileName || !gd) {
    return new ResponseModel(400, {
      message: 'Missing file name or GD'
    });
  } else {
    fileName = `${gd}__${Date.now()}_${fileName}`;
  }

  let date = new Date();
  const objectKey = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}/${gd}/${fileName}`;
  const param = {
    Bucket: FILE_BUCKET,
    Key: objectKey,
    Expires: 15 * 60,
    ContentType: 'binary/octet-stream'
  };
  const url = S3.getSignedUrl('putObject', param);
  return new ResponseModel(200, {
    url
  });
};

/***/ }),

/***/ "aws-sdk":
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ })

/******/ });