// code away!
const server = require("./server");

const port = 2100;

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong, please try again later",
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
