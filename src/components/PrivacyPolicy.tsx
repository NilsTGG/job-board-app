// src/components/PrivacyPolicy.tsx
import React from "react";

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-900">
    <h2 className="text-2xl font-bold mb-4">Privacy Policy & Disclaimer</h2>
    <p className="mb-4">
      <strong>What data is collected?</strong>
      <br />
      When you submit a job, we collect your Discord username, Minecraft username, and delivery details (such as coordinates and item information).
    </p>
    <p className="mb-4">
      <strong>How is your data used?</strong>
      <br />
      Submission data is sent to Formspree for processing and then relayed to a Discord webhook for delivery coordination.
    </p>
    <p className="mb-4">
      <strong>Data storage and visibility</strong>
      <br />
      No data is stored on this website or its server. However, your submission may be visible to Discord server administrators and staff for the purpose of fulfilling your request.
    </p>
    <p className="mb-4">
      <strong>Your privacy</strong>
      <br />
      We respect your privacy and only use your information to process your delivery. We do not sell or share your data with third parties outside the delivery process. By submitting a job, you consent to this handling of your data.
    </p>
    <p className="text-xs text-gray-500 mt-6">
      For questions about your data or this policy, please contact the server administrator.
    </p>
  </div>
);

export default PrivacyPolicy;