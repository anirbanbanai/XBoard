import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust the path as needed
import ButtonAll from '../button/Button';
import img1 from "../../image/signupin/Login.svg";

const ResetPin = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const query = new URLSearchParams(location.search);
  const oobCode = query.get('oobCode'); // Extract the oobCode from the query string

  async function handleResetPassword(data) {
    if (!oobCode) {
      alert('Invalid or expired action code');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, data.newPassword);
      alert('Password has been reset successfully');
      reset();
      navigate('/login'); // Use navigate to redirect to login page after successful reset
    } catch (error) {
      console.error('Error resetting password', error);
      alert('Failed to reset password');
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 bg-[#a4e8f9]">
      <div className="mx-auto flex items-center max-md:hidden">
        <img src={img1} alt="Reset Password" />
      </div>
      <div className="bg-[#eff4f5] p-3 rounded-xl">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <form className="card-body" onSubmit={handleSubmit(handleResetPassword)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered rounded-2xl"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <p className="text-red-500">New Password is required</p>
            )}
          </div>
          <ButtonAll type="submit">Reset Password</ButtonAll>
        </form>
      </div>
    </div>
  );
};

export default ResetPin;
