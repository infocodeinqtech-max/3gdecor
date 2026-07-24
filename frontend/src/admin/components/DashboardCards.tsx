import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { TrendingUp, type LucideIcon } from "lucide-react";

export interface DashboardCard {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  path?: string;
}

export default function DashboardCards({ cards }: { cards: DashboardCard[] }) {
  if (cards.length === 0) {
    return (
      <div className="admin-card rounded-2xl p-8 text-center admin-card-muted text-sm">
        No overview items for your assigned permissions.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const content = (
          <>
            <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl admin-btn-gold flex items-center justify-center">
              {Icon ? <Icon className="w-6 h-6 text-[#1e1a17]" /> : null}
            </div>
              {card.trend && (
                <span className="flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp className="w-3 h-3" />
                  {card.trend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold mb-1 text-[#2A211C] group-hover:text-[#8a5a12] transition-colors">
              {card.value}
            </p>
            <p className="text-sm admin-card-muted">{card.label}</p>
          </>
        );

        return (
          <motion.div
            key={card.path || card.label || `card-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={
              card.path
                ? { y: -4, boxShadow: "0 12px 40px rgba(212,166,75,0.12)" }
                : undefined
            }
          >
            {card.path ? (
              <Link
                to={card.path}
                className="block p-6 rounded-2xl admin-card hover:border-[#D4A64B]/40 transition-all group"
              >
                {content}
              </Link>
            ) : (
              <div className="p-6 rounded-2xl admin-card group">{content}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
