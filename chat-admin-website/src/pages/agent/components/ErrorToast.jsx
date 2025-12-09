import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ErrorToast = ({ error, setError }) => (
  <div className="fixed top-4 right-4 bg-red-50 border border-red-300 text-red-700 shadow-lg px-4 py-3 rounded-lg flex items-center gap-3 z-50">
    <AlertTriangle size={20} className="text-red-600" />

    <span className="font-medium">{error}</span>

    <button
      onClick={() => setError(null)}
      className="ml-2 text-red-600 hover:text-red-800"
    >
      <X size={18} />
    </button>
  </div>
);

export default ErrorToast;
