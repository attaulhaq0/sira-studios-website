import { TrendingUp, Target, Award, Users, Play, Zap, Globe } from "lucide-react";
import { useEffect, useRef } from "react";
import teamCollaboration from "@/assets/team-collaboration.jpg";
const InvestorRelations = () => {
  const overviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, {
      threshold: 0.1
    });
    const elements = overviewRef.current?.querySelectorAll(".reveal");
    elements?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Investor Relations</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Partnering with visionaries to revolutionize content creation and digital storytelling.
          </p>
        </div>

        {/* Company Overview - Split Layout with Animation */}
        <div ref={overviewRef} className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Redefining the Future of{" "}
                <span className="text-gradient">Digital Storytelling</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  Sira Studios is a creative powerhouse born in the digital age—where ideas meet execution, 
                  and brands find their voice through authentic storytelling.
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  We bridge the gap between brands and audiences through compelling content, strategic creator 
                  partnerships, and data-driven campaigns. Our integrated approach combines production excellence 
                  with creator economy insights.
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <Play className="w-4 h-4" />
                    Content Production
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    <Users className="w-4 h-4" />
                    Creator Networks
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    Brand Campaigns
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right - Image with overlay stats */}
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 ease-out relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={teamCollaboration} alt="Sira Studios Team" className="w-full h-[400px] lg:h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Floating Stats */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-white">2020</div>
                      <div className="text-xs text-white/70 uppercase tracking-wider">Founded</div>
                    </div>
                    <div className="text-center border-x border-white/20">
                      <div className="text-2xl md:text-3xl font-bold text-white">India</div>
                      <div className="text-xs text-white/70 uppercase tracking-wider">Headquarters</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                      <div className="text-xs text-white/70 uppercase tracking-wider">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20"></div>
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="aspect-square w-full max-w-[300px] p-8 rounded-full gradient-primary text-primary-foreground shadow-lg flex flex-col items-center justify-center text-center hover-lift smooth-transition">
                <TrendingUp className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Growing Market</h3>
                <p className="text-sm leading-relaxed">
                  India's digital advertising market is projected to reach $20B by 2025, with video content 
                  consumption growing at 35% annually.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="aspect-square w-full max-w-[300px] p-8 rounded-full gradient-primary text-primary-foreground shadow-lg flex flex-col items-center justify-center text-center hover-lift smooth-transition">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Creator Economy</h3>
                <p className="text-sm leading-relaxed">
                  The Indian creator economy is expected to be worth $25B by 2025, creating significant 
                  opportunities for platforms and agencies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold mb-2">150%</div>
              <p className="text-muted-foreground">YoY Revenue Growth</p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-secondary" />
              <div className="text-3xl font-bold mb-2">100+</div>
              <p className="text-muted-foreground">Active Brand Clients</p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <p className="text-muted-foreground">Creator Network</p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold mb-2">50M+</div>
              <p className="text-muted-foreground">Monthly Reach</p>
            </div>
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gradient">Competitive Advantages</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            What sets us apart in the content creation and creator economy landscape
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-primary smooth-transition hover-lift shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Integrated Platform</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Unlike traditional production houses or pure talent agencies, we offer end-to-end solutions 
                from content creation to distribution and performance tracking.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-secondary smooth-transition hover-lift shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 smooth-transition">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Technology-Driven</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our proprietary tools for creator matching, campaign management, and performance analytics 
                give us a significant edge in efficiency and results.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-accent smooth-transition hover-lift shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 smooth-transition">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Curated Network</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We've built relationships with premium creators across niches, giving brands access to 
                quality talent that drives authentic engagement.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 border-border hover:border-primary smooth-transition hover-lift shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 smooth-transition">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Proven Track Record</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our portfolio includes successful campaigns for leading brands across sectors, demonstrating 
                our ability to deliver measurable business outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center gradient-primary text-primary-foreground rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Interested in Learning More?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            For detailed financial information, pitch deck, or to schedule a meeting with our leadership team, 
            please reach out to us.
          </p>
          <div className="space-y-2">
            <p className="text-lg font-semibold">Contact: Investor Relations</p>
            <p className="text-primary-foreground/80">Phone: +91 - 9182832990</p>
          </div>
        </div>
      </div>
    </div>;
};
export default InvestorRelations;