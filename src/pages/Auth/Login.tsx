import { Link } from 'react-router-dom';
import Input from '../../componens/common/Input';
import Button from '../../componens/common/Button';

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h1>
      <p className="text-gray-500 text-sm mb-8">Welcome back to StayEase.</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <div className="border border-gray-200 rounded-lg">
            <Input type="email" placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <div className="border border-gray-200 rounded-lg">
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="text-sm text-gray-500 text-center mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;