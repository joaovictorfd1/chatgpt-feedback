"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/tiny-warning";
exports.ids = ["vendor-chunks/tiny-warning"];
exports.modules = {

/***/ "(ssr)/./node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar isProduction = \"development\" === \"production\";\nfunction warning(condition, message) {\n    if (!isProduction) {\n        if (condition) {\n            return;\n        }\n        var text = \"Warning: \" + message;\n        if (typeof console !== \"undefined\") {\n            console.warn(text);\n        }\n        try {\n            throw Error(text);\n        } catch (x) {}\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warning);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdGlueS13YXJuaW5nL2Rpc3QvdGlueS13YXJuaW5nLmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsZUFBZUMsa0JBQXlCO0FBQzVDLFNBQVNDLFFBQVFDLFNBQVMsRUFBRUMsT0FBTztJQUNqQyxJQUFJLENBQUNKLGNBQWM7UUFDakIsSUFBSUcsV0FBVztZQUNiO1FBQ0Y7UUFFQSxJQUFJRSxPQUFPLGNBQWNEO1FBRXpCLElBQUksT0FBT0UsWUFBWSxhQUFhO1lBQ2xDQSxRQUFRQyxJQUFJLENBQUNGO1FBQ2Y7UUFFQSxJQUFJO1lBQ0YsTUFBTUcsTUFBTUg7UUFDZCxFQUFFLE9BQU9JLEdBQUcsQ0FBQztJQUNmO0FBQ0Y7QUFFQSxpRUFBZVAsT0FBT0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NoYXRncHQtZmVlZGJhY2svLi9ub2RlX21vZHVsZXMvdGlueS13YXJuaW5nL2Rpc3QvdGlueS13YXJuaW5nLmVzbS5qcz80ZTQyIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFpc1Byb2R1Y3Rpb24pIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHQgPSBcIldhcm5pbmc6IFwiICsgbWVzc2FnZTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdGhyb3cgRXJyb3IodGV4dCk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3YXJuaW5nO1xuIl0sIm5hbWVzIjpbImlzUHJvZHVjdGlvbiIsInByb2Nlc3MiLCJ3YXJuaW5nIiwiY29uZGl0aW9uIiwibWVzc2FnZSIsInRleHQiLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwieCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/tiny-warning/dist/tiny-warning.esm.js\n");

/***/ })

};
;