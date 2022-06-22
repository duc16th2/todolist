module.exports = function (mongoose) {
  mongoose
    .connect("mongodb://localhost:27017/todos")
    .then(() => {
      console.log("success");
    })
    .catch(() => {
      console.log("fail");
    });
};
