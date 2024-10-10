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
  TableHead,
} from "@/components/ui/table";
import { productColumns, Product } from "@/components/cajero/columns";
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
    <Table className="min-w-full bg-white border-collapse">
      {/* Header */}
      <TableHeader className="sticky top-0 bg-gray-300 border-b border-gray-300">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="bg-slate-800 text-white py-3 px-4 font-semibold text-center">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      {/* Body */}
      <TableBody>
        {table.getRowModel().rows.map((row, index) => (
          <TableRow
            key={row.id}
            className={`hover:bg-gray-200 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
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
                            (-
                            {Math.round(
                              ((row.original.originalPrice - discount) /
                                row.original.originalPrice) *
                                100
                            )}
                            %)
                          </span>
                        </>
                      ) : (
                        <span>{formatPrice(row.original.originalPrice)}</span>
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
  );
};

export default ProductTable;
