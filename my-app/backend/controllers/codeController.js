const HttpError = require("../model/httpError");
const Code = require("../model/code");

const addCode = async (req, res, next) => {
  const { title, code } = req.body;
  const createCode = new Code({
    title,
    code,
  });

  try {
    await createCode.save();
  } catch (err) {
    const error = new HttpError("creating code failed, please try again", 500);
    return next(error);
  }
  res.status(201).json({ code: createCode.toObject({ getters: true }) });
};
const getListCode = async (req, res, next) => {
  let listCode;
  try {
    listCode = await Code.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching list failed, please try again later",
      500
    );
    return next(error);
  }

  res.json({ list: listCode.map((code) => code.toObject({ getters: true })) });
};
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
exports.getListCode = getListCode;
exports.addCode = addCode;
