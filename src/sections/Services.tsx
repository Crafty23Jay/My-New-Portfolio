import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Smartphone, 
  Palette, 
  Sparkles, 
  Image, 
  Layout, 
  TrendingUp, 
  Code 
} from 'lucide-react';
import { useData } from '../context/DataContext';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Palette,
  Sparkles,
  Image,
  Layout,
  TrendingUp,
  Code,
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { services } = useData();

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#9d71e8]/5 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '20%', left: '5%' }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-[#6727aa]/5 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-[#6727aa] dark:text-[#9d71e8] font-medium text-sm uppercase tracking-wider">
            What I Do
          </span>
          <h2 className="section-title text-4xl md:text-5xl font-display text-gray-900 dark:text-white mt-2">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            From concept to completion, I offer a full range of digital services 
            to help your business thrive online.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const rotation = index % 2 === 0 ? -10 : 10;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0, rotate: rotation }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 + index * 0.1, 
                  ease: [0.68, -0.55, 0.265, 1.55] 
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] }
                }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-gray-800/50 rounded-2xl p-6 h-full border border-gray-100 dark:border-gray-700/50 hover:border-[#6727aa]/30 dark:hover:border-[#9d71e8]/30 transition-all duration-300 overflow-hidden">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6727aa] via-[#9d71e8] to-[#6727aa] background-animate" style={{ 
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 3s ease infinite'
                    }} />
                    <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-gray-800" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6727aa]/10 to-[#9d71e8]/10 flex items-center justify-center mb-4 group-hover:from-[#6727aa]/20 group-hover:to-[#9d71e8]/20 transition-all duration-300"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-7 h-7 text-[#6727aa] dark:text-[#9d71e8]" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[#6727aa] dark:group-hover:text-[#9d71e8] transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#6727aa]/10 dark:bg-[#9d71e8]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
