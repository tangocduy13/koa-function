"use strict";

var _koa = _interopRequireDefault(require("koa"));
var _routes = _interopRequireDefault(require("../routes/routes"));
var _cors = _interopRequireDefault(require("@koa/cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = new _koa.default();
app.use((0, _cors.default)());
app.use(_routes.default.routes());
app.use(_routes.default.allowedMethods());
module.exports = app;
//# sourceMappingURL=api.js.map