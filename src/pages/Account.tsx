
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { toast } from "@/hooks/use-toast";

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <SectionHeading title="My Account" centered={false} />
      
      <div className="max-w-3xl">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{user.user_metadata?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>
            
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Account;
