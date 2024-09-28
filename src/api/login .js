import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://170.239.85.88:5000',
  withCredentials: true
});

const loginUser = async (userData) => {
  try {
    const response = await instance.post('/login', {
      rut: userData.rut,
      contrasena: userData.contrasena
    });

    const { access_token } = response.data;

    localStorage.setItem('token', access_token);

    console.log('Usuario logueado exitosamente:', access_token);
  } catch (error) {
    console.error('Error en el login:', error.response?.data?.msg || error.message);
  }
};

