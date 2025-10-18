import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Clock, Shield, DollarSign, Bell, Star, Download, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Chatbot from '@/components/Chatbot';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="para-theme">
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast({
        title: "🎉 Subscribed Successfully!",
        description: "You'll be the first to know about new features and updates!",
      });
      e.target.reset();
    }
  };

  const handleDownload = (platform) => {
    toast({
      title: "🚧 Coming Soon!",
      description: `The ${platform} app will be available soon. Stay tuned!`,
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const features = [
    {
      icon: MapPin,
      title: 'Live Vehicle Tracking',
      description: 'Track buses and jeepneys in real-time on an interactive map.',
    },
    {
      icon: Clock,
      title: 'Arrival Time Estimates',
      description: 'Get accurate predictions for when your ride will arrive at your stop.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Receive alerts about delays, route changes, and traffic conditions.',
    },
    {
      icon: MapPin,
      title: 'Nearest Stops',
      description: 'Find the closest bus stops and jeepney terminals near your location.',
    },
    {
      icon: DollarSign,
      title: 'Fare Calculator',
      description: 'Estimate your fare before you ride and plan your budget accordingly.',
    },
    {
      icon: Shield,
      title: 'Safe Routes',
      description: 'Choose verified and safe routes with community ratings and reviews.',
    }
  ];

  const team = [
    {
      name: 'Joshua Martin',
      role: 'Team Leader',
      image: 'Professional Filipino male in business attire smiling confidently'
    },
    {
      name: 'Emman Mervie',
      role: 'Member',
      image: 'Filipino male tech professional with glasses working on laptop'
    },
    {
      name: 'Emman Felipe',
      role: 'Member',
      image: 'Creative Filipino male designer with colorful workspace'
    },
    {
      name: 'Angelyn Ramos',
      role: 'Member',
      image: 'Filipino woman operations manager in smart casual attire'
    }
  ];

  const reviews = [
    {
      name: 'Early Adopter',
      rating: 4,
      comment: 'Finally, an app for PH commuters! It\'s still new, but the real-time tracking is already a game-changer for me.',
      avatar: 'Happy Filipino commuter using smartphone at bus stop'
    },
    {
      name: 'Student Tester',
      rating: 5,
      comment: 'Excited to see this grow! The fare estimate is surprisingly accurate. Can\'t wait for more routes to be added.',
      avatar: 'Young Filipino student smiling with backpack'
    },
    {
      name: 'Beta User',
      rating: 4,
      comment: 'This has potential to be an essential app. The interface is clean and easy to use. Looking forward to future updates!',
      avatar: 'Professional Filipino man in business suit checking phone'
    }
  ];

  return (
    <>
      <Helmet>
        <title>PARA! - Track Public Transportation in Real-Time</title>
        <meta name="description" content="PARA! helps you monitor buses, jeepneys, and public vehicles in real-time. Track. Ride. Arrive on Time." />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Toaster />
        <Header />

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-4 overflow-hidden">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-primary font-semibold text-sm">🚌 Your Smart Commute Companion</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Track. Ride. <br />
                  <span className="text-primary">Arrive on Time.</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Monitor buses, jeepneys, and public vehicles in real-time. The future of Philippine commuting is here.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => scrollToSection('download')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    <Download className="w-5 h-5 mr-2 inline" />
                    Download Now
                  </button>
                  <button onClick={() => scrollToSection('features')} className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold px-8 py-4 text-lg rounded-xl transition-all">
                    Learn More
                  </button>
                </div>

                <div className="mt-12 flex items-center space-x-8">
                  <div>
                    <p className="text-3xl font-bold text-primary">1K+</p>
                    <p className="text-muted-foreground">Early Adopters</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">10+</p>
                    <p className="text-muted-foreground">Initial Routes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                <div className="relative z-10">
                  <img alt="PARA! mobile app interface showing real-time bus tracking" className="w-full max-w-md mx-auto drop-shadow-2xl" src="https://images.unsplash.com/photo-1528033978085-52f315289665" />
                </div>
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 -left-10 w-20 h-20 bg-primary/10 rounded-2xl opacity-50 blur-xl" />
                <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full opacity-50 blur-xl" />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-center mt-16">
              <ChevronDown className="w-8 h-8 mx-auto text-primary animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-primary">PARA!</span></h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">We're revolutionizing public transportation in the Philippines by making commutes smarter, safer, and more predictable.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <img alt="Commuters using PARA! app at bus stop" className="rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1605329954573-f41a2b0e85e9" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                {[
                  { icon: Clock, title: "Save Time Daily", desc: "No more endless waiting. Know exactly when your ride arrives and plan accordingly.", color: "bg-blue-500" },
                  { icon: Shield, title: "Safer Commutes", desc: "Choose verified routes with community ratings and real-time safety updates.", color: "bg-green-500" },
                  { icon: DollarSign, title: "Budget-Friendly", desc: "Calculate fares in advance and manage your transportation budget effectively.", color: "bg-purple-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${item.color} text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful <span className="text-primary">Features</span></h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Everything you need for a seamless commuting experience, all in one app.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 px-4 bg-secondary">
          <div className="container mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our <span className="text-primary">Team</span></h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Passionate individuals dedicated to transforming public transportation in the Philippines.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border">
                  <div className="aspect-square overflow-hidden">
                    <img alt={`${member.name} - ${member.role}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Early <span className="text-primary">Feedback</span></h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Hear what our first users have to say about their experience with PARA!</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-4 border-primary/20">
                      <img alt={`${review.name} avatar`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1691398495617-18457fbf826d" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-card-foreground">{review.name}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted-foreground/30 text-muted-foreground/30'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{review.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-20 px-4 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Commute?</h2>
              <p className="text-xl mb-12 opacity-90">Download PARA! now and experience stress-free public transportation.</p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                {[
                  { platform: "Google Play", store: "GET IT ON" },
                  { platform: "App Store", store: "DOWNLOAD ON THE" }
                ].map((item, index) => (
                  <motion.button key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleDownload(item.platform)} className="bg-primary-foreground text-foreground px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 shadow-2xl transition-all">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs opacity-70">{item.store}</p>
                      <p className="text-lg font-bold">{item.platform}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
                <p className="mb-6 opacity-90">Subscribe to our newsletter for the latest features and updates.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input type="email" name="email" placeholder="Enter your email" required className="flex-1 px-6 py-4 rounded-xl text-foreground bg-primary-foreground font-medium focus:outline-none focus:ring-4 focus:ring-white/50" />
                  <button type="submit" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-8 py-4 rounded-xl shadow-xl transition-all">
                    <Mail className="w-5 h-5 mr-2 inline" />
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground py-12 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">PARA!</span>
                </div>
                <p className="text-muted-foreground">Making public transportation smarter, one ride at a time.</p>
              </div>

              <div>
                <p className="font-bold text-lg mb-4 text-foreground">Quick Links</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button></li>
                  <li><button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Features</button></li>
                  <li><button onClick={() => scrollToSection('team')} className="hover:text-primary transition-colors">Team</button></li>
                  <li><button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors">Reviews</button></li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-lg mb-4 text-foreground">Contact</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Email: hello@paraapp.ph</li>
                  <li>Phone: +63 123 456 7890</li>
                  <li>Manila, Philippines</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-lg mb-4 text-foreground">Follow Us</p>
                <div className="flex space-x-4">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                    <button key={index} className="w-10 h-10 bg-background/50 dark:bg-card hover:bg-primary rounded-lg flex items-center justify-center transition-all group">
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8 text-center text-muted-foreground">
              <p>&copy; 2025 PARA! All rights reserved. Made with passion by the team.</p>
            </div>
          </div>
        </footer>
        <Chatbot />
      </div>
    </>
  );
}

export default App;