import { ShowUser, SignInUser, ListUser } from '../use-cases/user';
import { generateJWToken } from "../middlewares/authentication/jwt";

export default function addUserRoute(router) {
  router.get("/u/all", async (req, res) => {
    res.send(await ListUser.execute());
  });

  router.get("/u/:username", async (req, res) => {
    const { username } = req.params;
    res.send(await ShowUser.execute({ userIdentifier: username, externalUse: true }));
  });
 

  router.post("/signin", async (req, res) => {
    try {
      const { username, password } = req.body.data;
      const validUser = await SignInUser.execute(username, password);
      if (validUser == undefined) {
        throw new Error("Invalid credentials. Please try again.")
      }
      const token = await generateJWToken(validUser.serialize())
      res.status(200).send(token)
    } catch (e) {
      console.log(e)
      res.send("not ok")
    }
  })

  router.get("/me", (req, res) => {
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null })
    }
  })
};