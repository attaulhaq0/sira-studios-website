import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Heart, Zap, Users } from "lucide-react";
import { careers } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const careerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(20, "Phone must be less than 20 characters").optional().or(z.literal('')),
  position: z.string().trim().min(1, "Position is required").max(100, "Position must be less than 100 characters"),
  portfolio_url: z.string().max(500, "URL must be less than 500 characters").refine(
    (val) => !val || val === '' || z.string().url().safeParse(val).success,
    "Invalid URL format"
  ).optional().or(z.literal('')),
  message: z.string().trim().min(1, "Cover letter is required").max(2000, "Cover letter must be less than 2000 characters")
});

const Careers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    portfolio_url: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const openPositions = [
    {
      title: "Video Editor",
      department: "Production",
      location: "Hyderabad",
      type: "Full-time"
    },
    {
      title: "Content Strategist",
      department: "Strategy",
      location: "Hyderabad",
      type: "Full-time"
    },
    {
      title: "Social Media Manager",
      department: "Marketing",
      location: "Hyderabad",
      type: "Full-time"
    },
    {
      title: "Motion Graphics Designer",
      department: "Creative",
      location: "Hyderabad",
      type: "Full-time"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input with zod
      const validatedData = careerSchema.parse(formData);

      await careers.submit({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || undefined,
        position: validatedData.position,
        portfolio_url: validatedData.portfolio_url || undefined,
        message: validatedData.message
      });

      toast({
        title: "Application submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        portfolio_url: "",
        message: "",
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Join Our Team</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Be part of a creative team that's shaping the future of digital storytelling.
          </p>
        </div>

        {/* Culture */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Sira Studios?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Growth</h3>
              <p className="text-muted-foreground">
                Continuous learning and career development opportunities
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Culture</h3>
              <p className="text-muted-foreground">
                A supportive environment that values creativity and innovation
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Impact</h3>
              <p className="text-muted-foreground">
                Work on projects that make a real difference for brands
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Team</h3>
              <p className="text-muted-foreground">
                Collaborate with talented, passionate professionals
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border hover:border-primary smooth-transition bg-card"
              >
                <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span>{position.department}</span>
                  <span>•</span>
                  <span>{position.location}</span>
                  <span>•</span>
                  <span>{position.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-gradient">Apply Now</CardTitle>
              <CardDescription>
                Fill out the form below to apply for a position at Sira Studios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 1234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      required
                      placeholder="e.g., Video Editor"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    type="url"
                    value={formData.portfolio_url}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio_url: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Cover Letter *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    placeholder="Tell us why you'd be a great fit..."
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Careers;
