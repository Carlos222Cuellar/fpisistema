new Vue({
    el: '#app',

    data: {
        productos: [],
        categorias: [],
        // Input nombre categoria
        nombre: null,
        precio: null,
        esPreparado: null,
        catego: null,
        // Input id categoria
        id: null,
        categoriaSelected: 1,
        productoSelected: 0,
        ultimo_id: null,
        idcategoria: [],
        // Ver o no ver el formulario de actualizar
        formActualizar: false,
        // Input id dentro del formulario de actualizar
        idactualizar: -1,
        // Input nombre dentro del formulario de actualizar
        nombreactualizar: null,
        precioactualizar: null,

        productoseleccionado: 0,
    },

    mounted() {
        this.cargarProductos();
        this.cargarCategorias();

    },

    methods: {
        cargarProductos: function() {
            axios
                .get('http://localhost:3000/api/Productos')
                .then((respuesta) => {
                    this.productos = respuesta.data;
                })


        },
        cargarCategorias: function() {
            axios
                .get('http://localhost:3000/api/Categoria')
                .then((respuesta) => {
                    this.categorias = respuesta.data;
                })


        },
        nombreCategoria: function(idCat) {
            return this.categorias.find(function(cat) {
                return cat.idCategoria == idCat
            }).nombreCategoria;
        },

        crearProducto() {
            if (this.nombre == null) {
                alert("Fallo agregar categoria faltan datos");
            } else {
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/Productos',
                    data: {

                        nombreProducto: this.nombre,
                        precio: this.precio,
                        esPreparado: this.esPreparado,
                        idCategoria: this.catego
                    }
                });
                //this.id = null;
                this.nombre = null;
                this.precio = null;
                this.esPreparado = null;
                this.catego = null;


            }

        },

        verFormActualizar: function(producto_id) {
            // Antes de mostrar el formulario de actualizar, rellenamos sus campos
            this.idactualizar = producto_id;
            this.nombreactualizar = this.productos[producto_id].nombreProducto;
            this.precioactualizar = this.productos[producto_id].precio;
            // Mostramos el formulario
            this.formActualizar = true;
        },

        guardarActualizacion: function(producto_id) {
            if (this.nombreactualizar == "" || this.precioactualizar == "") {
                alert("NO guardado faltan campos requeridos");
            } else {
                // Ocultamos nuestro formulario de actualizar
                this.formActualizar = false;
                // Actualizamos los datos en la base de datos
                axios({
                    method: 'put',
                    url: ('http://localhost:3000/api/Productos/' + producto_id),
                    data: {
                        idCategoria: categoria_id,
                        nombreCategoria: this.nombreactualizar,
                        precio: this.precioactualizar
                    }
                });


                //actualizando los datos en la pagina

                alert("guardado con exito");

            }

        },

        borrarProducto: function() {
            // Borramos de la lista
            // var categoria_id = this.categoriaseleccionada;

            axios({
                method: 'delete',
                url: ('http://localhost:3000/api/Productos/' + this.productoseleccionado)
            });
            //alert("Se borro con exito la categoria");
        }

    },

})