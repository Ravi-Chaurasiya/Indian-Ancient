
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // This would normally connect to your authentication service
    console.log("Login attempt with:", data);
    
    // For demo purposes, we'll simulate a successful login
    toast({
      title: "Login Successful!",
      description: "Welcome back to Indiancient Arts & Craft",
    });
    
    // Redirect to home page after login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          type="email" 
                          autoComplete="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"} 
                            autoComplete="current-password" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm font-medium text-artful-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-artful-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
