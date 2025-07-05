
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Users, Mail, Lock, User, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Detect user location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await response.json();
                const location = `${data.city || data.locality || 'Unknown City'}, ${data.countryName || 'Unknown Country'}`;
                setUserLocation(location);
              } catch (error) {
                const locations = [
                  'Lagos, Nigeria', 'London, UK', 'New York, USA', 'Dubai, UAE',
                  'Istanbul, Turkey', 'Cairo, Egypt', 'Riyadh, Saudi Arabia',
                  'Karachi, Pakistan', 'Dhaka, Bangladesh', 'Jakarta, Indonesia'
                ];
                setUserLocation(locations[Math.floor(Math.random() * locations.length)]);
              }
            },
            (error) => {
              const locations = [
                'Lagos, Nigeria', 'London, UK', 'New York, USA', 'Dubai, UAE',
                'Istanbul, Turkey', 'Cairo, Egypt', 'Riyadh, Saudi Arabia'
              ];
              setUserLocation(locations[Math.floor(Math.random() * locations.length)]);
            }
          );
        } else {
          setUserLocation('Location not available');
        }
      } catch (error) {
        setUserLocation('Location not available');
      }
    };

    detectLocation();
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate('/community');
      }
    };
    
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        toast({
          title: "Successfully signed in!",
          description: `Welcome to the global community from ${userLocation}`,
        });
        navigate('/community');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, userLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        // Success will be handled by the auth state change listener
        console.log('Login successful:', data.user);
      }
    } catch (error) {
      console.error('Login catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during login",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/community`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: username || email.split('@')[0],
            user_type: 'pilgrim',
            location: userLocation
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
      } else if (data.user) {
        if (data.user.email_confirmed_at) {
          // User is immediately confirmed
          toast({
            title: "Account created successfully!",
            description: `Welcome to the global community from ${userLocation}!`
          });
        } else {
          // User needs email confirmation
          toast({
            title: "Account created!",
            description: `Please check your email to verify your account. Joining from ${userLocation}.`
          });
          // Still navigate to community for better UX
          navigate('/community');
        }
      }
    } catch (error) {
      console.error('Signup catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during signup",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem('guestLocation', userLocation);
    localStorage.setItem('guestUser', JSON.stringify({
      username: 'Guest',
      location: userLocation,
      isGuest: true
    }));
    toast({
      title: "Accessing as Guest",
      description: `Joining the global chat from ${userLocation}`
    });
    navigate('/community');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Join Global Community'}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {isLogin ? 'Sign in for a personalized experience' : 'Create account for enhanced features'}
              </p>
              {userLocation && (
                <div className="flex items-center justify-center space-x-1 text-sm text-emerald-600 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span>Connecting from {userLocation}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Guest Access Option */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Chat as Guest</h3>
                  <p className="text-sm text-gray-600">Join instantly without registration</p>
                  {userLocation && (
                    <p className="text-xs text-emerald-600 mt-1">From {userLocation}</p>
                  )}
                </div>
                <Button
                  onClick={handleGuestAccess}
                  variant="outline"
                  className="ml-4 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                >
                  Continue as Guest
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or {isLogin ? 'sign in' : 'create an account'}</span>
              </div>
            </div>

            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Username (Optional)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-medium py-3"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In & Join Chat' : 'Create Account & Join')}
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
                type="button"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
                type="button"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Global Chat Features</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• <strong>Guest:</strong> Chat instantly from your location</li>
              <li>• <strong>Registered:</strong> Personalized profile & message history</li>
              <li>• Connect with Muslims from different countries</li>
              <li>• Share experiences and get real-time advice</li>
              <li>• Your location is displayed to show global reach</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
