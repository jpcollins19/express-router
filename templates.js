const nav = ({ users, places }) =>
  `
        <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/users'>Users (${users.length})</a></li>
            <li><a href='/places'>Places (${places.length})</a></li>
        </ul>`;
module.exports = {
  nav,
};
