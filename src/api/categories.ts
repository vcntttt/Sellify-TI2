import axios from "@/api/axios";
import { CategoryResponse } from "@/types/products";
import { ShowNotification } from "@/components/NotificationProvider";
import { format } from "date-fns";

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get("/categories").then((res) => res.data);

    const loadTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Categorías cargadas con éxito.", "info", `${loadTime}`);

    return response.map(
      (category: CategoryResponse) => category.nombre_categoria
    );
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    const errorMessage = "Error al cargar las categorías.";
    ShowNotification(errorMessage, "error", errorTime); 
    throw error; 
  }
};

export const addCategory = async (category: string) => {
  try {
    const existingCategories = await getCategories();

    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");

    if (existingCategories.includes(category)) {
      ShowNotification("La categoría ya existe.","warning", errorTime);
      return; 
    }

    const { data } = await axios.post<CategoryResponse>("/categories", {
      nombre_categoria: category,
    });

    const addTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    ShowNotification("Categoría agregada con éxito.", "success", addTime);

    return data;
  } catch (error) {
    const errorTime = format(new Date(), "dd/MM/yyyy HH:mm:ss");
    const errorMessage = "Error al agregar la categoría.";
    ShowNotification(errorMessage, "error", errorTime); 
    throw error; 
  }
};
