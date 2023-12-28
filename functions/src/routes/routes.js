import Router from "koa-router";
import * as todosController from "../handlers/controllers/todosController";
import todoInputMiddleware from "../middleware/todoMiddleware";

// Prefix all routes with /books
const router = new Router({
  prefix: "/api/todos",
});

// Routes will go here

router
  .post("/", todoInputMiddleware, todosController.createOne)
  .get("/", todosController.getTodosList)
  .patch("/", todosController.updateMany)
  .delete("/", todosController.removeMany);

export default router;
