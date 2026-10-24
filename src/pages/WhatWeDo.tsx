import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Video, 
  Camera, 
  Megaphone, 
  Palette, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Target,
  Sparkles,
  Film
} from "lucide-react";
import videoProduction from "@/assets/video-production.jpg";
import brandContent from "@/assets/brand-content.jpg";

const WhatWeDo = () => {
  const services = [
    {
      icon: Video,
      title: "Video Production",
      description: "From concept to final cut, we create stunning video content that tells your story.",
      features: [
        "Commercial Videos",
        "Corporate Films",
        "Documentary Production",
        "Music Videos",
        "Event Coverage"
      ],
      color: "primary"
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Engaging content tailored for social media, websites, and digital platforms.",
      features: [
        "Social Media Content",
        "YouTube Series",
        "Reels & Shorts",
        "Behind-the-Scenes",
        "Product Photography"
      ],
      color: "secondary"
    },
    {
      icon: Megaphone,
      title: "Brand Marketing",
      description: "Strategic marketing campaigns that amplify your brand's voice and reach.",
      features: [
        "Campaign Strategy",
        "Brand Storytelling",
        "Influencer Partnerships",
        "Digital Marketing",
        "Content Distribution"
      ],
      color: "accent"
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Visual design that captures attention and communicates your brand identity.",
      features: [
        "Brand Identity",
        "Motion Graphics",
        "Visual Effects",
        "Post-Production",
        "Color Grading"
      ],
      color: "primary"
    },
    {
      icon: Users,
      title: "Talent Management",
      description: "Connect with our network of creators, influencers, and content experts.",
      features: [
        "Creator Partnerships",
        "Talent Sourcing",
        "Collaboration Management",
        "Performance Analytics",
        "Contract Negotiation"
      ],
      color: "secondary"
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Data-driven strategies to grow your audience and maximize engagement.",
      features: [
        "Audience Analysis",
        "Performance Optimization",
        "Trend Research",
        "ROI Tracking",
        "Growth Hacking"
      ],
      color: "accent"
    }
  ];

  const process = [
    {
      icon: Lightbulb,
      title: "Discovery",
      description: "We begin by understanding your vision, goals, and target audience"
    },
    {
      icon: Palette,
      title: "Ideation",
      description: "Our creative team develops concepts and strategies tailored to your needs"
    },
    {
      icon: Film,
      title: "Production",
      description: "We bring ideas to life with professional execution and attention to detail"
    },
    {
      icon: Target,
      title: "Delivery",
      description: "Final content is delivered with optimization for your chosen platforms"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">What We Do</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We create compelling visual stories that engage audiences and drive results. 
            From concept to distribution, we handle every aspect of content creation with 
            creativity and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className={`hover-lift border-2 animate-slide-up stagger-${(index % 6) + 1} group`}
              >
                <CardHeader>
                  <div className={`mb-4 inline-block p-4 rounded-2xl bg-${service.color}/10 group-hover:bg-${service.color}/20 smooth-transition`}>
                    <Icon className={`h-10 w-10 text-${service.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach to bringing your creative vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center space-y-4 animate-slide-up stagger-${index + 1}`}
                >
                  <div className="mx-auto w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gradient">0{index + 1}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="relative overflow-hidden rounded-2xl group h-96 animate-slide-in-left">
            <img 
              src={videoProduction} 
              alt="Video Production" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Cinematic Excellence</h3>
                <p className="text-white/90">Professional video production with cutting-edge equipment</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl group h-96 animate-slide-in-right">
            <img 
              src={brandContent} 
              alt="Brand Content" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Creative Storytelling</h3>
                <p className="text-white/90">Narratives that resonate and create lasting impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-2xl gradient-primary animate-scale-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Let's Bring Your Vision to Life
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Ready to start your next project? Get in touch with our team to discuss how we can help.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg hover-lift">
            <Link to="/contact">Start a Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
