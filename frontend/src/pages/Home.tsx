import  { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Brain, Target, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const equalVoiceRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (equalVoiceRef.current) {
        const rect = equalVoiceRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = ((e.clientX - centerX) / rect.width) * 100;
        const mouseY = ((e.clientY - centerY) / rect.height) * 100;
        
        setMousePosition({ x: mouseX, y: mouseY });
        x.set(mouseX * 0.2);
        y.set(mouseY * 0.2);

        // Update fluid waves based on cursor position
        const waves = equalVoiceRef.current.querySelectorAll('.fluid-wave-1, .fluid-wave-2, .fluid-wave-3');
        waves.forEach((wave, index) => {
          const element = wave as HTMLElement;
          const intensity = (index + 1) * 0.1;
          element.style.transform = `translateX(${mouseX * intensity}px) translateY(${mouseY * intensity}px)`;
        });

        // Update fluid bubbles
        const bubbles = equalVoiceRef.current.querySelectorAll('.fluid-bubble');
        bubbles.forEach((bubble, index) => {
          const element = bubble as HTMLElement;
          const intensity = (index + 1) * 0.05;
          element.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px) scale(${1 + Math.abs(mouseX + mouseY) * 0.001})`;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Gender Bias Detection",
      description: "Advanced AI identifies subtle gender biases in language patterns and word choices with 95% accuracy.",
      color: "from-pink-400 to-pink-600",
      stats: "10K+ texts analyzed"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Sentiment Analysis",
      description: "Analyze emotional tone and sentiment disparities across gender references in real-time.",
      color: "from-purple-400 to-pink-500",
      stats: "50+ languages supported"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Inclusive Suggestions",
      description: "Get actionable recommendations to make your content more gender-inclusive and representative.",
      color: "from-blue-400 to-pink-400",
      stats: "500+ organizations trust us"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Feminist Representation",
      description: "Measure and improve feminist representation in your content with detailed scoring metrics.",
      color: "from-green-400 to-pink-400",
      stats: "95% user satisfaction"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Real-time Analysis",
      description: "Instant feedback as you type with comprehensive bias detection and inclusivity scoring.",
      color: "from-yellow-400 to-pink-400",
      stats: "< 2s analysis time"
    }
  ];

  const useCases = [
    { type: "Writers", use: "Check inclusivity of articles, blogs, etc.", icon: "✍️" },
    { type: "Students", use: "Learn gender-aware writing", icon: "🎓" },
    { type: "NGOs/Activists", use: "Analyze public speeches and media narratives", icon: "📢"},
    { type: "Product Teams", use: "Make app content inclusive", icon: "💼" },
    { type: "Journalists", use: "Audit for bias in reporting", icon: "📰" }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-8 overflow-hidden bg-white">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
        <div className="floating-particle"></div>
      </div>

      {/* Hero Section with Huge Hollow EqualVoice */}
      <motion.section 
        ref={heroRef}
        style={{ y: yPos, opacity }}
        className="min-h-screen flex flex-col items-center justify-center relative pink-gradient"
      >
        <div className="liquid-wave"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="mb-10 hero-shift-up"  
>

            {/* Huge Hollow EqualVoice with Fluid Waves */}
            <div 
              ref={equalVoiceRef}
              className="huge-equalvoice"
            >
        <motion.div
  className="hollow-text goopy-text font-goopy text-[clamp(2.5rem,5vw,4.5rem)]"
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1.3, y: 0 }}
  transition={{
    duration: 1.6,
    ease: [0.25, 0.1, 0.25, 1],
    type: "spring",
    stiffness: 20,
    damping: 12,
  }}
>
  EqualVoice
</motion.div>







              {/* Fluid Wave Layers */}
              <div className="fluid-wave-1"></div>
              <div className="fluid-wave-2"></div>
              <div className="fluid-wave-3"></div>

              {/* Fluid Bubbles */}
              <div className="fluid-bubble"></div>
              <div className="fluid-bubble"></div>
              <div className="fluid-bubble"></div>
              <div className="fluid-bubble"></div>
              <div className="fluid-bubble"></div>
              <div className="fluid-bubble"></div>

              {/* Cursor Ripple Effect */}
              <div 
                className="cursor-ripple"
                style={{
                  left: `${50 + mousePosition.x * 0.3}%`,
                  top: `${50 + mousePosition.y * 0.3}%`
                }}
              />
            </div>

            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold mb-8 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="gradient-text">Gender Bias</span> Detection & Analysis
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Detect <span className="font-semibold text-pink-600">gender bias</span>, analyze <span className="font-semibold text-pink-600">sentiment disparity</span>, and enhance <span className="font-semibold text-pink-600">feminist representation</span> in your content with AI-powered insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/analyzer"
                className="group inline-flex items-center space-x-3 pink-gradient-strong text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover-lift"
              >
                <span>Start Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-700 font-semibold transition-colors"
              >
               
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Advanced Gender Analysis - Horizontal Scrolling Cards */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Advanced <span className="gradient-text">Gender Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive analysis to help you create more inclusive and equitable content.
            </p>
          </motion.div>

          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="scroll-indicator left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={scrollRight}
              className="scroll-indicator right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={scrollRef}
              className="horizontal-scroll"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="scroll-card"
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full text-white mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="text-sm text-pink-600 font-semibold">{feature.stats}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 pink-gradient relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-6">
              Who Uses <span className="gradient-text">EqualVoice</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From writers to activists, our platform serves diverse communities committed to inclusive communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover-lift group border-2 border-pink-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{useCase.icon}</div>
                  
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {useCase.type}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {useCase.use}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-32 pink-gradient-strong text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-display font-bold mb-6">
              Ready to Create Inclusive Content?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Join thousands of writers, activists, and organizations using EqualVoice to build a more equitable world through language.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/analyzer"
                className="inline-flex items-center space-x-3 bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 hover-lift shadow-xl"
              >
                <span>Start Free Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 text-white hover:text-pink-100 font-semibold transition-colors border-b border-transparent hover:border-white"
              >
               
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;