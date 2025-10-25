import React from 'react';
import { useForm } from 'react-hook-form';
import type { TResetPassword } from '../../types/auth.types';
import { Lock, KeyRound, ShieldCheck, ArrowRight } from 'lucide-react';
import ReusableInput from '../ReUsableComponent/InputField';

interface ResetPasswordProps {
  userId: string;
  onReset: (data: TResetPassword) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ userId, onReset }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TResetPassword>();

  const password = watch('newPassword');

  const onSubmit = async (data: TResetPassword) => {
    console.log('Form Input Data ::', data);
    onReset(data);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Create a new secure password for your account
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('userId')} value={userId} />
          <ReusableInput
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            register={register('oldPassword', { required: 'Current password is required' })}
            error={errors.oldPassword?.message}
            showToggle
          />
          <div>
            <ReusableInput
              label="New Password"
              type="password"
              placeholder="Create a new password"
              icon={<KeyRound className="w-5 h-5 text-gray-400" />}
              register={register('newPassword', {
                required: 'New password is required',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_@*!])[A-Za-z\d_@*!]{8,20}$/,
                  message: 'Password must be 8-20 chars with letters, numbers & special chars',
                },
              })}
              error={errors.newPassword?.message}
              showToggle
            />
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p className="flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                8-20 characters long
              </p>
              <p className="flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                Include letters, numbers & special chars (_@*!)
              </p>
            </div>
          </div>
          <ReusableInput
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter your new password"
            icon={<ShieldCheck className="w-5 h-5 text-gray-400" />}
            register={register('conPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
            error={errors.conPassword?.message}
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
                Updating...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex gap-3">
            <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-900">Security Tip</p>
              <p className="text-xs text-purple-700 mt-1">
                Use a unique password that you don't use anywhere else. Consider using a
                password manager to keep track of your passwords.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
