const next = require("next");
const express = require("express");
const { default: axios } = require("axios");
const cookieParser = require("cookie-parser");
const dev = process.env.NDOE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

const AUTH_USER_TYPE = "authenticated";
const COOKIE_SECRET = "l345khjbgrkl453usi643qngrøoub";
const COOKIE_OPTIONS = {
  // domain: '',
  httpOnly: true,
  secure: !dev,
  signed: true,
};

const authenticate = async (email, password) => {
  const { data } = await axios.get("http://jsonplaceholder.typicode.com/users");

  return data.find((user) => {
    if (user.email === email && user.website === password) return user;
  });
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  server.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticate(email, password);
    console.log({ user });
    if (!user) return res.status(403).send("Invalid email or password");
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE,
    };

    res.cookie("token", userData, COOKIE_OPTIONS);
    res.json(userData);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on PORT ${port}`);
  });
});
