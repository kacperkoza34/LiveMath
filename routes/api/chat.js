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

router.get(
  "/loadAllMessages/:senderId/:recipentId/:startRange/:endRange",
  auth,
  async (req, res) => {
    const { senderId, recipentId, startRange, endRange } = req.params;
    try {
      let messagesBySender = await Messages.findOne({
        recipentId: recipentId,
        senderId: senderId
      });

      let messagesByRecipent = await Messages.findOne({
        recipentId: senderId,
        senderId: recipentId
      });

      let recipentMessages;
      let senderMessages;

      if (messagesByRecipent) {
        recipentMessages = messagesByRecipent.messages;
        messagesByRecipent.newMessages = 0;
        await messagesByRecipent.save();
      } else recipentMessages = [];

      if (messagesBySender) {
        senderMessages = messagesBySender.messages;
      } else senderMessages = [];

      const compare = (a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      };

      const allMessages = [...recipentMessages, ...senderMessages].sort(
        compare
      );

      let finalEndRange = endRange;

      while (finalEndRange > allMessages.length) {
        finalEndRange--;
      }

      const response = allMessages.slice(
        allMessages.length - finalEndRange,
        allMessages.length - startRange
      );

      //if(finalEndRange !== 12) response.push({author: 'chatBoot', content:'wszystko'});
      //if(!allMessages.length) response.push({author: 'chatBoot', content:'Napisz pierwszą Wiadomość'});

      res.json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send([
        {
          content: "Błąd czatu",
          date: Date.now(),
          author: req.params.senderId
        }
      ]);
    }
  }
);

module.exports = router;
