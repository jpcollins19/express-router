const {
  client,
  getUsers,
  getPlaces,
  createUser,
  deleteUser,
} = require(`./db/index`);

const express = require(`express`);
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(require("method-override")("_method"));

const nav = ({ users, places }) => {
  return `
    <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='/users'>Users (${users.length})</a></li>
        <li><a href='/places'>Places (${places.length})</a></li>
    </ul>`;
};

app.get(`/`, async (req, res, next) => {
  try {
    const [users, places] = await Promise.all([getUsers(), getPlaces()]);
    const html = `

    <html>
        <head>
            <title>Express Router</title>
        </head>
        <body>
        ${nav({ users, places })}
            <h1>Welcome to Acme Users and Places</h1>
        </body>
    </html>`;

    res.send(html);
  } catch (err) {
    next(err);
  }
});

app.use(`/users`, require(`./routes/users`));

app.use(`/places`, require(`./routes/places`));

const init = async () => {
  try {
    await client.connect();
    console.log(await getUsers());
    console.log(await getPlaces());
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
