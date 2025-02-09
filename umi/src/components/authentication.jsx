import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const toggleAuth = () => setIsSignUp(!isSignUp);

  const handleAuth = () => {
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-lg rounded-lg bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? "Sign Up" : "Log In"}</h2>
          <Input type="email" placeholder="Email" className="mb-2" />
          <Input type="password" placeholder="Password" className="mb-2" />
          {isSignUp && <Input type="text" placeholder="Full Name" className="mb-2" />}
          <Button onClick={handleAuth} className="w-full mt-4">
            {isSignUp ? "Sign Up" : "Log In"}
          </Button>
          <p className="text-sm text-center mt-4">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button onClick={toggleAuth} className="text-blue-500">
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold">Welcome to Unified Medical Interface</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}