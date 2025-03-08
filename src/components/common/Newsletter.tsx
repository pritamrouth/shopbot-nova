
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll now receive our latest offers and updates.",
    });
    
    setEmail("");
  };

  return (
    <div className="bg-black p-6 md:p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-white font-bold text-xl md:text-2xl text-center md:text-left">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full md:w-auto flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-white rounded-full min-w-[250px]"
            required
          />
          <Button 
            type="submit" 
            className="h-12 bg-white text-black hover:bg-gray-100 rounded-full px-6 font-medium"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
