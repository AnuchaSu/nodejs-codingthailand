const Staff = require("../models/staffModels");

exports.index = async (req, res, next) => {
  const staff = await Staff.find().sort({ _id: -1 });
  res.status(200).json({
    data: staff,
  });
};

exports.insert = async (req, res, next) => {
  const { name, salary } = req.body;

  let staff = new Staff({
    name: name,
    salary: salary,
  });
  await staff.save();

  res.status(201).json({
    message: "Add",
  });
};

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);

    if (!staff) {
      throw new Error("not found employee");
    }
    res.status(200).json({
      data: staff,
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "something wrong " + error.message,
      },
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const staff = await Staff.deleteOne({ _id: id });

    if (staff.deletedCount === 0) {
      throw new Error("can't delete");
    }
    res.status(200).json({
      message: "already delete",
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "something wrong " + error.message,
      },
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    // const staff = await Staff.findByIdAndUpdate(id, {
    //   name: name,
    //   salary: salary,
    // });

    // res.status(200).json({
    //   message: "fixed"
    // });
    const staff = await Staff.updateOne(
      { _id: id },
      {
        name: name,
        salary: salary,
      }
    );

    if (staff.nModified === 0) {
      throw new Error("can't update");
    }
    res.status(200).json({
      message: "already update",
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "something wrong " + error.message,
      },
    });
  }
};
