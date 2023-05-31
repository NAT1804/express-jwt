import db from "../db";
const ROLES = db.role;
const User = db.user;

export const checkDuplicateusernameOrEmail = async (req, res, next) => {
  try {
    let user = User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!",
    });
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};
