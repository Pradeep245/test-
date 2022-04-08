const express = require("express");

const app = express();
const fetch = require("node-fetch");
const fs = require("fs");

const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  let url = `https://icanhazdadjoke.com/search?term=${req.query.term}`;
  try {
    let data = await fetch(url, {
      method: "get",
      headers: { Accept: "application/json" },
    });
    let d1 = await data.json();

    let d = JSON.stringify(d1.results);
    let file = await fs.writeFileSync("./test.txt", d);

    res.json(d1.results);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
