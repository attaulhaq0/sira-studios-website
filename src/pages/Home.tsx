import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, TrendingUp, Users, Award, Sparkles, Video, Target, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroStudio from "@/assets/hero-studio.jpg";
import brandContent from "@/assets/brand-content.jpg";
import videoProduction from "@/assets/video-production.jpg";
import creatorNetwork from "@/assets/creator-network.jpg";
import campaignManagement from "@/assets/campaign-management.jpg";

import AnimatedCounter from "@/components/AnimatedCounter";

const Home = () => {
  const showcaseItems = [
    {
      image: brandContent,
      title: "Brand Storytelling",
      description: "Crafting narratives that resonate with your audience"
    },
    {
      image: videoProduction,
      title: "Cinematic Production",
      description: "High-quality video content that captivates"
    },
    {
      image: creatorNetwork,
      title: "Creative Collaboration",
      description: "Working with top talent across industries"
    },
    {
      image: campaignManagement,
      title: "Campaign Excellence",
      description: "Data-driven strategies for maximum impact"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img 
          src={heroStudio}
          alt="Sira Studios Production Environment"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.6)' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-2xl md:text-3xl font-bold text-white max-w-3xl mx-auto animate-slide-up stagger-1 drop-shadow-2xl leading-relaxed">
              We craft compelling narratives that captivate audiences and transform brands through creative storytelling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
              <Button asChild size="lg" className="gradient-primary glow-effect text-lg hover-lift">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="hover-lift bg-white/10 text-white border-white/30 hover:bg-white hover:text-foreground">
                <Link to="/what-we-do">
                  <Play className="mr-2 h-5 w-5" />
                  See Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full gradient-primary opacity-20 blur-2xl animate-float"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full gradient-full opacity-20 blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-24 bg-gradient-to-br from-muted/50 via-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-scale-in stagger-1 group">
              <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 group-hover:scale-110 smooth-transition backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold text-gradient mb-3">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <p className="text-xl font-semibold text-foreground">Projects Delivered</p>
              </div>
            </div>
            <div className="text-center animate-scale-in stagger-2 group">
              <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-secondary/10 to-accent/10 mb-6 group-hover:scale-110 smooth-transition backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold text-gradient mb-3">
                  <AnimatedCounter end={50} suffix="M+" />
                </div>
                <p className="text-xl font-semibold text-foreground">Views Generated</p>
              </div>
            </div>
            <div className="text-center animate-scale-in stagger-3 group">
              <div className="inline-block p-10 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 mb-6 group-hover:scale-110 smooth-transition backdrop-blur-sm">
                <div className="text-6xl md:text-7xl font-bold text-gradient mb-3">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <p className="text-xl font-semibold text-foreground">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Creative Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of stunning visual content
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {showcaseItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden group hover-lift border-2">
                    <div className="relative h-64 overflow-hidden bg-muted/20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        loading="eager"
                        decoding="async"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-white/90">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 md:-left-12" />
            <CarouselNext className="right-2 md:-right-12" />
          </Carousel>
        </div>
      </section>

      {/* Services Preview with Icons */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Create</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to delivery, we bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 hover-lift border-2 animate-slide-up stagger-1 group">
              <div className="mb-4 inline-block p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Brand Content</h3>
              <p className="text-muted-foreground leading-relaxed">Strategic content that elevates your brand presence and connects with audiences</p>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up stagger-2 group">
              <div className="mb-4 inline-block p-4 rounded-2xl bg-secondary/10 group-hover:bg-secondary/20 smooth-transition">
                <Video className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Video Production</h3>
              <p className="text-muted-foreground leading-relaxed">High-quality cinematic videos that tell your story and engage viewers</p>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up stagger-3 group">
              <div className="mb-4 inline-block p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 smooth-transition">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Creator Network</h3>
              <p className="text-muted-foreground leading-relaxed">Connect with top creative talent and influencers across industries</p>
            </Card>

            <Card className="p-6 hover-lift border-2 animate-slide-up stagger-4 group">
              <div className="mb-4 inline-block p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                <Target className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Campaign Management</h3>
              <p className="text-muted-foreground leading-relaxed">End-to-end campaign execution with data-driven strategies</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Sira Studios?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine creativity with strategy to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 animate-slide-up stagger-1">
              <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Creative Excellence</h3>
              <p className="text-muted-foreground">Award-winning creative team pushing boundaries</p>
            </div>

            <div className="text-center space-y-4 animate-slide-up stagger-2">
              <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Innovative Solutions</h3>
              <p className="text-muted-foreground">Fresh perspectives for modern challenges</p>
            </div>

            <div className="text-center space-y-4 animate-slide-up stagger-3">
              <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Proven Results</h3>
              <p className="text-muted-foreground">Track record of successful campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground animate-slide-up">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up stagger-1">
            Let's collaborate to bring your creative vision to life with compelling storytelling
          </p>
          <div className="animate-slide-up stagger-2">
            <Button asChild size="lg" variant="secondary" className="text-lg hover-lift">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
