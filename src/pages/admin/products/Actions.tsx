
"use client";

import { useState } from "react";
import { Image, ImageOff, Loader2, MoreHorizontal, SlidersHorizontal, Star, StarOff, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  updateProduct,
  deleteProduct,
} from "@/api/products";

import ConfirmationModal from "@/components/shared/modals/ActionsModal";

interface ProductActionsProps {
  productId: string;
  isFeatured?: boolean;
  isHero?: boolean;
  isCustomizable?: boolean;
}

type ProductAction = "featured" | "hero" | "customizable";

const ProductActions = ({
  productId,
  isFeatured = false,
  isHero = false,
  isCustomizable = false,
}: ProductActionsProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  const [customizableOpen, setCustomizableOpen] = useState(false);

  const queryClient = useQueryClient();

  // Refresh product queries after successful changes
  const invalidateProducts = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["products"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      }),
    ]);
  };

  // Delete product
  const {
    mutate: deleteProd,
    isPending: isDeleting,
  } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),

    onSuccess: async () => {
      await invalidateProducts();

      toast.success("Product deleted successfully");
      setDeleteOpen(false);
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete product");
    },
  });

  // Toggle Featured, Hero, or Customizable status
  const {
    mutate: saveProduct,
    isPending: isSaving,
  } = useMutation({
    mutationFn: async (action: ProductAction) => {
      let payload: {
        isFeatured: boolean;
        isHero: boolean;
        isCustomizable: boolean;
      };

      switch (action) {
        case "featured":
          payload = {
            isFeatured: !isFeatured,
            isHero,
            isCustomizable,
          };
          break;

        case "hero":
          payload = {
            isFeatured,
            isHero: !isHero,
            isCustomizable,
          };
          break;

        case "customizable":
          payload = {
            isFeatured,
            isHero,
            isCustomizable: !isCustomizable,
          };
          break;
      }

      return updateProduct(productId, payload);
    },

    onSuccess: async (_, action) => {
      await invalidateProducts();

      switch (action) {
        case "featured":
          toast.success(
            isFeatured
              ? "Product removed from Featured successfully"
              : "Product added to Featured successfully"
          );
          setFeaturedOpen(false);
          break;

        case "hero":
          toast.success(
            isHero
              ? "Product removed from Hero successfully"
              : "Product added to Hero successfully"
          );
          setHeroOpen(false);
          break;

        case "customizable":
          toast.success(
            isCustomizable
              ? "Product is no longer customizable"
              : "Product marked as customizable successfully"
          );
          setCustomizableOpen(false);
          break;
      }
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const isPending = isDeleting || isSaving;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={isPending}
            onClick={(e) => e.stopPropagation()}
            className="rounded-full p-2 hover:bg-[#F5F5F5] disabled:opacity-50"
            aria-label="Product actions"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
  align="end"
  onClick={(e) => e.stopPropagation()}
  className="w-56 rounded-xl p-2"
>
  {/* Delete */}
  <DropdownMenuItem
    className="mb-1 cursor-pointer rounded-lg text-red-600 focus:bg-red-50 focus:text-red-700"
    onSelect={() => setDeleteOpen(true)}
  >
    <Trash2 className="mr-2 h-4 w-4" />
    Delete item
  </DropdownMenuItem>

  <DropdownMenuSeparator />

  {/* Featured */}
  <DropdownMenuItem
    className="cursor-pointer rounded-lg"
    onSelect={() => setFeaturedOpen(true)}
  >
    {isFeatured ? (
      <StarOff className="mr-2 h-4 w-4 text-amber-600" />
    ) : (
      <Star className="mr-2 h-4 w-4 text-amber-600" />
    )}

    <span className="flex-1">
      {isFeatured ? "Unfeature item" : "Feature item"}
    </span>

    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isFeatured
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {isFeatured ? "ON" : "OFF"}
    </span>
  </DropdownMenuItem>

  {/* Hero */}
  <DropdownMenuItem
    className="cursor-pointer rounded-lg"
    onSelect={() => setHeroOpen(true)}
  >
    {isHero ? (
      <ImageOff className="mr-2 h-4 w-4 text-purple-600" />
    ) : (
      <Image className="mr-2 h-4 w-4 text-purple-600" />
    )}

    <span className="flex-1">
      {isHero ? "Remove from Hero" : "Set as Hero"}
    </span>

    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isHero
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {isHero ? "ON" : "OFF"}
    </span>
  </DropdownMenuItem>

  {/* Customizable */}
  <DropdownMenuItem
    className="cursor-pointer rounded-lg"
    onSelect={() => setCustomizableOpen(true)}
  >
    <SlidersHorizontal className="mr-2 h-4 w-4 text-blue-600" />

    <span className="flex-1">
      {isCustomizable
        ? "Disable customization"
        : "Enable customization"}
    </span>

    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isCustomizable
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {isCustomizable ? "ON" : "OFF"}
    </span>
  </DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>

      {/* Delete confirmation */}
      <ConfirmationModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Product?"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Yes, Delete"
        confirmButtonClassName="bg-[#DE0D0D]"
        onConfirm={() => deleteProd(productId)}
      />

      {/* Featured confirmation */}
      <ConfirmationModal
        open={featuredOpen}
        onOpenChange={setFeaturedOpen}
        title={
          isFeatured
            ? "Remove from Featured?"
            : "Set as Featured?"
        }
        description={
          isFeatured
            ? "Are you sure you want to remove this product from Featured?"
            : "Are you sure you want to mark this product as Featured?"
        }
        confirmText={
          isFeatured ? "Yes, Remove" : "Yes, Feature"
        }
        confirmButtonClassName="bg-green-600"
        onConfirm={() => saveProduct("featured")}
      />

      {/* Hero confirmation */}
      <ConfirmationModal
        open={heroOpen}
        onOpenChange={setHeroOpen}
        title={
          isHero
            ? "Remove from Hero?"
            : "Set as Hero?"
        }
        description={
          isHero
            ? "Are you sure you want to remove this product from Hero?"
            : "Are you sure you want to mark this product as Hero?"
        }
        confirmText={
          isHero ? "Yes, Remove" : "Yes, Set as Hero"
        }
        confirmButtonClassName="bg-green-600"
        onConfirm={() => saveProduct("hero")}
      />

      {/* Customizable confirmation */}
      <ConfirmationModal
        open={customizableOpen}
        onOpenChange={setCustomizableOpen}
        title={
          isCustomizable
            ? "Remove Customizable Status?"
            : "Set as Customizable?"
        }
        description={
          isCustomizable
            ? "Are you sure you want to make this product no longer customizable?"
            : "Are you sure you want to allow customers to customize this product?"
        }
        confirmText={
          isCustomizable
            ? "Yes, Remove"
            : "Yes, Customize"
        }
        confirmButtonClassName="bg-green-600"
        onConfirm={() => saveProduct("customizable")}
      />
    </>
  );
};

export default ProductActions;
