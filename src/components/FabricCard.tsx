import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Fabric } from "@/data/fabrics";

interface FabricCardProps {
  fabric: Fabric;
}

const FabricCard = ({ fabric }: FabricCardProps) => {
  return (
    <Link to={`/fabric/${fabric.id}`}>
      <motion.div
        className="group relative rounded-lg overflow-hidden shadow-fabric hover:shadow-fabric-hover transition-shadow duration-300 bg-card"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={fabric.image}
            alt={fabric.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {fabric.isFeatured && (
              <span className="bg-gold text-gold-foreground text-xs px-2 py-1 rounded font-body font-semibold">
                مميز
              </span>
            )}
            {fabric.isNew && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-body font-semibold">
                جديد
              </span>
            )}
            {fabric.comingSoon && (
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded font-body font-semibold">
                قريباً
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-display text-lg text-foreground mb-1">{fabric.name}</h3>
          <p className="text-xs text-muted-foreground font-body mb-2">{fabric.brand} • {fabric.origin}</p>
          <div className="flex items-center gap-1.5 mb-2">
            {fabric.colors.slice(0, 4).map((color, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-body">GSM: {fabric.gsm}</span>
            <span className="text-sm font-semibold text-primary font-body">{fabric.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FabricCard;
