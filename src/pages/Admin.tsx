import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth, admin } from "@/lib/api";

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [careerApplications, setCareerApplications] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const user = await auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user has admin or hr role
      const { isAdmin: hasAdminAccess } = await admin.checkAdmin();

      if (!hasAdminAccess) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Load contact submissions
      const { data: contacts } = await admin.getContacts();
      setContactSubmissions(contacts || []);

      // Load career applications
      const { data: careers } = await admin.getCareers();
      setCareerApplications(careers || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Admin Dashboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage contact submissions and career applications
            </p>
          </div>

          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="contacts">
                Contact Submissions ({contactSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="careers">
                Career Applications ({careerApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>
                    All inquiries received through the contact form
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {contactSubmissions.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No contact submissions yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {new Date(submission.created_at).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {submission.name}
                              </TableCell>
                              <TableCell>
                                <a
                                  href={`mailto:${submission.email}`}
                                  className="flex items-center gap-2 text-primary hover:underline"
                                >
                                  <Mail className="h-4 w-4" />
                                  {submission.email}
                                </a>
                              </TableCell>
                              <TableCell>
                                {submission.phone ? (
                                  <a
                                    href={`tel:${submission.phone}`}
                                    className="flex items-center gap-2 text-primary hover:underline"
                                  >
                                    <Phone className="h-4 w-4" />
                                    {submission.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell className="max-w-md">
                                <p className="line-clamp-2">{submission.message}</p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="careers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Career Applications</CardTitle>
                  <CardDescription>
                    All applications received through the careers page
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {careerApplications.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No career applications yet
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Links</TableHead>
                            <TableHead>Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {careerApplications.map((application) => (
                            <TableRow key={application.id}>
                              <TableCell className="whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  {new Date(application.created_at).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {application.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{application.position}</Badge>
                              </TableCell>
                              <TableCell>
                                <a
                                  href={`mailto:${application.email}`}
                                  className="flex items-center gap-2 text-primary hover:underline"
                                >
                                  <Mail className="h-4 w-4" />
                                  {application.email}
                                </a>
                              </TableCell>
                              <TableCell>
                                {application.phone ? (
                                  <a
                                    href={`tel:${application.phone}`}
                                    className="flex items-center gap-2 text-primary hover:underline"
                                  >
                                    <Phone className="h-4 w-4" />
                                    {application.phone}
                                  </a>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  {application.resume_url && (
                                    <a
                                      href={application.resume_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Resume
                                    </a>
                                  )}
                                  {application.portfolio_url && (
                                    <a
                                      href={application.portfolio_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                      <FileText className="h-4 w-4" />
                                      Portfolio
                                    </a>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="max-w-md">
                                {application.message ? (
                                  <p className="line-clamp-2">{application.message}</p>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
