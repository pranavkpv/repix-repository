import React from 'react';
import { useForm } from 'react-hook-form';
import type { TRegisterFormInput } from '../types/auth.types';
import authService from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Phone, User, Image as ImageIcon, ArrowRight, CheckCircle } from 'lucide-react';
import ReusableInput from './ReUsableComponent/InputField';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormInput>();

  const onSubmit = async (data: TRegisterFormInput) => {
    const status = await authService.userRegister(data);
    if (status === 201) {
      console.log('Reached back to register');
      toast.success('User Successfully registered!');
      navigate('/login');
    } else {
      toast.error('Error occurred!');
    }
  };

  const password = watch('password');

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden py-12">
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
          to="/login"
          className="px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
        >
          Sign In
        </Link>
      </header>

      {/* Register Card */}
      <div className="relative w-full max-w-md mx-4 mt-20 z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20">
          {/* Icon header */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-3 transition-transform duration-300">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join RePix and start organizing your photos
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <ReusableInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={<User className="w-5 h-5 text-gray-400" />}
              register={register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
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
              label="Phone Number"
              type="tel"
              placeholder="0000000000"
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              register={register('phone', {
                required: 'Phone number is required',
                minLength: { value: 10, message: 'Must be at least 10 digits' },
              })}
              error={errors.phone?.message}
            />
            <ReusableInput
              label="Password"
              type="password"
              placeholder="Create a strong password"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              register={register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                  message: 'Password must be 8-20 chars with letters, numbers & special chars',
                },
              })}
              error={errors.password?.message}
              showToggle
            />

            <ReusableInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              icon={<CheckCircle className="w-5 h-5 text-gray-400" />}
              register={register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
              showToggle
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full text-center py-3 px-4 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl font-semibold transition-all duration-300 hover:border-purple-300"
          >
            Sign In Instead
          </Link>

          {/* Footer text */}
          <p className="text-center text-xs text-gray-500 mt-6">
            By creating an account, you agree to our{' '}
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

export default Register;
