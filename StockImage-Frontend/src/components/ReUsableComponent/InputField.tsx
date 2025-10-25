// ReusableInput.tsx
import React, { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface ReusableInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  register: UseFormRegisterReturn;
  error?: string;
  showToggle?: boolean; // new prop
}

const ReusableInput: React.FC<ReusableInputProps> = ({
  label,
  type = 'text',
  placeholder,
  icon,
  register,
  error,
  showToggle = false, 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === 'password' && showToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2 text-sm">{label}</label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 
                     focus:border-transparent transition-all duration-300 
                     bg-gray-50 hover:bg-white"
          {...register}
        />

        {type === 'password' && showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors duration-300"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <span className="text-xs">⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default ReusableInput;
