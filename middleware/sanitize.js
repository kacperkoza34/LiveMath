const sanitize = require("mongo-sanitize");
const sanitizeHtml = require("sanitize-html");

module.exports = async function (req, res, next) {
  try {
    if (req.body.email) {
      req.body.email = sanitize(req.body.email);
    }
    if (req.body.password) {
      req.body.password = sanitize(req.body.password);
    }
    if (req.body.name) {
      req.body.content = sanitizeHtml(req.body.content);
    }
    if (req.body.content) {
      req.body.content = sanitizeHtml(req.body.content);
    }
    if (req.body.model) {
      req.body.model = sanitizeHtml(req.body.model);
    }
    if (req.body.variables) {
      req.body.variables = req.body.variables.map(
        ({ variable, description }) => {
          return {
            variable: sanitizeHtml(variable),
            description: sanitizeHtml(description),
          };
        }
      );
    }

    if (req.body.additionalVariables) {
      req.body.additionalVariables = req.body.additionalVariables.map(
        ({ variable, description }) => {
          return {
            variable: sanitizeHtml(variable),
            description: sanitizeHtml(description),
          };
        }
      );
    }

    if (req.body.model) {
      req.body.model = sanitizeHtml(req.body.model);
    }

    if (req.body.message) {
      req.body.message = sanitizeHtml(req.body.message);
    }

    if (req.body.name) {
      req.body.name = sanitizeHtml(req.body.name);
    }

    if (req.body.groups) {
      req.body.groups = req.body.groups.map((item) => {
        for (let i in item) {
          item[i] = sanitizeHtml(item[i]);
        }
        return item;
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ err: [{ msg: "Validation error" }] });
  }
};
