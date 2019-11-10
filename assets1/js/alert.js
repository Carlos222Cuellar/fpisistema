//alert
    $('#idBoton1').click(function () {
        $('#idAlert').show('fade');

        setTimeout(function () {
            $('#idAlert').hide('fade');
        }, 5000);

    });

    $('#lidBoton2').click(function () {
        $('#idAlert').hide('fade');
    });
