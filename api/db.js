import mysql from "mysql";

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "cookzilla",
});

db.connect(function (err) {
  if (err) {
    console.log("Error connecting to Database", err);
    return;
  }
  console.log("Connection established");
});
