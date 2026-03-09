import { motion } from 'framer-motion';
import { Star, Heart, Zap, Sparkles, Code, Palette, Globe, Smartphone } from 'lucide-react';

export default function Marquee() {
  const items = [
    { text: 'Web Development', icon: Code },
    { text: 'Graphic Design', icon: Palette },
    { text: 'UI/UX Design', icon: Sparkles },
    { text: 'Brand Identity', icon: Star },
    { text: 'Mobile Apps', icon: Smartphone },
    { text: 'Digital Marketing', icon: Globe },
    { text: 'Creative Solutions', icon: Heart },
    { text: 'Fast Delivery', icon: Zap },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-r from-[#6727aa] via-[#8a5bc9] to-[#6727aa]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* First Row - Left to Right */}
      <div className="relative mb-4 overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, -50 * items.length * 4],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`row1-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full"
            >
              <item.icon className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-lg">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [-50 * items.length * 4, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...duplicatedItems].reverse().map((item, index) => (
            <div
              key={`row2-${index}`}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <item.icon className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-lg">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Overlays for Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#6727aa] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#6727aa] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
