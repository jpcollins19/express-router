const { getUsers, getPlaces, createUser, deleteUser } = require(`../db/index`);

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
                  <form method='POST'>
                      <input name='name'/>
                      <button>Create</button>
                  </form>
                ${users
                  .map(
                    (user) => `
                      <li>
                          ${user.name}
                          <form method='POST' action='/users/${user.id}?_method=delete'>
                          <button>x</button>
                          </form>
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

app.post(`/`, async (req, res, next) => {
  try {
    await createUser(req.body);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
});

app.delete(`/:id`, async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
});
