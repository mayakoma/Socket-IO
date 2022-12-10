const HttpError = require("../model/httpError");
const User = require("../model/user");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing up failed ", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Log in failed, please try again", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid data, could not log in", 401);
    return next(error);
  }

  res
    .status(200)
    .json({ message: "login", user: existingUser.toObject({ getters: true }) });
};

exports.login = login;
exports.signup = signup;
