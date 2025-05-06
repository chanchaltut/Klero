import React, { useState } from "react";

const CicladeSubmission = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [step, setStep] = useState("login"); // 'login' | 'verify'
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulated API call (replace with real API)
  const apiCall = async (url, body) => {
    setLoading(true);
    setMessage("");
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    // Simulated logic
    if (url === "/api/ciclade/login") {
      if (password === "correctpassword") {
        // Simulate: if cookies/session exist, skip verification
        if (email === "hascookie@demo.com") {
          return { status: "success" };
        }
        return { status: "verification_required" };
      }
      return { status: "failed", error: "Invalid credentials" };
    }
    if (url === "/api/ciclade/verify") {
      if (verificationCode === "123456") {
        return { status: "success" };
      }
      return { status: "failed", error: "Invalid verification code" };
    }
    return { status: "failed", error: "Unknown error" };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await apiCall("/api/ciclade/login", {
      email,
      password,
      saveCredentials,
    });
    if (res.status === "verification_required") {
      setStep("verify");
      setMessage("Enter the verification code sent to your email.");
    } else if (res.status === "success") {
      setMessage("Login successful! You are connected to Ciclade.");
    } else {
      setMessage(res.error || "Login failed.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await apiCall("/api/ciclade/verify", {
      email,
      verificationCode,
    });
    if (res.status === "success") {
      setMessage("Verification successful! Your Ciclade account is now connected.");
      setStep("login");
    } else {
      setMessage(res.error || "Verification failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Ciclade Submission</h2>
      <form onSubmit={step === "login" ? handleLogin : handleVerify}>
        <div className="mb-3">
          <label className="block text-xs font-medium mb-1">Ciclade Email</label>
          <input
            type="email"
            className="w-full border px-2 py-1 rounded text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={step === "verify"}
          />
        </div>
        <div className="mb-3">
          <label className="block text-xs font-medium mb-1">Ciclade Password</label>
          <input
            type="password"
            className="w-full border px-2 py-1 rounded text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={step === "verify"}
          />
        </div>
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="saveCredentials"
            checked={saveCredentials}
            onChange={(e) => setSaveCredentials(e.target.checked)}
            disabled={step === "verify"}
          />
          <label htmlFor="saveCredentials" className="ml-2 text-xs">
            Save ID and Password for automatic submission
          </label>
        </div>
        {step === "verify" && (
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Verification Code</label>
            <input
              type="text"
              className="w-full border px-2 py-1 rounded text-sm"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold mt-2"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : step === "login"
            ? "Submit"
            : "Verify"}
        </button>
      </form>
      {message && (
        <div className="mt-4 text-sm text-center text-indigo-700">{message}</div>
      )}
      <div className="mt-4 text-xs text-gray-500">
        {step === "login"
          ? "Enter your Ciclade credentials. If correct, you will be asked for a verification code."
          : "Enter the verification code sent to your email."}
        <br />
        If you save your credentials, your case will be submitted automatically next time.
        If you have cookies, you won't be asked for a verification code on next login.
      </div>
    </div>
  );
};

export default CicladeSubmission; 