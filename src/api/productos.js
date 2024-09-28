import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://170.239.85.88:5000', 
  withCredentials: true
});


const getProductos = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await instance.get('/productos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const productos = response.data;
    console.log('Productos obtenidos:', productos);
    
    return productos;  
  } catch (error) {
    console.error('Error al obtener productos:', error.response?.data?.msg || error.message);
  }
};


getProductos();
