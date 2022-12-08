const HttpError = require("../model/httpError");
const Code = require("../model/code");

const getCode = async function (req, res, next) {
  const codeId = req.params.id;
  let existsCode;
  try {
    existsCode = await Code.findById(codeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the code.",
      500
    );
    return next(error);
  }

  if (!existsCode) {
    res.status(404).send("Could not find the code.");
    return;
  }
  res.status(201).json({ code: existsCode.toObject({ getters: true }) });
};
const editCode = async function (req, res, next) {
  const { id, newCode } = req.body;
  let prevCode;
  try {
    prevCode = await Code.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the code.",
      500
    );
    return next(error);
  }
  if (!prevCode) {
    res.status(404).send("Could not find the code.");
    return;
  }
  try {
    await prevCode.update({ code: newCode });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the code.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "update" });
};

exports.editCode = editCode;
exports.getCode = getCode;
