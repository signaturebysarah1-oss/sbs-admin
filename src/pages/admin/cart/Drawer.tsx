
import { useState } from "react";
import {
  Check,
  Mail,
  Phone,
  User,
  Package,
  CreditCard,
  Truck,
  DotIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/formatDate";
import { formatPrice, getInitials } from "@/utils/formatDate";
import type { CartOrder } from "@/types";
import ImagePreview from "@/components/shared/ImagePreview";

const SUGGESTED_STATUSES = [
  "confirmed",
  "processing",
  "shipped",
  "completed",
  "cancelled",
];

const getDisplayText = (value: unknown): string | null => {
  if (value == null) return null;

  if (typeof value === "string") {
    return value.trim() || null;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  try {
    return JSON.stringify(value, null, 2) ?? null;
  } catch {
    return null;
  }
};

const CartOrderDrawer = ({
  order,
  onClose,
  onUpdate,
  isLoading,
}: {
  order: CartOrder;
  onClose: () => void;
  onUpdate: (order: CartOrder) => void;
  isLoading: boolean;
}) => {
  const [status, setStatus] = useState(order.status);

  const handleSave = async () => {
    if (status === order.status) return;

    await onUpdate({
      ...order,
      status,
    });

    onClose();
  };

  const itemsTotal = order.items.reduce(
    (total, item) =>
      total + (item.unitPriceSnapshot ?? 0) * (item.quantity ?? 1),
    0
  );

  // Convert unknown values to safe display strings.
  const shippingDetailsText = getDisplayText(order.shippingDetails);

  // Explicitly return a boolean so unknown cannot become a JSX child.
  const hasShippingInfo = Boolean(
    order.shippingTrackingNumber ||
      order.shippingTrackingUrl ||
      shippingDetailsText
  );

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-[#E7E2DC] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5F0EB]">
            {order.customer ? (
              <span className="text-sm font-semibold text-[#8B5E3C]">
                {getInitials(order.customer.name ?? "")}
              </span>
            ) : (
              <User size={18} className="text-[#8B5E3C]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-[#1C1917]">
              {order.customerName ?? "Guest Customer"}
            </h2>

            <div className="mt-1 flex flex-wrap items-center gap-1 text-xs font-medium text-[#A8A29E]">
              {order.customerPhone && <span>{order.customerPhone}</span>}

              {order.customerPhone && order.customerEmail && <DotIcon size={14} />}

              {order.customerEmail && <span>{order.customerEmail}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 space-y-6 px-6 py-6">
        {/* Order Details */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Order Details
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[#E7E2DC] bg-[#FAFAF8] p-3">
              <p className="text-xs text-[#A8A29E]">Order Number</p>
              <p className="mt-1 break-words text-sm font-medium text-[#1C1917]">
                {order.orderNumber ?? "-"}
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E2DC] bg-[#FAFAF8] p-3">
              <p className="text-xs text-[#A8A29E]">Status</p>
              <p className="mt-1 text-sm font-medium capitalize text-[#1C1917]">
                {order.status}
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E2DC] bg-[#FAFAF8] p-3">
              <p className="text-xs text-[#A8A29E]">Created</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E2DC] bg-[#FAFAF8] p-3">
              <p className="text-xs text-[#A8A29E]">Items</p>
              <p className="mt-1 text-sm font-medium text-[#1C1917]">
                {order.items.length}
              </p>
            </div>
          </div>
        </section>

        {/* Customer */}
        {order.customer && (
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Customer
            </p>

            <div className="space-y-3 rounded-2xl border border-[#E7E2DC] bg-[#FAFAF8] p-4">
              <div className="flex items-start gap-3">
                <User size={15} className="mt-0.5 shrink-0 text-[#8B5E3C]" />

                <div className="min-w-0">
                  <p className="text-xs text-[#A8A29E]">Name</p>
                  <p className="break-words text-sm font-medium text-[#1C1917]">
                    {order.customer.name ?? "-"}
                  </p>
                </div>
              </div>

              {order.customer.email && (
                <div className="flex items-start gap-3">
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#8B5E3C]" />

                  <div className="min-w-0">
                    <p className="text-xs text-[#A8A29E]">Email</p>
                    <p className="break-all text-sm text-[#44403C]">
                      {order.customer.email}
                    </p>
                  </div>
                </div>
              )}

              {order.customer.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#8B5E3C]" />

                  <div>
                    <p className="text-xs text-[#A8A29E]">Phone</p>
                    <p className="text-sm text-[#44403C]">
                      {order.customer.phone}
                    </p>
                  </div>
                </div>
              )}

              {order.customer.contactMethod && (
                <div className="border-t border-[#E7E2DC] pt-3">
                  <p className="text-xs text-[#A8A29E]">Preferred contact</p>
                  <p className="mt-1 text-sm font-medium capitalize text-[#44403C]">
                    {order.customer.contactMethod}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Order Items */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Order Items
          </p>

          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={item.productId ?? index}
                className="rounded-2xl border border-[#E7E2DC] bg-[#FAFAF8] p-4"
              >
                <div className="flex gap-3">
                  {item.imageUrlSnapshot ? (
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#E7E2DC]">
                      <ImagePreview src={item.imageUrlSnapshot} />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#E7E2DC] bg-[#F5F0EB]">
                      <Package size={20} className="text-[#8B5E3C]" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1C1917]">
                      {item.productNameSnapshot ?? "Product removed"}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#78716C]">
                      {item.selectedSize != null &&
                        item.selectedSize !== "" && (
                          <span>Size {item.selectedSize}</span>
                        )}

                      {item.selectedColor && <span>{item.selectedColor}</span>}

                      {item.selectedMaterial && (
                        <span>{item.selectedMaterial}</span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-[#1C1917]">
                      {formatPrice(item.unitPriceSnapshot ?? 0)}
                    </p>

                    <p className="mt-1 text-xs text-[#A8A29E]">
                      Qty: {item.quantity ?? 1}
                    </p>
                  </div>
                </div>

                {/* Custom Notes */}
                {typeof item.customNotes === "string" &&
                  item.customNotes.trim() !== "" && (
                    <div className="mt-3 border-t border-[#E7E2DC] pt-3">
                      <p className="mb-1 text-xs text-[#A8A29E]">
                        Custom Notes
                      </p>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#44403C]">
                        {item.customNotes}
                      </p>
                    </div>
                  )}

                {/* Custom Measurements */}
                {item.customMeasurements != null &&
                  Object.keys(item.customMeasurements).length > 0 && (
                    <div className="mt-3 border-t border-[#E7E2DC] pt-3">
                      <p className="mb-2 text-xs text-[#A8A29E]">
                        Measurements
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.customMeasurements).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="rounded-lg border border-[#E7E2DC] bg-white px-3 py-2"
                            >
                              <p className="text-[11px] capitalize text-[#A8A29E]">
                                {key.replace(/([A-Z])/g, " $1")}
                              </p>

                              <p className="mt-0.5 break-words text-sm font-medium text-[#1C1917]">
                                {getDisplayText(value) ?? "-"}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            ))}

            {/* Totals */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-sm text-[#78716C]">Subtotal</span>
                <span className="text-sm font-semibold text-[#1C1917]">
                  {formatPrice(itemsTotal)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#E7E2DC] px-1 pt-3">
                <span className="text-sm font-semibold text-[#1C1917]">
                  Order Total
                </span>
                <span className="text-base font-semibold text-[#1C1917]">
                  {formatPrice(order.totalSnapshot)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Payment
          </p>

          <div className="rounded-2xl border border-[#E7E2DC] bg-[#FAFAF8] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F0EB]">
                <CreditCard size={16} className="text-[#8B5E3C]" />
              </div>

              <div>
                <p className="text-xs text-[#A8A29E]">Payment Evidence</p>
                <p className="text-sm font-medium text-[#44403C]">
                  {order.receiptUrl ? "Receipt uploaded" : "No receipt uploaded"}
                </p>
              </div>
            </div>

            {order.receiptUrl && (
              <div className="mt-4 border-t border-[#E7E2DC] pt-4">
                <p className="mb-3 text-xs text-[#A8A29E]">Receipt</p>

                <a
                  href={order.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group block overflow-hidden rounded-xl border border-[#E7E2DC] bg-white"
                >
                  <img
                    src={order.receiptUrl}
                    alt="Payment receipt"
                    className="max-h-[350px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  <div className="border-t border-[#E7E2DC] px-4 py-3">
                    <p className="text-xs font-medium text-[#8B5E3C]">
                      Open / Download Receipt
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Delivery Address */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Delivery Address
          </p>

          <div className="rounded-2xl border border-[#E7E2DC] bg-[#FAFAF8] p-4">
            {order.address ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#A8A29E]">Address</p>
                  <p className="mt-1 break-words text-sm leading-relaxed text-[#1C1917]">
                    {order.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 border-t border-[#E7E2DC] pt-3">
                  <div>
                    <p className="text-xs text-[#A8A29E]">City</p>
                    <p className="mt-1 text-sm font-medium text-[#44403C]">
                      {order.city ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#A8A29E]">State</p>
                    <p className="mt-1 text-sm font-medium text-[#44403C]">
                      {order.state ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#A8A29E]">
                No delivery address provided.
              </p>
            )}
          </div>
        </section>

        {/* Shipping */}
        {hasShippingInfo && (
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Shipping
            </p>

            <div className="rounded-2xl border border-[#E7E2DC] bg-[#FAFAF8] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F0EB]">
                  <Truck size={16} className="text-[#8B5E3C]" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[#A8A29E]">Tracking Number</p>
                  <p className="break-words text-sm font-medium text-[#44403C]">
                    {order.shippingTrackingNumber ?? "Not assigned"}
                  </p>
                </div>
              </div>

              {shippingDetailsText && (
                <div className="mt-3 border-t border-[#E7E2DC] pt-3">
                  <p className="text-xs text-[#A8A29E]">Shipping Details</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-[#44403C]">
                    {shippingDetailsText}
                  </p>
                </div>
              )}

              {order.shippingTrackingUrl && (
                <div className="mt-3 border-t border-[#E7E2DC] pt-3">
                  <a
                    href={order.shippingTrackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#8B5E3C] hover:underline"
                  >
                    Track shipment
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Status History */}
        {order.statusHistory && order.statusHistory.length > 0 && (
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
              Status History
            </p>

            <div className="space-y-3">
              {[...order.statusHistory].reverse().map((history, index) => (
                <div
                  key={history.id ?? `${history.createdAt}-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F0EB]">
                    <Check size={11} className="text-[#8B5E3C]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm capitalize text-[#1C1917]">
                      {history.status}
                    </p>

                    {history.note && (
                      <p className="mt-0.5 whitespace-pre-wrap break-words text-xs text-[#78716C]">
                        {history.note}
                      </p>
                    )}

                    <p className="mt-0.5 text-xs text-[#A8A29E]">
                      {formatDate(history.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Update Status */}
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#78716C]">
            Update Status
          </p>

          <div className="grid grid-cols-2 gap-2">
            {SUGGESTED_STATUSES.map((s) => {
              const isCurrentStatus = order.status === s;
              const isSelected = status === s;

              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  disabled={isLoading}
                  className={cn(
                    "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border text-sm font-medium capitalize transition-all",
                    isSelected
                      ? "border-[#18120E] bg-[#18120E] text-white"
                      : "border-[#E7E2DC] bg-white text-[#78716C] hover:border-[#8B5E3C]/40",
                    isCurrentStatus &&
                      !isSelected &&
                      "border-[#8B5E3C]/50 ring-2 ring-[#8B5E3C]/20",
                    isLoading && "cursor-not-allowed opacity-60"
                  )}
                >
                  {isCurrentStatus && (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}

                  {s}

                  {isCurrentStatus && (
                    <span className="text-[10px] opacity-70">Current</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t border-[#E7E2DC] bg-white px-6 py-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading || status === order.status}
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#8B5E3C] text-sm font-medium text-white transition-colors hover:bg-[#7A5235] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default CartOrderDrawer;
