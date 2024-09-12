import React from "react";

interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

interface ProductSummaryProps {
    products: Product[];
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ products }) => {
    return (
        <div className="max-w-md mx-auto p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen de Productos</h2>
            <div className="max-h-96 overflow-y-auto">
                <div className="space-y-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className={`flex justify-between py-2 px-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} border-b border-gray-200`}
                        >
                            <div className="flex-1 text-gray-600">
                                <div className="font-semibold">Código: {product.id}</div>
                                <div>Nombre: {product.name}</div>
                                <div>Cantidad: {product.quantity}</div>
                            </div>
                            <div className="flex-shrink-0 text-right text-gray-600">
                                <div className="font-semibold">Precio Unitario:</div>
                                <div>${product.price.toFixed(2)}</div>
                                <div className="font-semibold">Precio Total:</div>
                                <div>${product.totalPrice.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSummary;
