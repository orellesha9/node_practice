import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(req.method);
  res.json(req.method)

});

app.listen(3000, () => {
  console.log("Server start port 3000");
});
