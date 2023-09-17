const Order = require("../../../models/order");
const moment = require("moment");
function orderController() {
  return {
    order(req, res) {
      //validation
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.session.passport.user,
        items: req.session.cart.items,
        phone,
        address,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed successfully");
          delete req.session.cart;
          return res.redirect("/customers/orders");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          console.log(err);
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find(
        {
          customerId: req.session.passport.user,
        },
        null,
        { sort: { createdAt: -1 } }
      );
      res.header(
        "Cache-Control",
        "no-cache,private,no-stare,must-revalidate,max-stale=0,post-check=0,pre-check=0"
      );
      res.render("customers/order", { orders, moment });
    },
  };
}

module.exports = orderController;
