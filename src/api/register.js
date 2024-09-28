import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://170.239.85.88:5000',
  withCredentials: true
});

const registerUser = async (userData) => {
  try {
    const response = await instance.post('/register', {
      rut: userData.rut,
      nombre: userData.nombre,
      apellido: userData.apellido,
      correo: userData.correo,
      contrasena: userData.contrasena,
      telefono: userData.telefono
    });

    console.log('Usuario registrado exitosamente:', response.data);
  } catch (error) {
    console.error('Error al registrar el usuario:', error.response?.data?.msg || error.message);
  }
};


