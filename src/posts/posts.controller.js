const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // your solution here
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  // your solution here
  const updatedPost = {
    ...req.body.data,
    post_id: res.locals.post.post_id,
  };
  const data = await service.update(updatedPost);
  res.json({ data });
}

async function destroy(req, res) {
  // your solution here
  // const post = await service.read(req.params.postId);
  // await service.delete(post.post_id);
  await service.delete(res.locals.post.post_id);
  res.sendStatus(204);
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
