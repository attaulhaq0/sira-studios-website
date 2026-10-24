import { Target, Heart, Zap, Users, Sparkles, Rocket, Eye, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import creativeTeam from "@/assets/creative-team.jpg";
import aryanSandy from "@/assets/aryan-sandy.jpg";
import suryaParimi from "@/assets/surya-parimi.jpg";
import maheshReddy from "@/assets/mahesh-reddy.jpg";

const WhoAreWe = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Who Are We</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We're storytellers, creators, and dreamers united by a passion for transforming ideas into captivating visual experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="gradient-primary rounded-2xl p-8 md:p-12 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              At Sira Studios, we believe every brand has a unique story worth telling. Our mission is to craft 
              compelling narratives that resonate with audiences, drive engagement, and create lasting impact. 
              We combine creativity, strategy, and technical excellence to deliver content that doesn't just look 
              good—it performs.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Excellence</h3>
              <p className="text-muted-foreground">
                We strive for excellence in every project, never settling for good enough.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Passion</h3>
              <p className="text-muted-foreground">
                Our love for storytelling drives us to create content that truly matters.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace new technologies and creative approaches to stay ahead.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe the best work comes from working together as a team.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story with Images */}
        <section className="mb-20 bg-gradient-to-br from-muted/30 to-primary/5 py-16 rounded-3xl">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="animate-slide-in-left">
                <img 
                  src={teamCollaboration} 
                  alt="Team Collaboration" 
                  className="rounded-2xl shadow-2xl hover-lift"
                />
              </div>
              <div className="animate-slide-in-right">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Our Story</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Founded with a vision to revolutionize content creation, Sira Studios has grown from a 
                    small team of passionate creators to a full-service production powerhouse.
                  </p>
                  <p>
                    We've had the privilege of working with brands across industries, helping them connect 
                    with audiences through authentic, engaging content.
                  </p>
                  <p>
                    Today, we're proud to be at the forefront of digital storytelling, constantly evolving 
                    and pushing creative boundaries.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-16">
              <div className="animate-slide-in-left order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">What We Offer</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-primary">
                    <Sparkles className="h-7 w-7 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-xl mb-2">Creative Excellence</h3>
                      <p className="text-muted-foreground">Award-winning content that stands out in the digital landscape</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-secondary">
                    <Rocket className="h-7 w-7 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-xl mb-2">Strategic Growth</h3>
                      <p className="text-muted-foreground">Data-driven campaigns designed to maximize reach and engagement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-card hover:bg-accent/10 smooth-transition border-l-4 border-accent">
                    <Heart className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-xl mb-2">Brand Connection</h3>
                      <p className="text-muted-foreground">Stories that create emotional bonds between brands and audiences</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="animate-slide-in-right order-1 lg:order-2">
                <img 
                  src={creativeTeam} 
                  alt="Creative Team" 
                  className="rounded-2xl shadow-2xl hover-lift"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Competitive Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-lift border-2 hover:border-primary smooth-transition group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <Eye className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Proven Results</h3>
                <p className="text-muted-foreground leading-relaxed">Track record of delivering measurable success across platforms</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-2 hover:border-secondary smooth-transition group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <TrendingUp className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Scalable Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">From startup to enterprise, we adapt to your growth journey</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-2 hover:border-accent smooth-transition group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <Zap className="h-10 w-10 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-3">Fast Turnaround</h3>
                <p className="text-muted-foreground leading-relaxed">Agile production process that meets tight deadlines</p>
              </CardContent>
            </Card>
            <Card className="hover-lift border-2 hover:border-primary smooth-transition group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3">Expert Team</h3>
                <p className="text-muted-foreground leading-relaxed">Industry veterans with deep expertise across creative disciplines</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Look For */}
        <section className="mb-20">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gradient">What We Look For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="aspect-square w-full max-w-[200px] p-6 rounded-full bg-background border-2 border-border hover:border-primary smooth-transition hover-lift shadow-md flex flex-col items-center justify-center text-center">
                  <Lightbulb className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold text-lg mb-2">Innovative Thinking</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Brands willing to push boundaries
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="aspect-square w-full max-w-[200px] p-6 rounded-full bg-background border-2 border-border hover:border-secondary smooth-transition hover-lift shadow-md flex flex-col items-center justify-center text-center">
                  <Target className="h-10 w-10 text-secondary mb-3" />
                  <h3 className="font-bold text-lg mb-2">Clear Vision</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Partners committed to measurable results
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="aspect-square w-full max-w-[200px] p-6 rounded-full bg-background border-2 border-border hover:border-accent smooth-transition hover-lift shadow-md flex flex-col items-center justify-center text-center">
                  <Heart className="h-10 w-10 text-accent mb-3" />
                  <h3 className="font-bold text-lg mb-2">Brand Passion</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Companies that share authentically
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="aspect-square w-full max-w-[200px] p-6 rounded-full bg-background border-2 border-border hover:border-primary smooth-transition hover-lift shadow-md flex flex-col items-center justify-center text-center">
                  <Users className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-bold text-lg mb-2">Collaborative Spirit</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Teams ready to bring vision to life
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team / Board Members */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">Our Leadership Team</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Meet the visionaries driving innovation and excellence at Sira Studios
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="group animate-scale-in stagger-1">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <img 
                  src={aryanSandy} 
                  alt="Aryan Sandy" 
                  className="w-full h-96 object-cover group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-6">
                  <p className="text-sm text-foreground font-medium">Leading creative vision and strategic direction</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-2">Aryan Sandy</h3>
              <p className="text-primary font-semibold text-lg mb-2">Creative Head and Director</p>
              <p className="text-sm text-muted-foreground">Visionary leader driving creative excellence</p>
            </div>

            <div className="group animate-scale-in stagger-2">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <img 
                  src={suryaParimi} 
                  alt="Surya S Parimi" 
                  className="w-full h-96 object-cover group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-6">
                  <p className="text-sm text-foreground font-medium">Driving strategic growth and operational excellence</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-2">Surya S Parimi</h3>
              <p className="text-secondary font-semibold text-lg mb-2">Managing Director</p>
              <p className="text-sm text-muted-foreground">Strategic leader ensuring operational success</p>
            </div>

            <div className="group animate-scale-in stagger-3">
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl">
                <img 
                  src={maheshReddy} 
                  alt="Dr. Mahesh Reddy B" 
                  className="w-full h-96 object-cover group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-6">
                  <p className="text-sm text-foreground font-medium">Leading innovation and business strategy</p>
                </div>
              </div>
              <h3 className="font-bold text-2xl mb-2">Dr. Mahesh Reddy B</h3>
              <p className="text-accent font-semibold text-lg mb-2">CEO of Sira Studios</p>
              <p className="text-sm text-muted-foreground">Strategic visionary leading company growth</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center gradient-primary rounded-3xl p-16">
          <h2 className="text-4xl font-bold mb-6 text-primary-foreground">Want to Work With Us?</h2>
          <p className="text-primary-foreground/90 mb-8 text-xl max-w-2xl mx-auto">
            Get in touch to discuss how we can help bring your vision to life
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg hover-lift">
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
