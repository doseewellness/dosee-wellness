export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled";

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          original_price: number | null;
          image_url: string;
          category: string;
          rating: number;
          review_count: number;
          badge: string | null;
          in_stock: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          original_price?: number | null;
          image_url: string;
          category: string;
          rating?: number;
          review_count?: number;
          badge?: string | null;
          in_stock?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          original_price?: number | null;
          image_url?: string;
          category?: string;
          rating?: number;
          review_count?: number;
          badge?: string | null;
          in_stock?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          label: string;
          icon: string;
          sort_order: number;
        };
        Insert: {
          id: string;
          label: string;
          icon: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          label?: string;
          icon?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          stripe_session_id: string;
          stripe_payment_intent_id: string | null;
          customer_email: string;
          status: OrderStatus;
          total_amount: number;
          shipping_amount: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          stripe_session_id: string;
          stripe_payment_intent_id?: string | null;
          customer_email: string;
          status?: OrderStatus;
          total_amount: number;
          shipping_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          stripe_session_id?: string;
          stripe_payment_intent_id?: string | null;
          customer_email?: string;
          status?: OrderStatus;
          total_amount?: number;
          shipping_amount?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image_url: string;
          price: number;
          quantity: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image_url?: string;
          price: number;
          quantity: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_image_url?: string;
          price?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
    };
  };
}

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
