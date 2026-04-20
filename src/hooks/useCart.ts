"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";

/**
 * SSRとLocalStorageのハイドレーションミスマッチを防ぐため、
 * クライアントマウント後にのみストアの値を返す。
 */
export function useCart() {
  const [mounted, setMounted] = useState(false);
  const store = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    ...store,
    items: mounted ? store.items : [],
    totalItems: mounted ? store.totalItems() : 0,
    totalPrice: mounted ? store.totalPrice() : 0,
  };
}
