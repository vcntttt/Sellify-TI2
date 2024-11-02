import axios from "@/api/axios";
import { CategoryResponse } from "@/types/products";
import { showNotification } from "@/components/NotificationProvider";

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get("/categories").then((res) => res.data);

    showNotification("Categorías cargadas con éxito.");

    return response.map(
      (category: CategoryResponse) => category.nombre_categoria
    );
  } catch (error) {
    const errorMessage = "Error al cargar las categorías.";
    showNotification(errorMessage); 
    throw error; 
  }
};

export const addCategory = async (category: string) => {
  try {
 
    const existingCategories = await getCategories();

    if (existingCategories.includes(category)) {
      showNotification("La categoría ya existe.");
      return; 
    }

    const { data } = await axios.post<CategoryResponse>("/categories", {
      nombre_categoria: category,
    });

   
    showNotification("Categoría agregada con éxito.");

    return data;
  } catch (error) {
    const errorMessage = "Error al agregar la categoría.";
    showNotification(errorMessage); 
    throw error; 
  }
};
