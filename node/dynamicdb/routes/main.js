const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("sync-mysql");
const env = require("dotenv").config({ path: "../../.env" });

var connection = new mysql({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.send("hello world~!!");
});

// request 1, query 0
app.get("/select", (req, res) => {
  const result = connection.query("select * from user");
  console.log(result);
  // res.send(result);
  res.writeHead(200);
  var template = `
        <!doctype html>
        <html>
        <head>
            <title>Result</title>
            <meta charset="utf-8">
            <style>
table { /* 이중 테두리 제거 */
border-collapse : collapse; 
}
td, th { /* 모든 셀에 적용 */
text-align : left;
padding : 5px;
height : 15px; 
width : 100px;
}
thead, tfoot { /* <thead>의 모든 셀에 적용 */
background : darkgray;
color : yellow;
}
tbody tr:nth-child(even) { /* 짝수 <tr>에 적용*/
background : aliceblue;
}
tbody tr:hover {
background : pink;
}
</style>
        </head>
        <body>
        <table border="1" style="margin:auto; text-align:center;">
        <thead>
            <tr><th>User ID</th><th>Password</th></tr>
            <h>데이터가 존재하지 않습니다.</h>
        </thead>
        <tbody>
        `;
  for (var i = 0; i < result.length; i++) {
    template += `
        <tr>
            <td>${result[i]['userid']}</td>
            <td>${result[i]['passwd']}</td>
        </tr>
        `;
  }
  template += `
        </tbody>
        </table>
        </body>
        </html>
    `;
  res.end(template);

});

// request1, query 0
app.post("/select", (req, res) => {
  const result = connection.query("select * from user");
  console.log(result);
  res.send(result);
});

// request 1, query 1
app.get("/selectQuery", (req, res) => {
  const userid = req.query.userid;
  const result = connection.query("SELECT * FROM user where userid=?", [
    userid,
  ]);
  console.log(result);
  res.send(result);
});

// request 1, query 1
app.post("/selectQuery", (req, res) => {
  const userid = req.body.userid;
  const result = connection.query("SELECT * FROM user where userid=?", [
    userid,
  ]);
  console.log(result);
  res.send(result);
});

app.post("/insert", (req, res) => {
  const { id, pw } = req.body;
  const result = connection.query("insert into user values(?, ?)", [id, pw]);
  console.log(result);
  res.redirect("/selectQuery?userid=" + req.body.id);
});

app.post("/update", (req, res) => {
  const { id, pw } = req.body;
  const result = connection.query("update user set passwd=? where userid=?", [
    pw,
    id,
  ]);
  console.log(result);
  res.redirect("/selectQuery?userid=" + req.body.id);
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  const result = connection.query("delete from user where userid=?", [id]);
  console.log(result);
  res.redirect("/select");
});

module.exports = app;
