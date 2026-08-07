import {
  Lightbulb,
  ShieldCheck,
  Building2,
  Users,
  Heart,
  Target,
} from "lucide-react";

export const ICON_OPTIONS = [
  {
    value: "Lightbulb",
    label: "Lightbulb",
    icon: Lightbulb,
  },
  {
    value: "ShieldCheck",
    label: "Shield Check",
    icon: ShieldCheck,
  },
  {
    value: "Building2",
    label: "Building",
    icon: Building2,
  },
  {
    value: "Users",
    label: "Users",
    icon: Users,
  },
  {
    value: "Heart",
    label: "Heart",
    icon: Heart,
  },
  {
    value: "Target",
    label: "Target",
    icon: Target,
  }
] as const;

// Registry for frontend rendering
export const iconRegistry = Object.fromEntries(
  ICON_OPTIONS.map((item) => [item.value, item.icon])
) as Record<
  string,
  React.ComponentType<{ className?: string }>
>;