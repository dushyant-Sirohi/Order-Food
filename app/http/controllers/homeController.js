const Menu = require("../../models/menu");
function homeController() {
  return {
    async index(req, res) {
      const foodMenu = await Menu.find();
      res.render("home", { foodMenu });
    },
  };
}

module.exports = homeController;
