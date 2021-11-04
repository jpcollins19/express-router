const { getUsers, getPlaces, createUser, deleteUser } = require(`../db/index`);
const nav = require(`../templates`);

const app = require(`express`).Router();

module.exports = app;

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
                  ${places
                    .map(
                      (place) => `
                        <li>
                            ${place.name}
                        </li>
                  `
                    )
                    .join("")}
              </body>
          </html>`;

    res.send(html);
  } catch (err) {
    next(err);
  }
});
