import * as yup from "yup";

export default async function todoInputMiddleware(ctx, next) {
  try {
    const postData = ctx.req.body;

    let schema = yup.object().shape({
      title: yup.string().trim().required(),
    });

    await schema.validate(postData);
    return next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}
