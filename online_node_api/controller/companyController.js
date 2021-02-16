const Company = require('../models/companyModels')

exports.index = async (req, res, next) => {
    const company = await Company.findOne();
    res.status(200).json({
      data:company
    })
     
  };