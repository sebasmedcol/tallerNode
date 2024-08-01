const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const ventas = [
    { id: 1, numeroFactura: 'FAC001', numeroUnidades: 10, nombreCliente: 'Juana de Arco', valorTotal: 500 },
    { id: 2, numeroFactura: 'FAC002', numeroUnidades: 5, nombreCliente: 'Policarpa Salavarrieta', valorTotal: 250 },
    { id: 3, numeroFactura: 'FAC003', numeroUnidades: 20, nombreCliente: 'Tutankamon', valorTotal: 1000 },
    { id: 4, numeroFactura: 'FAC004', numeroUnidades: 7, nombreCliente: 'Sócrates', valorTotal: 350 },
    { id: 5, numeroFactura: 'FAC005', numeroUnidades: 12, nombreCliente: 'Simón Bolivar', valorTotal: 600 }
];

// Método GET para calcular y retornar la suma total de número de unidades facturadas
app.get('/total-unidades', (req, res) => {
    const totalUnidades = ventas.reduce((sum, venta) => sum + venta.numeroUnidades, 0);
    res.json({ totalUnidades });
});

// Método GET para calcular y retornar el valor total facturado
app.get('/valor-total', (req, res) => {
    const valorTotal = ventas.reduce((sum, venta) => sum + venta.valorTotal, 0);
    res.json({ valorTotal });
});

// Método GET para retornar los datos de una factura de venta de acuerdo al id a consultar
app.get('/factura/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const factura = ventas.find(venta => venta.id === id);
    if (factura) {
        res.json(factura);
    } else {
        res.status(404).json({ error: 'Factura no encontrada' });
    }
});

// Método GET para retornar el id de la factura con el nombre del cliente de todas las facturas
app.get('/facturas-clientes', (req, res) => {
    const facturasClientes = ventas.map(venta => ({ id: venta.id, nombreCliente: venta.nombreCliente }));
    res.json(facturasClientes);
});

// Método POST para insertar facturas en el array
app.post('/agregar-factura', (req, res) => {
    const nuevaFactura = req.body;
    ventas.push(nuevaFactura);
    res.status(201).json({ message: 'Factura agregada', nuevaFactura });
});

// Método PUT para realizar un decremento al valor total de todas las facturas
app.put('/descuento', (req, res) => {
    const porcentaje = parseFloat(req.body.porcentaje);
    if (porcentaje >= 1 && porcentaje <= 10) {
        ventas.forEach(venta => {
            venta.valorTotal -= venta.valorTotal * (porcentaje / 100);
        });
        res.json({ message: `Descuento del ${porcentaje}% aplicado a todas las facturas`, ventas });
    } else {
        res.status(400).json({ error: 'El porcentaje debe estar entre 1 y 10' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
