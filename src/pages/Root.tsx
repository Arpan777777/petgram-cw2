import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';

export default function Root() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Outlet />
    </div>
  );
}
