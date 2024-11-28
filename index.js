import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ChapterCheck",
  password: "preeti",
  port: 5432,
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/new", (req, res)=> {
  res.render("review.ejs");
})

app.post("/add", async(req, res)=>{
  let isbn = req.body.ISBN;
  let title = req.body.title;
  let author = req.body.user;
  let rating = req.body.rating;
  let review = req.body.review;
  console.log("isbn: "+isbn+"\ntitle: "+title+"\nauthor: "+author+"\nrating: "+rating+"\nreview: "+ review+"\n");

  let new_entry = await db.query("Insert into reviews (isbn, title, author, rating, review) values ($1, $2, $3, $4, $5) returning *", 
    [isbn, title, author, rating, review]
  );
  console.log("\n"+new_entry+"\n");
  res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  

/*
Make the database and start inserting.
Sort by: title, rating
Search author
Search ISBN
Delete review and edit option
*/