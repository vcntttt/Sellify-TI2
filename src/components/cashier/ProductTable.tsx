import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { productColumns, Product } from "@/components/cashier/ProductColumns";
import { formatPrice } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const table = useReactTable({
    data: products,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative max-h-[400px] overflow-y-auto shadow-md rounded-lg border border-gray-200">
      <Table className="min-w-full bg-white border-collapse">
        {/* Header */}
        <TableHeader className="sticky top-0 bg-gray-300 border-b border-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  className="py-3 px-4 font-semibold text-gray-700 text-center"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Body */}
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              className={`hover:bg-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              {row.getVisibleCells().map((cell) => {
                const discount = row.original.discountedPrice ?? 0;
                return (
                  <TableCell key={cell.id} className="py-2 px-4 text-center">
                    {cell.column.id === "price" ? (
                      <div className="flex items-center justify-center">
                        {discount < row.original.originalPrice ? (
                          <>
                            <span className="line-through text-gray-500 mr-2">
                              {new Intl.NumberFormat("es-CL", {
                                style: "currency",
                                currency: "CLP",
                              }).format(row.original.originalPrice)}
                            </span>
                            <span className="text-red-500 mr-2">
                              {new Intl.NumberFormat("es-CL", {
                                style: "currency",
                                currency: "CLP",
                              }).format(discount)}
                            </span>
                            <span className="text-gray-500">
                              (-{Math.round(((row.original.originalPrice - discount) / row.original.originalPrice) * 100)}%)
                            </span>
                          </>
                        ) : (
                          <span>
                            {formatPrice(row.original.originalPrice)}
                          </span>
                        )}
                      </div>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
