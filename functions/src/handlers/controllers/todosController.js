import * as todoRepo from "../../database/todoRepository";

export async function getTodosList(ctx) {
  try {
    const todos = await todoRepo.getList();

    ctx.body = todos;
  } catch (error) {
    console.log(error);
  }
}

export async function createOne(ctx) {
  try {
    const postData = ctx.req.body;
    const newTodo = await todoRepo.create(postData);

    ctx.status = 201;
    ctx.body = {
      data: newTodo,
      success: true,
    };
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message,
    };
    console.log(error);
  }
}

export async function updateMany(ctx) {
  try {
    const { data } = ctx.req.body;

    await todoRepo.updateMany(data);
    ctx.body = {
      success: true,
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
}

export async function removeMany(ctx) {
  try {
    const data = ctx.req.body;

    await todoRepo.removeMany(data);
    ctx.body = {
      success: true,
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
}
