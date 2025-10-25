import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import type { TLoginUser, TLoginResult } from '../../types/auth.types';
import authService from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexxt/authContext';
import { LogIn, Mail, Lock, Image as ImageIcon, ArrowRight } from 'lucide-react';
import ReusableInput from '../ReUsableComponent/InputField';

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUser>();

  const onSubmit = async (data: TLoginUser) => {
    const res: TLoginResult = await authService.userLogin(data);
    if (res) {
      const { userData } = res;
      context?.login();
      localStorage.setItem('accessToken', res.accessToken);
      toast.success('Login Successfully');
      navigate('/user/profile', { state: userData });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 animate-gradient-xy"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <header className="w-full px-6 py-4 flex justify-between items-center bg-white/90 backdrop-blur-lg shadow-lg fixed top-0 z-20 border-b border-purple-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            RePix
          </h1>
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
        >
          Create Account
        </Link>
      </header>
      <div className="relative w-full max-w-md mx-4 mt-16 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to your gallery
          </p>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <ReusableInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              register={register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Enter a valid email',
                },
              })}
              error={errors.email?.message}
            />

            <ReusableInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              register={register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                  message:
                    'Password must be 8-20 characters with letters, numbers & special chars',
                },
              })}
              error={errors.password?.message}
              showToggle 
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to RePix?</span>
            </div>
          </div>
          <Link
            to="/register"
            className="block w-full text-center py-3 px-4 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl font-semibold transition-all duration-300 hover:border-purple-300"
          >
            Create an Account
          </Link>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-purple-600 hover:underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
