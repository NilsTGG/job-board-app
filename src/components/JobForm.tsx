import React, { useState, useEffect } from "react";
import {
  Send,
  Package,
  MessageCircle,
  Diamond,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Shield,
  Calculator,
} from "lucide-react";
import AccessibleSelect from "./AccessibleSelect";
import { useForm, ValidationError } from "@formspree/react";
import {
  FORM_VALIDATION,
  UI_CONFIG,
  SERVICES,
  STORAGE_KEYS,
  ERROR_MESSAGES,
} from "../constants";
import { useDebounce } from "../hooks/useDebounce";
import { CoordinateInput, CoordinateTips } from "./CoordinateInput";
import DistanceDisplay from "./DistanceDisplay";
import { useDistanceCalculation } from "../utils/distanceCalculator";
import { DistanceCalculator } from "../utils/distanceCalculator";

const JobForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Essential fields (always visible)
    ign: "",
    discordUsername: "",
    itemDescription: "",
    pickupCoords: "",
    dropoffCoords: "",
    paymentOffer: "",

    // Smart defaults
    contactMethod: "discord",
    urgency: "soon",
    insurance: "basic",
    itemQuantity: "64",

    // Optional fields (progressive disclosure)
    contactName: "",
    deadline: "",
    notes: "",
    itemType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Formspree integration
  const [state, handleSubmit] = useForm("xqabvypp");

  // Debounce form data for validation and auto-save
  const debouncedFormData = useDebounce(formData, UI_CONFIG.DEBOUNCE_DELAY);

  // Options for accessible selects
  const urgencyOptions = SERVICES.URGENCY_OPTIONS;
  const insuranceOptions = SERVICES.INSURANCE_OPTIONS;
  const contactOptions = SERVICES.CONTACT_OPTIONS;

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEYS.FORM_DRAFT);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn("Failed to load saved form data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.FORM_DRAFT,
      JSON.stringify(debouncedFormData)
    );
  }, [debouncedFormData]);

  // Smart validation with contextual messages
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Discord username validation (new Discord rules)
    if (!formData.discordUsername.trim()) {
      newErrors.discordUsername = ERROR_MESSAGES.FORM.REQUIRED_FIELD;
    } else if (
      !FORM_VALIDATION.DISCORD.PATTERN.test(formData.discordUsername.trim())
    ) {
      newErrors.discordUsername = FORM_VALIDATION.DISCORD.ERROR_MESSAGE;
    }

    // IGN validation with helpful suggestions
    if (!formData.ign.trim()) {
      newErrors.ign = ERROR_MESSAGES.FORM.REQUIRED_FIELD;
    } else if (!FORM_VALIDATION.USERNAME.PATTERN.test(formData.ign.trim())) {
      newErrors.ign = FORM_VALIDATION.USERNAME.ERROR_MESSAGE;
    }

    // Item description with smart suggestions
    if (!formData.itemDescription.trim()) {
      newErrors.itemDescription = "What should I deliver?";
    } else if (
      formData.itemDescription.trim().length <
      FORM_VALIDATION.ITEM_DESCRIPTION.MIN_LENGTH
    ) {
      newErrors.itemDescription =
        FORM_VALIDATION.ITEM_DESCRIPTION.ERROR_MESSAGE;
    }

    // Coordinate validation with format help
    if (!formData.pickupCoords.trim()) {
      newErrors.pickupCoords = "Where should I pick up the items?";
    } else if (
      !FORM_VALIDATION.COORDINATES.PATTERN.test(
        formData.pickupCoords.replace(/[XYZxyz:\s]/g, "")
      )
    ) {
      newErrors.pickupCoords = FORM_VALIDATION.COORDINATES.ERROR_MESSAGE;
    }

    if (!formData.dropoffCoords.trim()) {
      newErrors.dropoffCoords = "Where should I deliver the items?";
    } else if (
      !FORM_VALIDATION.COORDINATES.PATTERN.test(
        formData.dropoffCoords.replace(/[XYZxyz:\s]/g, "")
      )
    ) {
      newErrors.dropoffCoords = FORM_VALIDATION.COORDINATES.ERROR_MESSAGE;
    }

    // Payment validation with suggestions
    if (!formData.paymentOffer.trim()) {
      newErrors.paymentOffer = "How much are you offering?";
    } else if (
      !FORM_VALIDATION.PAYMENT_OFFER.PATTERN.test(formData.paymentOffer)
    ) {
      newErrors.paymentOffer = FORM_VALIDATION.PAYMENT_OFFER.ERROR_MESSAGE;
    }

    // Quantity validation
    if (
      formData.itemQuantity &&
      (isNaN(Number(formData.itemQuantity)) ||
        Number(formData.itemQuantity) <= 0)
    ) {
      newErrors.itemQuantity = "Quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Smart price calculator
  const calculateEstimatedCost = () => {
    const quantity = parseInt(formData.itemQuantity) || 64;
    const urgency = formData.urgency;
    const insurance = formData.insurance;

    // Base cost: 3 diamonds minimum, +1 per stack
    let baseCost = Math.max(3, Math.ceil(quantity / 64) + 2);

    // Urgency multipliers
    const urgencyMultipliers = {
      "not-urgent": 0.8,
      soon: 1,
      urgent: 1.5,
      "life-or-death": 2,
    };

    baseCost *=
      urgencyMultipliers[urgency as keyof typeof urgencyMultipliers] || 1;

    // Insurance costs
    if (insurance === "premium") baseCost += 5;
    if (insurance === "basic") baseCost += 2;

    return Math.ceil(baseCost);
  };

  // Remove custom handleSubmit, use Formspree's handleSubmit instead

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Auto-format coordinates
  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Auto-format common coordinate patterns
    let formatted = value;
    if (value.match(/^\d+\s+\d+\s+\d+$/)) {
      formatted = value.replace(/\s+/g, ", ");
    }
    setFormData((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const initialFormData = {
    ign: "",
    discordUsername: "",
    itemDescription: "",
    pickupCoords: "",
    dropoffCoords: "",
    paymentOffer: "",
    contactMethod: "discord",
    urgency: "soon",
    insurance: "basic",
    itemQuantity: "64",
    contactName: "",
    deadline: "",
    notes: "",
    itemType: "",
  };

  const [formKey, setFormKey] = useState(0);

  if (state.succeeded) {
    return (
      <section id="submit-job" className="py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Job Submitted Successfully!
            </h3>
            <p className="text-gray-400 mb-6">
              Your delivery request has been received. I'll get to it when I get
              to it. Check Discord for updates!
            </p>
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-white font-medium mb-2">
                What happens next:
              </h4>
              <ul className="text-gray-300 text-sm space-y-1 text-left">
                <li>• I'll review your request within 30 minutes</li>
                <li>• You'll get a Discord message with pickup details</li>
                <li>• Payment is due when I arrive at pickup location</li>
                <li>• Delivery confirmation sent when complete</li>
              </ul>
            </div>
            <button
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                setFormData(initialFormData);
                setErrors({});
                setCurrentStep(1);
                setFormKey((k) => k + 1);
                localStorage.removeItem("jobForm_draft");
                localStorage.removeItem(STORAGE_KEYS.FORM_DRAFT);
                // Reset Formspree state by reloading the component
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Submit another job
            </button>
          </div>
        </div>
      </section>
    );
  }

  const completedFields = Object.entries(formData).filter(([key, value]) => {
    if (["contactMethod", "urgency", "insurance"].includes(key)) return true; // Smart defaults
    return value.trim() !== "";
  }).length;

  const totalFields = Object.keys(formData).length;
  const progress = (completedFields / totalFields) * 100;

  return (
    <section id="submit-job" className="py-20 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Submit Your Job
          </h2>
          <p className="text-xl text-gray-400">
            Quick form - only the essentials required
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep !== 2) {
              setCurrentStep(2);
              setErrors((prev) => ({
                ...prev,
                form: "Please complete Step 2 before submitting.",
              }));
              return;
            }
            if (validateForm()) {
              handleSubmit(e);
            }
          }}
          method="POST"
          className="bg-gray-800 rounded-lg p-8 border border-gray-700"
        >
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Step Navigation */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentStep === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setCurrentStep(1)}
              >
                Step 1
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  currentStep === 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => {
                  if (validateForm()) {
                    setCurrentStep(2);
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      form: "Please complete all required fields in Step 1 before proceeding.",
                    }));
                  }
                }}
              >
                Step 2
              </button>
            </div>
            {/* Step 1: Essential Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Essential Information
                </h3>

                {/* Discord Username Field */}
                <div>
                  <label
                    htmlFor="discordUsername"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Discord Username *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="discordUsername"
                      name="discordUsername"
                      value={formData.discordUsername}
                      onChange={(e) => {
                        const lowerValue = e.target.value.toLowerCase();
                        setFormData((prev) => ({
                          ...prev,
                          discordUsername: lowerValue,
                        }));
                        // Immediate validation for Discord username
                        let error = "";
                        if (!lowerValue.trim()) {
                          error = "Discord username is required";
                        } else if (
                          !/^(?!.*\.\.)([a-z0-9._]{2,32})$/.test(
                            lowerValue.trim()
                          )
                        ) {
                          error =
                            "2-32 chars, lowercase letters, numbers, periods/underscores, no consecutive periods";
                        }
                        setErrors((prev) => ({
                          ...prev,
                          discordUsername: error,
                        }));
                      }}
                      onBlur={(e) => {
                        // Validate again on blur
                        const lowerValue = e.target.value.toLowerCase();
                        let error = "";
                        if (!lowerValue.trim()) {
                          error = "Discord username is required";
                        } else if (
                          !/^(?!.*\.\.)([a-z0-9._]{2,32})$/.test(
                            lowerValue.trim()
                          )
                        ) {
                          error =
                            "2-32 chars, lowercase letters, numbers, periods/underscores, no consecutive periods";
                        }
                        setErrors((prev) => ({
                          ...prev,
                          discordUsername: error,
                        }));
                      }}
                      aria-invalid={!!errors.discordUsername}
                      required
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                        errors.discordUsername
                          ? "border-red-500"
                          : "border-gray-600"
                      }`}
                      placeholder="Enter your Discord username (lowercase, 2-32 chars, a-z, 0-9, . and _)"
                    />
                    <MessageCircle className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.discordUsername && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.discordUsername}
                    </p>
                  )}
                </div>
                {/* IGN Field */}
                <div>
                  <label
                    htmlFor="ign"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Minecraft Username *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="ign"
                      name="ign"
                      value={formData.ign}
                      onChange={handleChange}
                      aria-invalid={!!errors.ign}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.ign ? "border-red-500" : "border-gray-600"
                      }`}
                      placeholder="YourMinecraftUsername"
                    />
                    <MessageCircle className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.ign && (
                    <p className="text-red-400 text-sm mt-1">{errors.ign}</p>
                  )}
                </div>

                {/* Item Description */}
                <div>
                  <label
                    htmlFor="itemDescription"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    What do you need? (Delivery or Shopping Service) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="itemDescription"
                      name="itemDescription"
                      value={formData.itemDescription}
                      onChange={handleChange}
                      aria-invalid={!!errors.itemDescription}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.itemDescription
                          ? "border-red-500"
                          : "border-gray-600"
                      }`}
                      placeholder="e.g., 'Deliver: 64 oak logs' or 'Buy me: diamond pickaxe from spawn shops'"
                    />
                    <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.itemDescription && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.itemDescription}
                    </p>
                  )}
                </div>

                {/* Coordinates Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pickupCoords"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Pickup Location *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="pickupCoords"
                        name="pickupCoords"
                        value={formData.pickupCoords}
                        onChange={handleCoordChange}
                        aria-invalid={!!errors.pickupCoords}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.pickupCoords
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                        placeholder="100, 64, -200"
                      />
                      {/* MapPin icon was missing import, replace with Package for consistency */}
                      <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.pickupCoords && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.pickupCoords}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dropoffCoords"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Delivery Location *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="dropoffCoords"
                        name="dropoffCoords"
                        value={formData.dropoffCoords}
                        onChange={handleCoordChange}
                        aria-invalid={!!errors.dropoffCoords}
                        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.dropoffCoords
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                        placeholder="300, 64, 150"
                      />
                      {/* MapPin icon was missing import, replace with Package for consistency */}
                      <Package className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.dropoffCoords && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.dropoffCoords}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment Offer */}
                <div>
                  <label
                    htmlFor="paymentOffer"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Payment Offer *
                    <button
                      type="button"
                      onClick={() =>
                        setShowPriceCalculator(!showPriceCalculator)
                      }
                      className="ml-2 text-blue-400 hover:text-blue-300 text-xs"
                    >
                      <Calculator className="h-4 w-4 inline" /> Price Calculator
                    </button>
                  </label>

                  {showPriceCalculator && (
                    <div className="mb-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                      <div className="text-sm text-blue-400 mb-2">
                        Estimated Cost: {calculateEstimatedCost()} diamonds
                      </div>
                      <div className="text-xs text-gray-400">
                        Based on:{" "}
                        {Math.ceil(
                          parseInt(formData.itemQuantity || "64") / 64
                        )}{" "}
                        stack(s), {formData.urgency} urgency,{" "}
                        {formData.insurance} insurance
                      </div>
                      <div className="text-xs text-blue-300 mt-2 italic">
                        💡 Time saved: ~
                        {Math.ceil(
                          parseInt(formData.itemQuantity || "64") / 64
                        ) * 15}{" "}
                        minutes of boring transport work
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="text"
                      id="paymentOffer"
                      name="paymentOffer"
                      value={formData.paymentOffer}
                      onChange={handleChange}
                      aria-invalid={!!errors.paymentOffer}
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.paymentOffer
                          ? "border-red-500"
                          : "border-gray-600"
                      }`}
                      placeholder="e.g., 5 diamonds, 10 diamonds"
                    />
                    <Diamond className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.paymentOffer && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.paymentOffer}
                    </p>
                  )}
                </div>
              </div>
            )}
            {/* Smart Defaults Section */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                  Service Options
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AccessibleSelect
                    id="urgency"
                    label="Urgency"
                    options={urgencyOptions}
                    value={formData.urgency}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, urgency: value }))
                    }
                    searchable={false}
                  />

                  <AccessibleSelect
                    id="insurance"
                    label="Insurance"
                    options={insuranceOptions}
                    value={formData.insurance}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, insurance: value }))
                    }
                    searchable={false}
                  />
                  {/* Removed unnecessary icon-only column for conciseness */}

                  <div>
                    <label
                      htmlFor="itemQuantity"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="itemQuantity"
                      name="itemQuantity"
                      value={formData.itemQuantity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="64"
                      min="1"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {formData.itemQuantity &&
                        `~${Math.ceil(
                          parseInt(formData.itemQuantity) / 64
                        )} stack(s)`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progressive Disclosure - Advanced Options */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                Advanced Options (Optional)
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AccessibleSelect
                      id="contactMethod"
                      label="Preferred Contact Method"
                      options={contactOptions}
                      value={formData.contactMethod}
                      onChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactMethod: value,
                        }))
                      }
                      searchable={false}
                    />

                    <div>
                      <label
                        htmlFor="deadline"
                        className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2"
                      >
                        Deadline <Clock className="h-4 w-4 text-blue-400" />
                      </label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Special Instructions
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Any special instructions, dangers, or notes..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {(formData.itemDescription || formData.paymentOffer) && (
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-medium">Order Summary</span>
                </div>
                <div className="space-y-2 text-sm">
                  {formData.itemDescription && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Items:</span>
                      <span className="text-white">
                        {formData.itemDescription}
                      </span>
                    </div>
                  )}
                  {formData.itemQuantity && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Quantity:</span>
                      <span className="text-white">
                        {formData.itemQuantity} items
                        <span className="text-gray-400 text-xs ml-1">
                          (~{Math.ceil(parseInt(formData.itemQuantity) / 64)}{" "}
                          stacks)
                        </span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-300">Service:</span>
                    <span className="text-white capitalize">
                      {formData.urgency.replace("-", " ")} •{" "}
                      {formData.insurance} insurance
                    </span>
                  </div>
                  {formData.paymentOffer && (
                    <div className="flex justify-between border-t border-gray-600 pt-2">
                      <span className="text-gray-300">Payment:</span>
                      <span className="text-blue-400 font-medium">
                        {formData.paymentOffer}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hidden required fields from Step 1 for submission */}
            {currentStep === 2 && (
              <>
                <input
                  type="hidden"
                  name="discordUsername"
                  value={formData.discordUsername}
                />
                <input type="hidden" name="ign" value={formData.ign} />
                <input
                  type="hidden"
                  name="itemDescription"
                  value={formData.itemDescription}
                />
                <input
                  type="hidden"
                  name="pickupCoords"
                  value={formData.pickupCoords}
                />
                <input
                  type="hidden"
                  name="dropoffCoords"
                  value={formData.dropoffCoords}
                />
                <input
                  type="hidden"
                  name="paymentOffer"
                  value={formData.paymentOffer}
                />
              </>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={state.submitting}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 ${
                state.submitting
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:scale-105 shadow-lg"
              }`}
            >
              {state.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Your Request...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Job Request
                </>
              )}
            </button>
            <ValidationError
              prefix="Job"
              field="discordUsername"
              errors={state.errors}
            />
            <ValidationError prefix="Job" field="ign" errors={state.errors} />
            <ValidationError
              prefix="Job"
              field="itemDescription"
              errors={state.errors}
            />
            <ValidationError
              prefix="Job"
              field="pickupCoords"
              errors={state.errors}
            />
            <ValidationError
              prefix="Job"
              field="dropoffCoords"
              errors={state.errors}
            />
            <ValidationError
              prefix="Job"
              field="paymentOffer"
              errors={state.errors}
            />
            {/* Help Tips */}
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">
                    Quick Tips:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>
                      • <strong>Delivery:</strong> You have items, I move them.
                      Payment due at pickup.
                    </li>
                    <li>
                      • <strong>Shopping:</strong> I buy items for you. You pay
                      me back + service fee.
                    </li>
                    <li>
                      • <strong>Time Value:</strong> Your gaming time {">"}{" "}
                      diamond cost. Focus on building, not hauling.
                    </li>
                    <li>
                      • <strong>Coordinates:</strong> Use F3 for exact location
                      (X Y Z format)
                    </li>
                    <li>
                      • <strong>Dangerous areas:</strong> Nether/End/PvP zones
                      cost extra (danger tax)
                    </li>
                    <li>
                      • <strong>Multi-shop runs:</strong> List all shops for
                      bulk coordination discounts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JobForm;
