
import { MainNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState } from "react";
import { User, Settings, ShoppingBag, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock user data - in a real app this would come from your auth context or API
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    address: "123 Art Street, Bangalore, India",
    bio: "Art enthusiast and collector of traditional Indian crafts"
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userData
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile update:", data);
    
    // Simulate API call to update profile
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved",
      });
    }, 500);
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    
    navigate("/");
  };
  
  // Mock order history
  const orders = [
    { id: "ORD-2025-001", date: "Apr 10, 2025", total: 12500, status: "Delivered" },
    { id: "ORD-2025-002", date: "Mar 25, 2025", total: 8750, status: "Processing" },
    { id: "ORD-2024-015", date: "Dec 15, 2024", total: 15000, status: "Delivered" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 bg-artful-primary text-white">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{userData.name}</h3>
                    <p className="text-sm text-white/80">{userData.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <Button
                      variant={activeTab === 'profile' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab('profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={activeTab === 'orders' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab('orders')}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Order History
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant={activeTab === 'settings' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveTab('settings')}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </li>
                  <li className="pt-4 border-t border-gray-100 mt-4">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-600 hover:text-red-500"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              {activeTab === 'profile' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for delivery updates
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Me</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormDescription>
                              Tell us about your interests in Indian arts and crafts
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Form>
                </>
              )}
              
              {activeTab === 'orders' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total.toLocaleString()}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {orders.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't placed any orders yet.</p>
                      <Button className="mt-4" onClick={() => navigate('/products')}>
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'settings' && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Manage your email preferences for order updates and promotions
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="order-updates"
                              name="order-updates"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-artful-primary rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <Label htmlFor="order-updates">Order updates</Label>
                            <p className="text-gray-500">Receive notifications about your order status</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="promotions"
                              name="promotions"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-artful-primary rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <Label htmlFor="promotions">Promotions and discounts</Label>
                            <p className="text-gray-500">Get notified about special offers and sales</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="new-products"
                              name="new-products"
                              type="checkbox"
                              defaultChecked={false}
                              className="h-4 w-4 text-artful-primary rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <Label htmlFor="new-products">New product announcements</Label>
                            <p className="text-gray-500">Be the first to know about new arrivals</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pb-6 border-b border-gray-200">
                      <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Permanent changes to your account
                      </p>
                      <div className="space-y-4">
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          Change Password
                        </Button>
                        <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-right">
                    <Button>Save Preferences</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
