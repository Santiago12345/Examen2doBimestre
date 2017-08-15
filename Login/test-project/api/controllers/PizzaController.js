/**
 * PizzaController
 *
 * @description :: Server-side logic for managing Pizzas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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

