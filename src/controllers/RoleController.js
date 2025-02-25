const roleModel = require("../models/RoleModel")
//roleModel == roles
const getAllRoles = async (req, res) => {
  //await....
  //select * from roleModel

  const roles = await roleModel.find() //[{}]

  res.json({
    message: "role fetched successfully",
    data:roles
  });
};

module.exports = {
    getAllRoles
}
