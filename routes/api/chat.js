const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Messages = require("../../models/Messages");

router.get("/getNewMessages/:id", auth, async (req, res) => {
  try {
    let messages = await Messages.find({
      recipentId: req.params.id,
      newMessages: { $gte: 1 }
    });
    messages = messages.map(({ newMessages, senderId }) => {
      return { newMessages, senderId };
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ err: [{ msg: "Błąd servera" }] });
  }
});

module.exports = router;
