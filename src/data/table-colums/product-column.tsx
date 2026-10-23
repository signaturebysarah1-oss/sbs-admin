
import { Badge } from "@/components/shared/Badge";
import ImagePreview from "@/components/shared/ImagePreview";
import ProductActions from "@/pages/admin/products/Actions";
import { truncateText } from "@/lib/utils/truncateText";
import type { Product } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const ProductColumn: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.images?.[0];

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <ImagePreview src={image?.imageUrl ?? ''} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="max-w-[180px]">
        <p className="truncate font-medium">
          {truncateText(row.original.name ?? "", 20)}
        </p>
        <p className="text-xs text-muted-foreground">
          {row.original.category ?? "Uncategorized"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "isCustomizable",
    header: "Customizable",
    cell: ({ row }) => {
      const isCustomizable = row.original.isCustomizable;

      return (
        <Badge
          variant="default"
          className={
            isCustomizable
              ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          }
        >
          {isCustomizable ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => {
      const isFeatured = row.original.isFeatured;

      return (
        <Badge
          variant="default"
          className={
            isFeatured
              ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          }
        >
          {isFeatured ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isHero",
    header: "Hero",
    cell: ({ row }) => {
      const isHero = row.original.isHero;

      return (
        <Badge
          variant="default"
          className={
            isHero
              ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          }
        >
          {isHero ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <ProductActions
          productId={row.original.id ?? ""}
          isFeatured={row.original.isFeatured}
          isCustomizable={row.original.isCustomizable}
          isHero={row.original.isHero}
        />
      </div>
    ),
  },
];
