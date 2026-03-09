import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Sparkles } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { icon: Code, label: 'Web Development', color: '#6727aa' },
    { icon: Palette, label: 'Graphic Design', color: '#9d71e8' },
    { icon: Sparkles, label: 'UI/UX Design', color: '#8a5bc9' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-[#6727aa]/5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', right: '5%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -30 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            <div className="relative group">
              {/* Animated Border */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#6727aa] via-[#9d71e8] to-[#6727aa] rounded-3xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ animationDuration: '10s' }} />
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 dark:bg-gray-800">
                <motion.img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"
                  alt="Crafty Jay"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03 }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6727aa]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
                className="absolute -bottom-4 -right-4 bg-white dark:bg-[#1a1225] rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6727aa] to-[#9d71e8] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#6727aa] dark:text-[#9d71e8]">5+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#6727aa] dark:text-[#9d71e8] font-medium text-sm uppercase tracking-wider">
                About Me
              </span>
              <h2 className="section-title text-4xl md:text-5xl font-display text-gray-900 dark:text-white mt-2">
                Crafting Digital <span className="gradient-text">Experiences</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            >
              I'm <span className="font-semibold text-[#6727aa] dark:text-[#9d71e8]">Crafty Jay</span> — a passionate 
              <span className="relative inline-block mx-1">
                <span className="relative z-10 font-semibold text-[#6727aa] dark:text-[#9d71e8]">web developer</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#6727aa]/20 dark:bg-[#9d71e8]/20 -z-0" />
              </span>
              and 
              <span className="relative inline-block mx-1">
                <span className="relative z-10 font-semibold text-[#6727aa] dark:text-[#9d71e8]">graphic designer</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#6727aa]/20 dark:bg-[#9d71e8]/20 -z-0" />
              </span>
              who brings ideas to life through clean code and creative visuals.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            >
              I specialize in building responsive websites, branding, and user-centered design. 
              With a strong background in both code and design, I bridge the gap between 
              aesthetics and functionality.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed"
            >
              Whether it's building portfolios, e-commerce sites, or visual identities — 
              I craft experiences that are both beautiful and effective.
            </motion.p>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1, ease: [0.68, -0.55, 0.265, 1.55] }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
