export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string
          region: string
          selected_expert_ids: number[] | null
          specialty: string
          status: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone: string
          region: string
          selected_expert_ids?: number[] | null
          specialty: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          region?: string
          selected_expert_ids?: number[] | null
          specialty?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      expert_applications: {
        Row: {
          career_timeline: Json | null
          certifications: string[] | null
          contact: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          education_history: Json | null
          email: string | null
          experience: string | null
          id: string
          image: string | null
          key_achievements: string[] | null
          name: string
          projects: string | null
          regions: string[] | null
          rejection_reason: string | null
          role: string
          services: string[] | null
          specialty: string
          status: string | null
          success_cases: Json | null
          testimonials: Json | null
          updated_at: string
        }
        Insert: {
          career_timeline?: Json | null
          certifications?: string[] | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          education_history?: Json | null
          email?: string | null
          experience?: string | null
          id?: string
          image?: string | null
          key_achievements?: string[] | null
          name: string
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role: string
          services?: string[] | null
          specialty: string
          status?: string | null
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Update: {
          career_timeline?: Json | null
          certifications?: string[] | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          education_history?: Json | null
          email?: string | null
          experience?: string | null
          id?: string
          image?: string | null
          key_achievements?: string[] | null
          name?: string
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role?: string
          services?: string[] | null
          specialty?: string
          status?: string | null
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      experts: {
        Row: {
          application_date: string | null
          application_status: string | null
          approval_date: string | null
          career_timeline: Json | null
          certifications: string[] | null
          contact: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          display_order: number | null
          education_history: Json | null
          email: string | null
          experience: string | null
          id: number
          image: string | null
          is_approved: boolean | null
          is_regional_manager: boolean | null
          key_achievements: string[] | null
          managed_regions: string[] | null
          name: string
          profile_views: number
          projects: string | null
          regions: string[] | null
          rejection_reason: string | null
          role: string
          services: string[] | null
          show_on_main: boolean | null
          specialty: string
          success_cases: Json | null
          testimonials: Json | null
          updated_at: string
        }
        Insert: {
          application_date?: string | null
          application_status?: string | null
          approval_date?: string | null
          career_timeline?: Json | null
          certifications?: string[] | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          education_history?: Json | null
          email?: string | null
          experience?: string | null
          id?: number
          image?: string | null
          is_approved?: boolean | null
          is_regional_manager?: boolean | null
          key_achievements?: string[] | null
          managed_regions?: string[] | null
          name: string
          profile_views?: number
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role: string
          services?: string[] | null
          show_on_main?: boolean | null
          specialty: string
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Update: {
          application_date?: string | null
          application_status?: string | null
          approval_date?: string | null
          career_timeline?: Json | null
          certifications?: string[] | null
          contact?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          education_history?: Json | null
          email?: string | null
          experience?: string | null
          id?: number
          image?: string | null
          is_approved?: boolean | null
          is_regional_manager?: boolean | null
          key_achievements?: string[] | null
          managed_regions?: string[] | null
          name?: string
          profile_views?: number
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role?: string
          services?: string[] | null
          show_on_main?: boolean | null
          specialty?: string
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      region_groups: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      region_items: {
        Row: {
          created_at: string
          display_order: number
          group_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          group_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          group_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "region_items_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "region_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      simulators: {
        Row: {
          active: boolean
          created_at: string
          description: string
          display_order: number
          id: number
          title: string
          type: string
          updated_at: string
          views: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string
          display_order?: number
          id?: number
          title: string
          type: string
          updated_at?: string
          views?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          display_order?: number
          id?: number
          title?: string
          type?: string
          updated_at?: string
          views?: number
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          content: string
          created_at: string
          date: string
          featured: boolean
          hospital: string
          id: number
          image_url: string
          location: string
          services: string[]
          summary: string
          title: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          content?: string
          created_at?: string
          date?: string
          featured?: boolean
          hospital?: string
          id?: number
          image_url?: string
          location?: string
          services?: string[]
          summary?: string
          title: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          featured?: boolean
          hospital?: string
          id?: number
          image_url?: string
          location?: string
          services?: string[]
          summary?: string
          title?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      experts_public: {
        Row: {
          application_date: string | null
          application_status: string | null
          approval_date: string | null
          career_timeline: Json | null
          certifications: string[] | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          education_history: Json | null
          experience: string | null
          id: number | null
          image: string | null
          is_approved: boolean | null
          is_regional_manager: boolean | null
          key_achievements: string[] | null
          managed_regions: string[] | null
          name: string | null
          profile_views: number | null
          projects: string | null
          regions: string[] | null
          rejection_reason: string | null
          role: string | null
          services: string[] | null
          show_on_main: boolean | null
          specialty: string | null
          success_cases: Json | null
          testimonials: Json | null
          updated_at: string | null
        }
        Insert: {
          application_date?: string | null
          application_status?: string | null
          approval_date?: string | null
          career_timeline?: Json | null
          certifications?: string[] | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          education_history?: Json | null
          experience?: string | null
          id?: number | null
          image?: string | null
          is_approved?: boolean | null
          is_regional_manager?: boolean | null
          key_achievements?: string[] | null
          managed_regions?: string[] | null
          name?: string | null
          profile_views?: number | null
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role?: string | null
          services?: string[] | null
          show_on_main?: boolean | null
          specialty?: string | null
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string | null
        }
        Update: {
          application_date?: string | null
          application_status?: string | null
          approval_date?: string | null
          career_timeline?: Json | null
          certifications?: string[] | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          education_history?: Json | null
          experience?: string | null
          id?: number | null
          image?: string | null
          is_approved?: boolean | null
          is_regional_manager?: boolean | null
          key_achievements?: string[] | null
          managed_regions?: string[] | null
          name?: string | null
          profile_views?: number | null
          projects?: string | null
          regions?: string[] | null
          rejection_reason?: string | null
          role?: string | null
          services?: string[] | null
          show_on_main?: boolean | null
          specialty?: string | null
          success_cases?: Json | null
          testimonials?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_expert_views: {
        Args: { expert_id: number }
        Returns: undefined
      }
      increment_simulator_views: {
        Args: { simulator_id: number }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
