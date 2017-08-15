/**
 * PizzaController
 *
 * @description :: Server-side logic for managing Pizzas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  createPizza: function (req, res, next) {
    Pizza.create( req.params.all(), function  pizzaCreated(err, user) {


      if(err) {
        console.log(err);
        req.session.flash = {
          err: err
        }


        return res.redirect('/user/show');
      }

      //res.json(user);
      res.redirect('/user/show/'+pizza.nombreIngrediente);

    });

  },
  mostrarIngredientes: function(req, res, next) {
    Pizza.findOne(req.param('nombreIngrediente'), function foundPizza(err, user) {
      if (err) return next(err);
      if (!pizza) return next();
      console.log(pizza);
      res.view({
        pizza : pizza
      });
    });
  },

  agregarIngrediente: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      var cookies = req.cookies;
      console.log(cookies);
      if (cookies.arregloIngredientes) {
        var arregloIngredientes = cookies.arregloIngredientes.idsCliente;
        var existeUsuario = arregloIngredientes.find(function (idUsuario) {
          return idUsuario == parametros.id;
        });
        if (existeUsuario) {
          return res.redirect('/');
        }
        else {
          arregloIngredientes.push(parametros.id);
          res.cookie('arregloIngredientes', {
            idsCliente: arregloIngredientes
          });
          return res.redirect('/');
        }
      }
      else {
        var arregloIngredientes = [];
        arregloIngredientes.push(parametros.id);
        res.cookie('arregloIngredientes', {
          idsCliente: arregloIngredientes
        });
        return res.redirect('/');
      }
    }
    else {
      return res.badRequest('No envia parametros');
    }
  }

};

