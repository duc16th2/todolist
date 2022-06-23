module.exports = function (mongoose) {
  mongoose
    .connect("mongodb://localhost:27017/todos1")
    .then(() => {
      console.log("connect db successful");
    })
    .catch(() => {
      console.log("error to connect db");
    });
};
