import React, { useEffect, useState } from "react";

function App() {
  const [piUser, setPiUser] = useState(null);

  useEffect(() => {
    // Ensure Pi SDK is available in Pi Browser
    if (window.Pi) {
      window.Pi.init({ version: "2.0" });
    }
  }, []);

  const signIn = async () => {
    try {
      const scopes = ["username", "payments"];
      const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setPiUser(authResult.user);
    } catch (err) {
      console.error(err);
    }
  };

  function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment found:", payment);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">🚀 InsanePi Dev App</h1>
      {!piUser ? (
        <button
          onClick={signIn}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700"
        >
          Sign in with Pi
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow p-4 mt-4">
          <p className="text-lg">Welcome, <b>{piUser.username}</b> 🎉</p>

          <p className="text-gray-600 text-sm mt-2">User ID: {piUser.uid}</p>
        </div>
      )}
    </div>
  );
}

export default App;
