import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/new", (req, res)=> {
  res.render("review.ejs");
})

app.post("/add", (req, res)=>{
  let isbn = req.body.ISBN;
  let title = req.body.title;
  let author = req.body.user;
  let rating = req.body.rating;
  let review = req.body.review;
  console.log("isbn: "+isbn+"\ntitle: "+title+"\nauthor: "+author+"\nrating: "+rating+"\nreview: "+ review+"\n");
  res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  