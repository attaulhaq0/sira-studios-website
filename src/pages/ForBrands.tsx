import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Target, BarChart3, Sparkles, Users, Rocket, Shield, LineChart } from "lucide-react";
import brandCreators from "@/assets/brand-creators.jpg";
import brandStrategy from "@/assets/brand-strategy.jpg";

const ForBrands = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Brand Awareness",
      description: "Reach millions through strategic content partnerships and viral campaigns"
    },
    {
      icon: Target,
      title: "Targeted Reach",
      description: "Connect with your ideal audience through precise creator matching"
    },
    {
      icon: BarChart3,
      title: "Measurable Results",
      description: "Track performance with detailed analytics and ROI reporting"
    },
    {
      icon: Sparkles,
      title: "Authentic Stories",
      description: "Build genuine connections through creator-driven storytelling"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">For Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Partner with Sira Studios to amplify your brand message through authentic creator collaborations 
            and compelling content strategies.
          </p>
          <Button asChild size="lg" className="gradient-primary">
            <Link to="/contact">Start Your Campaign</Link>
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border hover:border-primary smooth-transition bg-card"
            >
              <benefit.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* What We Offer with Images */}
        <section className="mb-20 bg-gradient-to-br from-muted/30 to-primary/5 py-16 rounded-3xl">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">What We Offer</h2>
            
            {/* First Row - Image Left, Content Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="animate-slide-in-left">
                <img 
                  src={brandCreators} 
                  alt="Creator Network & Partnerships" 
                  className="rounded-2xl shadow-2xl hover-lift"
                />
              </div>
              <div className="animate-slide-in-right space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-primary">
                  <Users className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Creator Partnerships</h3>
                    <p className="text-muted-foreground">
                      Access our network of vetted creators across niches including lifestyle, tech, food, travel, 
                      and entertainment. We handle everything from creator selection to contract negotiation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-secondary">
                  <Rocket className="h-7 w-7 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Campaign Management</h3>
                    <p className="text-muted-foreground">
                      Full-service campaign planning and execution. From concept development to content approval 
                      and performance tracking, we manage every detail of your influencer marketing campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Row - Content Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-16">
              <div className="animate-slide-in-left order-2 lg:order-1 space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-accent">
                  <LineChart className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Content Strategy</h3>
                    <p className="text-muted-foreground">
                      Data-driven content strategies that align with your brand objectives. We analyze trends, 
                      audience insights, and platform algorithms to maximize your content's reach and impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-primary">
                  <Shield className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-xl mb-2">Brand Safety</h3>
                    <p className="text-muted-foreground">
                      We ensure all collaborations align with your brand values. Our rigorous vetting process 
                      and content approval systems protect your brand reputation while maintaining authenticity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="animate-slide-in-right order-1 lg:order-2">
                <img 
                  src={brandStrategy} 
                  alt="Content Strategy & Brand Safety" 
                  className="rounded-2xl shadow-2xl hover-lift"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="gradient-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">100+</div>
              <p className="text-primary-foreground/90">Brands Partnered</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">50M+</div>
              <p className="text-primary-foreground/90">Total Reach</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-foreground mb-2">500+</div>
              <p className="text-primary-foreground/90">Successful Campaigns</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
          <p className="text-muted-foreground mb-8">
            Let's discuss how we can help you achieve your marketing goals.
          </p>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForBrands;
