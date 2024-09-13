import React from "react";

interface Product {
    id: number;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

interface Props {
    products: Product[];
    total: number;
}

const ProductSummary: React.FC<Props> = ({ products, total }) => {
    return (
        <div className="max-w-md mx-auto p-4">
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
                    <h4>Total: ${total}</h4>
                </div>
            </div>
        </div>
    );
};

export default ProductSummary;
