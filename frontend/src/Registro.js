import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registro() {
    const [formData, setFormData] = useState({
        dni: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: new Date(),
        distrito: "",
        departamento: "",
        fechaAfiliacion: new Date(),
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date, name) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Realiza una solicitud POST al backend para crear el registro
            const response = await axios.post("http://localhost:8081/registro", formData);
            console.log("Registro exitoso", response.data);
            // Puedes redirigir al usuario a una página de confirmación o realizar otras acciones aquí
        } catch (error) {
            console.error("Error en el registro", error);
            // Puedes mostrar un mensaje de error al usuario o tomar otras acciones
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="dni"><strong>DNI:</strong></label>
                        <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombre"><strong>Nombre</strong></label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="apellido"><strong>Apellido:</strong></label>
                        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="distrito"><strong>Distrito:</strong></label>
                        <input type="text" id="distrito" name="distrito" value={formData.distrito} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="departamento"><strong>Departamento:</strong></label>
                        <input type="text" id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} className='form-control rounded-0' />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="fechaNacimiento"><strong>Fecha de Nacimiento:</strong></label>
                        <DatePicker
                            id="fechaNacimiento"
                            selected={formData.fechaNacimiento}
                            onChange={(date) => handleDateChange(date, "fechaNacimiento")}
                            className='form-control rounded-0' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaAfiliacion"><strong>Fecha de Afiliación:</strong></label>
                        <DatePicker
                            id="fechaAfiliacion"
                            selected={formData.fechaAfiliacion}
                            onChange={(date) => handleDateChange(date, "fechaAfiliacion")}
                            className='form-control rounded-0' />
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </div>

        </div>
    );
}