 var vueApp = new Vue({

     el: "#vueApp",
     data: {
         alerta: {
             titulo: "Error",
             mensaje: "Texto"

         },
         estadoorden: true,
         mesacobrar: "",
         meserocobrar: "",
         clientecobrar: "",
         totalcobrar: 0,
         efectivo: null,
         vuelto: 0,
         contador: 1,
         cantidadtabla: 1,
         cantidadxtabla: [],
         detalleordenproductos: [],
         precioporcantidad: 1,
         categoriaSelected: 1,
         ordenSelected: 0,
         productoSelected: 0,

         //objeto para agregar una nueva orden
         nuevaorden: {
             "idOrden": 0,
             "fecha": "",
             "mesero": "",
             "mesa": "",
             "cliente": "",
             "estado": "A",
             "total": 0,
             "observacion": ""

         },
         detalleordencobrar: [],
         detalletraer: [],
         //se almacenan las categorias que estan en la base de datos 
         categorias: [],
         //se almacenan los productos que estan en la base de datos
         productos: [],
         productosxdetalle: [],
         detalleordens: [],
         estado: {
             "estado": "C"
         },
         productosdetalle: {
             idProducto: "",
             nombreProducto: "",
             precio: "",
             cantidad: "",
         },
         //se almacenan todas los odenes que estan en la base de datos
         Ordenes: [],
         orderByCampo: "",
         orderByAsc: 1,
         textoBusqueda: "",
     },



     methods: {
         buscar: function(x) {

             if (this.textoBusqueda == "")
                 return true;

             var cad = this.Ordenes[x].total +
                 this.Ordenes[x].mesero + this.Ordenes[x].mesa + this.Ordenes[x].cliente + this.Ordenes[x].idOrden;
             cad = cad.toUpperCase();

             if (cad.indexOf(this.textoBusqueda.toUpperCase()) >= 0)
                 return true;
             else
                 return false;



         },
         fechahoy: function() {
             var f = new Date();
             (f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear());
             this.nuevaorden.fecha = f;
             this.nuevaorden.tiempopreparado = f;
             this.nuevaorden.tiemporapido = f;


         },
         mostrarAlerta: function(titu, msg) {
             this.alerta.titulo = titu;
             this.alerta.mensaje = msg;

             $("#miAlerta").show('fade');
             setTimeout(function() {
                 $("#miAlerta").hide('fade');
             }, 5000);

         },
         cerrarAlerta: function() {
             $('#miAlerta').hide('fade');
         },

         //consume la API con axios
         cargarDatos: function() {

             //Carga categorias
             axios.get('http://localhost:3000/api/Categoria')
                 .then(function(response) {
                     vueApp.categorias = response.data;


                 })
                 .catch(function(error) {
                     vueApp.mostrarAlerta("Error en API", error);
                 })
                 // carga los productos
             axios.get('http://localhost:3000/api/Productos')
                 .then(function(response) {
                     vueApp.productos = response.data;


                 })
                 .catch(function(error) {
                     vueApp.mostrarAlerta("Error en API", error);
                 })
                 //carga las ordenes
             axios.get('http://localhost:3000/api/Ordens')
                 .then(function(response) {
                     vueApp.Ordenes = response.data;


                 })
                 .catch(function(error) {
                     vueApp.mostrarAlerta("Error en API", error);
                 })
                 //carga detalle orden
             axios.get('http://localhost:3000/api/DetalleOrdens')
                 .then(function(response) {
                     vueApp.detalleordens = response.data;


                 })
                 .catch(function(error) {
                     vueApp.mostrarAlerta("Error en API", error);
                 })

         },

         mostrarEliminar: function() {
             $('#modalEliminar').modal('show');

         },



         cobrarorden: function() {
             $('#modalcobrarorden').modal('show');
         },


         mostrarDetalle: function(idorden) {

             $('#modaldetalle').modal('show');
             console.log(idorden);
             this.mesacobrar = this.Ordenes[idorden].mesa;
             this.meserocobrar = this.Ordenes[idorden].mesero;
             this.clientecobrar = this.Ordenes[idorden].cliente;
             this.totalcobrar = this.Ordenes[idorden].total;

             axios.get('http://localhost:3000/api/DetalleOrdens?filter=%7B%22where%22%3A%7B%22idOrden%22%3A%22' + this.Ordenes[idorden].idOrden + '%22%7D%7D')
                 .then(function(response) {

                     vueApp.detalleordencobrar = response.data;


                 })




         },
         mostrarModificar: function(idorden) {
             if (this.Ordenes[this.ordenSelected].estado === "A") {
                 $('#modal3').modal('show');
                 console.log(idorden);
                 this.mesacobrar = this.Ordenes[idorden].mesa;
                 this.meserocobrar = this.Ordenes[idorden].mesero;
                 this.clientecobrar = this.Ordenes[idorden].cliente;
                 this.totalcobrar = this.Ordenes[idorden].total;

                 axios.get('http://localhost:3000/api/DetalleOrdens?filter=%7B%22where%22%3A%7B%22idOrden%22%3A%22' + this.Ordenes[idorden].idOrden + '%22%7D%7D')
                     .then(function(response) {

                         vueApp.detalleordencobrar = response.data;


                     })
             } else {
                 alert("La orden ya fue COBRADA")
             }



         },
         calcularefectivo: function() {
             if (this.efectivo == null || this.efectivo == "") {
                 return this.calcularcambio = 0;
             } else if (this.efectivo >= 0) {
                 return this.calcularcambio = this.efectivo - this.totalcobrar;
             } else {
                 return alert("el efectivo no puede ser negativo");
             }
         },
         cobrar: function(idorden) {
             //http: //localhost:3000/api/Ordens/update?where=%7B%22idOrden%22%3A1%7D

             console.log(idorden);
             axios.post('http://localhost:3000/api/Ordens/update?where=%7B%22idOrden%22%3A' + this.Ordenes[idorden].idOrden + '%7D', this.estado)
                 .then(function(response) {
                     vueApp.cargarDatos();
                 })
                 .catch(function(error) {
                     vueApp.mostrarAlerta('Error', "aqui");


                 });
             vueApp.mostrarAlerta("Orden cobrada", "\n" + "Total: " + this.totalcobrar + " \n" + "efectivo: " + this.efectivo + " \n" + "cambio: " + this.calcularcambio);
             this.efectivo = 0;
             this.calcularcambio = 0;


         },

         agregar: function(idorden) {
             $('#AgregarProducto').modal('show');
             this.detalleordencobrar = [];

         },

         nuevaorden1: function() {
             $('#modaliniciarorden').modal('show');

         },
         traer: function(idorden) {
             axios.get('http://localhost:3000/api/DetalleOrdens?filter=%7B%22where%22%3A%7B%22idOrden%22%3A%22' + this.Ordenes[idorden].idOrden + '%22%7D%7D')
                 .then(function(response) {

                     vueApp.detalletraer = response.data;


                 })
                 .catch(function(error) {
                     // handle error
                     vueApp.mostrarAlerta("Error", error);
                     console.log(error);
                 });

         },
         agregarproductos: function(idorden) {
             //  for (var i = 0; i < this.cantidadxtabla.length; i++) {

             //      this.Ordenes[idorden].total = this.Ordenes.total + (this.cantidadxtabla[i].cantidad * this.productosxdetalle[i].precio);

             //  }

             for (var i = 0; i < this.productosxdetalle.length; i++) {
                 for (var j = 0; j < this.detalletraer.length; j++) {
                     if (this.detalletraer[j].idProducto === this.productosxdetalle[i].idProducto) {
                         nuevaCantidad = {
                             "cantidad": parseInt(this.cantidadxtabla[i].cantidad) + parseInt(this.detalletraer[j].cantidad)
                         }
                         axios.post('http://localhost:3000/api/DetalleOrdens/update?where=%7B%22and%22%3A%5B%7B%22idOrden%22%3A%22' + this.Ordenes[idorden].idOrden + '%22%7D%20%2C%20%7B%22idProducto%22%3A%22' + this.productosxdetalle[i].idProducto + '%22%7D%5D%7D', nuevaCantidad)
                             .then(function(res) {
                                 nuevaCantidad = {

                                     "cantidad": "",

                                 }
                             })
                             .catch(function(error) {
                                 // handle error
                                 vueApp.mostrarAlerta("Error", error);
                                 console.log(error);
                             });
                     } else {
                         detalle = {
                             "idOrden": this.Ordenes[idorden].idOrden,
                             "idProducto": this.productosxdetalle[i].idProducto,
                             "cantidad": this.cantidadxtabla[i].cantidad,
                             "precioUnitario": this.productosxdetalle[i].precio
                         }
                         axios.post('http://localhost:3000/api/DetalleOrdens', detalle)
                             .then(function(res) {
                                 detalle = {
                                     "idOrden": "",
                                     "idProducto": "",
                                     "cantidad": "",
                                     "precioUnitario": ""
                                 }
                             })
                             .catch(function(error) {
                                 // handle error
                                 vueApp.mostrarAlerta("Error", error);
                                 console.log(error);
                             });
                     }
                 }
             }
             this.productosxdetalle = [];
             this.cantidadxtabla = [];


         },
         //Agrega el nuevo producto enviandolo a la base de datos
         agregarnuevaorden: function() {

             for (var i = 0; i < this.cantidadxtabla.length; i++) {

                 this.nuevaorden.total = this.nuevaorden.total + (this.cantidadxtabla[i].cantidad * this.productosxdetalle[i].precio);

             }

             axios.post('http://localhost:3000/api/Ordens', this.nuevaorden)
                 .then(function(response) {
                     vueApp.mostrarAlerta("Orden Agregada", "Se agregó la orden con exito ");
                     vueApp.cargarDatos();
                     vueApp.nuevaorden.cliente = "";
                     vueApp.nuevaorden.mesa = "";
                     vueApp.nuevaorden.mesero = "";
                     vueApp.nuevaorden.observacion = "";
                     vueApp.nuevaorden.total = 0;
                 })

             .catch(function(error) {
                 vueApp.mostrarAlerta('Error', "aqui");


             });

             //recorre la matriz donde se guardan todos los productos que se hicieron en la orden para agregarlos a detalleOrden
             for (var i = 0; i < this.productosxdetalle.length; i++) {
                 detalle = {
                     "idOrden": (this.Ordenes[this.Ordenes.length - 1].idOrden) + 1,
                     "idProducto": this.productosxdetalle[i].idProducto,
                     "cantidad": this.cantidadxtabla[i].cantidad,
                     "precioUnitario": this.productosxdetalle[i].precio
                 }
                 axios.post('http://localhost:3000/api/DetalleOrdens', detalle)
                     .then(function(res) {
                         detalle = {
                             "idOrden": "",
                             "idProducto": "",
                             "cantidad": "",
                             "precioUnitario": ""
                         }
                     })
                     .catch(function(error) {
                         // handle error
                         vueApp.mostrarAlerta("Error", error);
                         console.log(error);
                     });
             }
             this.productosxdetalle = [];
             this.cantidadxtabla = [];


         },

         eliminarOrden: function() {
             console.log();
             if (this.Ordenes[this.ordenSelected].estado === "A") {
                 axios.delete('http://localhost:3000/api/Ordens/' + this.Ordenes[this.ordenSelected].idOrden)
                     .then(function(res) {
                         console.log("DELETE ORDEN");
                         vueApp.cargarDatos();
                         vueApp.mostrarAlerta("Orden eliminada", "La orden  se eliminó de la base de datos con exito");

                     })

                 .catch(function(error) {
                     // handle error
                     vueApp.mostrarAlerta("Error:", error);

                     console.log(error);
                 });
             } else {
                 alert("solo se pueden eliminar ordenes inactivas");
             }
         },


         capturardatos: function(idprod) {
             //se captura el id de la tabla en la vista que corresponde al productos que se va agregar a la orden 
             //y luego se busca en el objeto productos el id que coincida
             this.productosdetalle.idProducto = this.productos[idprod].idProducto;
             //el producto que coincida se agrega  a el objeto que servira para agregar detalleorden
             this.productosxdetalle.unshift(this.productos[idprod]);
             //agregra a otro objeto la cantidad que se selecciono del producto a agregar a la orden 
             this.cantidadxtabla.unshift({ cantidad: this.cantidadtabla });
             //se reinica la variable cantidad
             this.cantidadtabla = 1;
         },

         //busca el nombre del producto para agregarlo a la tabla resumen de la orden 
         nombreCategoria: function(idCat) {
             return this.categorias.find(function(cat) {
                 return cat.idCategoria == idCat
             }).nombreCategoria;
         },
         //busca el nombre del producto por medio de un id
         nombreProducto: function(idProd) {
             return this.productos.find(function(prod) {
                 return prod.idProducto == idProd
             }).nombreProducto;
         },



     },

     mounted: function() {
         this.cargarDatos();
         this.fechahoy();
         //this.capturardatos();



     },
 });