"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem, Product, ProductPrice } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, price: ProductPrice) => void;
  removeItem: (productId: string, priceId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountAmount: number;
  applyDiscount: () => Promise<{ valid: boolean; message: string }>;
  total: number;
  checkout: (email: string) => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "zappit-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = useCallback((product: Product, price: ProductPrice) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id && item.price.id === price.id
      );
      if (existing) return prev;
      return [...prev, { product, price, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, priceId: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.price.id === priceId)
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode("");
    setDiscountAmount(0);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price.price * item.quantity,
    0
  );

  const applyDiscount = useCallback(async () => {
    if (!discountCode) {
      return { valid: false, message: "Enter a discount code" };
    }

    try {
      const res = await fetch("/api/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode, subtotal }),
      });

      const data = await res.json();

      if (data.valid) {
        setDiscountAmount(data.discount);
        return { valid: true, message: data.message };
      } else {
        setDiscountAmount(0);
        return { valid: false, message: data.message };
      }
    } catch {
      return { valid: false, message: "Failed to validate code" };
    }
  }, [discountCode, subtotal]);

  const total = Math.max(0, subtotal - discountAmount);

  const checkout = useCallback(
    async (email: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items,
            customerEmail: email,
            discountCode: discountCode || undefined,
          }),
        });

        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Checkout error:", error);
      } finally {
        setLoading(false);
      }
    },
    [items, discountCode]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount: items.length,
        subtotal,
        discountCode,
        setDiscountCode,
        discountAmount,
        applyDiscount,
        total,
        checkout,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
