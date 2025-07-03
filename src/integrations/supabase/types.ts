export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_profiles: {
        Row: {
          agent_name: string
          company_name: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          languages_spoken: string[] | null
          license_number: string | null
          location: string | null
          phone: string | null
          profile_image_url: string | null
          rating: number | null
          services_offered: string[] | null
          social_media: Json | null
          specialization: string[] | null
          total_clients: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string
          website_url: string | null
          whatsapp: string | null
          years_experience: number | null
        }
        Insert: {
          agent_name: string
          company_name?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          languages_spoken?: string[] | null
          license_number?: string | null
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          services_offered?: string[] | null
          social_media?: Json | null
          specialization?: string[] | null
          total_clients?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
          website_url?: string | null
          whatsapp?: string | null
          years_experience?: number | null
        }
        Update: {
          agent_name?: string
          company_name?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          languages_spoken?: string[] | null
          license_number?: string | null
          location?: string | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          services_offered?: string[] | null
          social_media?: Json | null
          specialization?: string[] | null
          total_clients?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
          website_url?: string | null
          whatsapp?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      agent_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          payment_reference: string | null
          plan_id: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_reference?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_reference?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          agent_id: string | null
          booking_date: string | null
          created_at: string | null
          id: string
          package_id: string | null
          payment_status: string | null
          pilgrim_id: string | null
          status: string | null
          total_amount: number | null
          travel_date: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          booking_date?: string | null
          created_at?: string | null
          id?: string
          package_id?: string | null
          payment_status?: string | null
          pilgrim_id?: string | null
          status?: string | null
          total_amount?: number | null
          travel_date?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          booking_date?: string | null
          created_at?: string | null
          id?: string
          package_id?: string | null
          payment_status?: string | null
          pilgrim_id?: string | null
          status?: string | null
          total_amount?: number | null
          travel_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          message_type: string | null
          room_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          message_type?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string | null
          room_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          country: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          room_type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          room_type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          room_type?: string | null
        }
        Relationships: []
      }
      community_posts: {
        Row: {
          category: string
          comments_count: number | null
          content: string
          created_at: string
          id: string
          is_active: boolean
          likes_count: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          likes_count?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          likes_count?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_content: {
        Row: {
          arabic_text: string
          content_type: string
          created_at: string | null
          english_translation: string | null
          id: string
          is_featured: boolean | null
          post_date: string | null
          posted_by: string | null
          reference: string | null
          title: string | null
          urdu_translation: string | null
        }
        Insert: {
          arabic_text: string
          content_type: string
          created_at?: string | null
          english_translation?: string | null
          id?: string
          is_featured?: boolean | null
          post_date?: string | null
          posted_by?: string | null
          reference?: string | null
          title?: string | null
          urdu_translation?: string | null
        }
        Update: {
          arabic_text?: string
          content_type?: string
          created_at?: string | null
          english_translation?: string | null
          id?: string
          is_featured?: boolean | null
          post_date?: string | null
          posted_by?: string | null
          reference?: string | null
          title?: string | null
          urdu_translation?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          agent_id: string | null
          capacity: number | null
          country: string | null
          created_at: string | null
          description: string | null
          duration_days: number | null
          features: string[] | null
          id: string
          is_active: boolean | null
          price: number
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          capacity?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          price: number
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          capacity?: number | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          price?: number
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          agent_code: string | null
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          receipt_url: string | null
          reference_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          agent_code?: string | null
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          receipt_url?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          agent_code?: string | null
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          receipt_url?: string | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          agent_code: string | null
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
          user_type: string
          username: string
        }
        Insert: {
          agent_code?: string | null
          created_at?: string | null
          email: string
          id: string
          updated_at?: string | null
          user_type: string
          username: string
        }
        Update: {
          agent_code?: string | null
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
          user_type?: string
          username?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          description: string | null
          duration_months: number
          features: string[] | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_months?: number
          features?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          created_at: string | null
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          created_at?: string | null
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
