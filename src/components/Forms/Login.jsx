import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ phone: "", otp: "" });
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {}
      );

      const res = await signInWithPhoneNumber(
        auth,
        input.phone,
        recaptchaVerifier
      );
      setConfirmationResult(res);
      console.log(res);
      setIsLoading(false);
      setStep(2);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const res = await confirmationResult.confirm(input.otp);
      console.log(res);

      localStorage.setItem("token", res.user.accessToken);
      localStorage.setItem("phone", res.user.phoneNumber);

      setIsLoading(false);

      navigate("/dashboard/overview");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="h-screen w-full flex items-center m-auto justify-center px-3">
      <form className="font-inter w-[400px]">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {step === 1 && (
          <div>
            <label className=" flex flex-col gap-2 mb-4">
              <span>Phone Number</span>
              <input
                onChange={handleChange}
                name="phone"
                type="text"
                placeholder="Enter Phone Number - +256705438524"
                className="px-1 py-2 focus:outline-none focus:border-b-primary border-b-2 border-b-gray-300 transition-all duration-150 ease-in-out"
              />
            </label>
            <button
              onClick={sendOTP}
              type="button"
              className="mt-3 font-bold bg-primary text-white rounded-full px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition-all duration-150 ease-in-out hover:bg-primary-dark"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            <div id="recaptcha-container"></div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="w-full flex flex-col gap-2 ">
              <span>OTP</span>
              <input
                onChange={handleChange}
                name="otp"
                type="password"
                placeholder="Enter OTP"
                className="px-1 py-2 focus:outline-none focus:border-b-primary border-b-2 border-b-gray-300 transition-all duration-150 border-transparent ease-in"
              />
            </label>
            <button
              onClick={verifyOTP}
              type="button"
              className="mt-3 font-bold bg-primary text-white rounded-full px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white transition-all duration-150 ease-in-out hover:bg-primary-dark"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
