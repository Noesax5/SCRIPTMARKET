import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Inicio() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8081/productos")
            .then((response) => {
                setProductos(response.data);
            })
            .catch((error) => {
                console.error("Error al obtener los productos:", error);
            });
    }, []);

    const toggleCarrito = () => {
        setCarritoAbierto(!carritoAbierto);
    };

    const agregarAlCarrito = (producto) => {
        const productoEnCarrito = carrito.find((item) => item.codigo === producto.codigo);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
            setCarrito([...carrito]);
        } else {
            setCarrito([...carrito, { ...producto, cantidad }]);
        }
        setCantidad(1);
    };

    const mostrarDescripcionProducto = (producto) => {
        setProductoSeleccionado(producto);
    };

    const cerrarDescripcionProducto = () => {
        setProductoSeleccionado(null);
    };

    const eliminarDelCarrito = (producto) => {
        const nuevoCarrito = carrito.filter((item) => item.codigo !== producto.codigo);
        setCarrito(nuevoCarrito);
    };

    return (
        <div className="container" style={{ paddingTop: "20px" }}>
            <h1 className="text-center">SCRIPT MARKET</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Productos:</h2>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Cantidad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.codigo}>
                                    <td>{producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.stock}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={cantidad}
                                            min="1"
                                            max={producto.stock}
                                            onChange={(e) => setCantidad(parseInt(e.target.value))}
                                            style={{ width: "50px" }}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => agregarAlCarrito(producto)}>Agregar</button>
                                        <button className="btn btn-info" onClick={() => mostrarDescripcionProducto(producto)}>Información</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <div className="carrito-dropdown">
                        <button className="btn btn-success" onClick={toggleCarrito} style={{ width: "100%" }}>Desplegar Carrito</button>
                        {carritoAbierto && (
                            <div className="carrito-contenido">
                                <h3>Carrito de Compras</h3>
                                {carrito.map((producto) => (
                                    <div key={producto.codigo} className="carrito-item">
                                        <div className="carrito-info">
                                            <p>{producto.nombre}</p>
                                            <p>Precio: ${producto.precio}</p>
                                            <p>Cantidad: {producto.cantidad}</p>
                                        </div>
                                        <button className="btn btn-danger" onClick={() => eliminarDelCarrito(producto)}>Eliminar</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {productoSeleccionado && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Descripción del Producto</h5>
                                <button type="button" className="close" onClick={cerrarDescripcionProducto}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Nombre: {productoSeleccionado.nombre}</p>
                                <p>Precio: ${productoSeleccionado.precio}</p>
                                <p>Stock: {productoSeleccionado.stock}</p>
                                <p>Descripción: {productoSeleccionado.descripcion}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cerrarDescripcionProducto}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
