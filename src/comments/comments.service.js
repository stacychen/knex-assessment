const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*");
}

function listCommenterCount() {
  // your solution here
  return knex("comments")
    .join("users", "comments.commenter_id", "users.user_id")
    .count("comments.comment")
    .select(
      "users.user_email as commenter_email",
      knex.raw("cast(count(comments.comment) as integer) as count")
    )
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  // your solution here
  return knex("comments")
    .join("posts", "comments.post_id", "posts.post_id")
    .join("users", "comments.commenter_id", "users.user_id")
    .select(
      "comments.comment_id",
      "comments.comment",
      "users.user_email as commenter_email",
      "posts.post_body as commented_post"
    )
    .where({ comment_id: commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
