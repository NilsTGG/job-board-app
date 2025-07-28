import { useState } from "react";

type FormData = Record<string, any>;

export function useDeliveryStore() {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setSubmitting] = useState(false);

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFormData({});
    setSubmitting(false);
  };

  const trackJobSubmission = () => {
    // Minimal stub for compatibility
  };

  return {
    formData,
    updateFormData,
    resetForm,
    isSubmitting,
    setSubmitting,
    trackJobSubmission,
  };
}