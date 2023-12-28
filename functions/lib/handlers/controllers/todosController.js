"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOne = createOne;
exports.getTodosList = getTodosList;
exports.removeMany = removeMany;
exports.updateMany = updateMany;
var todoRepo = _interopRequireWildcard(require("../../database/todoRepository"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function getTodosList(ctx) {
  try {
    const todos = await todoRepo.getList();
    ctx.body = todos;
  } catch (error) {
    console.log(error);
  }
}
async function createOne(ctx) {
  try {
    const postData = ctx.req.body;
    const newTodo = await todoRepo.create(postData);
    ctx.status = 201;
    ctx.body = {
      data: newTodo,
      success: true
    };
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message
    };
    console.log(error);
  }
}
async function updateMany(ctx) {
  try {
    const {
      data
    } = ctx.req.body;
    await todoRepo.updateMany(data);
    ctx.body = {
      success: true
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
async function removeMany(ctx) {
  try {
    const data = ctx.req.body;
    await todoRepo.removeMany(data);
    ctx.body = {
      success: true
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message
    };
  }
}
//# sourceMappingURL=todosController.js.map