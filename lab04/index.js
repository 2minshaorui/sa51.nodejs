// 1. install express library
const e = require("express");
const express = require("express");

// 2. create an instance of express
const app = express();

// 3. define router object
const tvRouter = express.Router();
tvRouter.route("/tvshows").get((req, res) => {
  let result = {};
  console.log(req.query);
  //#region 4. list items in constant data
  //   let result = { result: data };
  //#endregion

  //#region 5. pass data through URL using query strings
  /* key-value pairs located after "?" char in the URL
   *
   * console.log(req.query) prints key-value pairs in the console
   * directing to "localhost:3000/api/tvshows"
   * returns {}
   * while
   * directing to "localhost:3000/api/tvshows?key1=value1&key2=value2"
   * returns { key1: 'value1', key2: 'value2' }
   */

  //#endregion

  //#region 6. use string.includes(substring) to check whether string contains substring & use string.toLowerCase() to convert string to lowercase
  /**
   * filter items by substring in title
   * if lowercase-d title contains lowercase-d query string
   * return title
   *
   * key of query string here is 'contains'
   * directing to "localhost:3000/api/tvshows?contains=The"
   * URL sends query string with key 'contains' & value 'The'
   * browser shows items which satisfy condition
   * console shows { contains: 'The' }
   */
  if (req.query.contains) {
    result = data.filter((item) =>
      item.title.toLowerCase().includes(req.query.contains.toLowerCase())
    );
  } else {
    result = data;
  }
  //#endregion

  //#region 7. sort by title after which filter
  /**
   * key of query string here is 'sorted'
   * directing to "localhost:3000/api/tvshows?contains=The&sorted=asc"
   * URL sends query string with keys 'contains' & 'sorted'
   * browser shows items which satisfy condition: filtered & sorted
   * console shows { contains: 'The', sorted: 'asc' }
   */
  result.sort(sortTitle(req.query.sorted));
  //#endregion

  res.json(result); // returns a json in browser
});

//#region 8. DEMO pass data through URL using params
/**
 * query string contains route which can be accessed
 * through request.params.id
 *
 * directing to "localhost:3000/api/demo/" will give an error
 * as params x cannot be null whereas both y & z are optional
 */
tvRouter.route("/demo/:x/:y?/:z?").get((req, res) => {
  console.log(req.params);
  res.json([req.params.x, req.params.y, req.params.z]);
});
//#endregion

//#region 8. pass data through URL using params to return respective item
/**
 * directing to "localhost:3000/api/tvshows/3"
 * browser displays item of id = 3
 * console shows { id: 3 }
 */
tvRouter.route("/tvshows/:id").get((req, res) => {
  console.log(req.params);
  const result = data.filter((item) => item.id == req.params.id);
  const item = result[0];
  res.json({ result: item });
});
//#endregion

//#region 9. add optional param
/**
 * the key 'case' here is an optional param
 * using object spread operator '...' here
 * can be used to (1) clone an object or (2) merging 2 objects
 *
 * directing to "localhost:3000/api/tvshows/3/upper"
 * browser displays item of id = 3 in uppercase
 * console shows { id: '3', case: 'upper' }
 */
tvRouter.route("/tvshows/:id/:case?").get((req, res) => {
  console.log(req.params);
  const result = data.filter((item) => item.id == req.params.id);
  let item = { ...result[0] };

  if (item) {
    let { title } = item;

    if (req.params.case === "upper") {
      // uppercase if value of key 'case' is 'upper'
      title = item.title.toUpperCase();
    } else if (req.params.case === "lower") {
      // lowercase if value of key 'case' is 'lower'
      title = item.title.toLowerCase();
    }
    item = { ...item, title };
  }
  res.json({ result: item });
});
//#endregion

// 4. listing items
const data = [
  { id: 1, title: "Game of Thrones" },
  { id: 2, title: "Stranger Things" },
  { id: 3, title: "The Walking Dead" },
  { id: 4, title: "The 100" },
  { id: 5, title: "Arrow" },
];

// 7. define function sortTitle() to sort titles
const sortTitle = (order) => {
  // checks value of key 'order'
  // === checks both value & datatype
  if (order === "asc") {
    return (a, b) => (a.title < b.title ? -1 : 1);
  }
  if (order === "dsc") {
    return (a, b) => (a.title > b.title ? 1 : -1);
  }
  return undefined;
};

app.use("/api", tvRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});
