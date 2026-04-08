import { Link, useLocation } from 'react-router';
import { Home, Heart, Upload, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/my-pets', label: 'My Pets', icon: Heart },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="size-6 text-pink-500 fill-pink-500" />
            <span className="font-semibold text-xl">PetGram</span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'text-pink-500 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="hidden lg:inline text-sm text-gray-600">
                  {user?.username}
                </span>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-pink-500"
                >
                  <LogOut className="size-5" />
                  <span className="hidden md:inline ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}