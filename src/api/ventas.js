import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://170.239.85.88:5000',  
  withCredentials: true
});


const getVentas = async () => {
  try {
    const token = localStorage.getItem('token');  

    const response = await instance.get('/ventas', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const ventas = response.data;
    console.log('Ventas obtenidas:', ventas);

    return ventas;  
  } catch (error) {
    console.error('Error al obtener ventas:', error.response?.data?.msg || error.message);
  }
};

// Ejemplo de uso
getVentas();
