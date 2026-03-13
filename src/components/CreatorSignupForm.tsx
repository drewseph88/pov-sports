"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const SPORTS_OPTIONS = [
  "Basketball",
  "Football",
  "Soccer",
  "UFC / MMA",
  "Hockey",
  "Baseball",
  "Other",
];

const FREQUENCY_OPTIONS = [
  { value: "", label: "Select frequency" },
  { value: "occasionally", label: "Occasionally (a few times a year)" },
  { value: "monthly", label: "A few times a month" },
  { value: "weekly", label: "Weekly or more" },
];

interface FormData {
  name: string;
  email: string;
  socialHandles: string;
  cities: string;
  sports: string[];
  teams: string;
  frequency: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  socialHandles?: string;
  cities?: string;
  sports?: string;
  teams?: string;
  frequency?: string;
}

export default function CreatorSignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    socialHandles: "",
    cities: "",
    sports: [],
    teams: "",
    frequency: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.socialHandles.trim()) {
      newErrors.socialHandles = "Social handle(s) required";
    }

    if (!formData.cities.trim()) {
      newErrors.cities = "City is required";
    }

    if (formData.sports.length === 0) {
      newErrors.sports = "Please select at least one sport";
    }

    if (!formData.teams.trim()) {
      newErrors.teams = "Teams are required";
    }

    if (!formData.frequency) {
      newErrors.frequency = "Please select how often you attend games";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSportChange = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
    if (errors.sports) {
      setErrors((prev) => ({ ...prev, sports: undefined }));
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("creator_signups")
        .insert({
          name: formData.name,
          email: formData.email,
          social_handles: formData.socialHandles,
          cities: formData.cities,
          sports: formData.sports,
          teams: formData.teams,
          frequency: formData.frequency,
        });

      if (error) {
        throw new Error(error.message);
      }

      router.push("/creators/success");
    } catch (error) {
      setErrors({
        name: error instanceof Error ? error.message : "An error occurred. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="First and last name"
          className={`w-full px-4 py-3 bg-surface border ${
            errors.name ? "border-red-500" : "border-border"
          } rounded-[12px] text-white placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="you@email.com"
          className={`w-full px-4 py-3 bg-surface border ${
            errors.email ? "border-red-500" : "border-border"
          } rounded-[12px] text-white placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors`}
        />
        <p className="mt-2 text-xs text-text-muted">
          We&apos;ll use this to contact you about POV, creator access, and opportunities.
        </p>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Social Handles */}
      <div>
        <label htmlFor="socialHandles" className="block text-sm font-medium text-white mb-2">
          Social Handle(s) <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="socialHandles"
          value={formData.socialHandles}
          onChange={(e) => handleInputChange("socialHandles", e.target.value)}
          placeholder="@yourhandle or @handle1, @handle2"
          className={`w-full px-4 py-3 bg-surface border ${
            errors.socialHandles ? "border-red-500" : "border-border"
          } rounded-[12px] text-white placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors`}
        />
        <p className="mt-2 text-xs text-text-muted">
          So we can find, credit, and verify your POV content.
        </p>
        {errors.socialHandles && (
          <p className="mt-1 text-sm text-red-500">{errors.socialHandles}</p>
        )}
      </div>

      {/* Cities */}
      <div>
        <label htmlFor="cities" className="block text-sm font-medium text-white mb-2">
          City / Cities You Attend Games In <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="cities"
          value={formData.cities}
          onChange={(e) => handleInputChange("cities", e.target.value)}
          placeholder="Phoenix, AZ or Phoenix, AZ; Las Vegas, NV"
          className={`w-full px-4 py-3 bg-surface border ${
            errors.cities ? "border-red-500" : "border-border"
          } rounded-[12px] text-white placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors`}
        />
        <p className="mt-2 text-xs text-text-muted">
          List the cities where you regularly attend games.
        </p>
        {errors.cities && (
          <p className="mt-1 text-sm text-red-500">{errors.cities}</p>
        )}
      </div>

      {/* Sports */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Sports You Film <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SPORTS_OPTIONS.map((sport) => (
            <label
              key={sport}
              className={`flex items-center gap-3 px-4 py-3 bg-surface border ${
                formData.sports.includes(sport)
                  ? "border-accent"
                  : "border-border"
              } rounded-[12px] cursor-pointer hover:border-accent/50 transition-colors`}
            >
              <input
                type="checkbox"
                checked={formData.sports.includes(sport)}
                onChange={() => handleSportChange(sport)}
                className="w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className="text-sm text-white">{sport}</span>
            </label>
          ))}
        </div>
        {errors.sports && (
          <p className="mt-2 text-sm text-red-500">{errors.sports}</p>
        )}
      </div>

      {/* Teams */}
      <div>
        <label htmlFor="teams" className="block text-sm font-medium text-white mb-2">
          Teams Whose Games You Attend <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="teams"
          value={formData.teams}
          onChange={(e) => handleInputChange("teams", e.target.value)}
          placeholder="Phoenix Suns or Dallas Cowboys, Arsenal FC"
          className={`w-full px-4 py-3 bg-surface border ${
            errors.teams ? "border-red-500" : "border-border"
          } rounded-[12px] text-white placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors`}
        />
        <p className="mt-2 text-xs text-text-muted">
          List the teams or events you most often attend.
        </p>
        {errors.teams && (
          <p className="mt-1 text-sm text-red-500">{errors.teams}</p>
        )}
      </div>

      {/* Frequency */}
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-white mb-2">
          How Often Do You Attend Games? <span className="text-accent">*</span>
        </label>
        <select
          id="frequency"
          value={formData.frequency}
          onChange={(e) => handleInputChange("frequency", e.target.value)}
          className={`w-full px-4 py-3 bg-surface border ${
            errors.frequency ? "border-red-500" : "border-border"
          } rounded-[12px] text-white focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.75rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.5em 1.5em",
          }}
        >
          {FREQUENCY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface">
              {option.label}
            </option>
          ))}
        </select>
        {errors.frequency && (
          <p className="mt-2 text-sm text-red-500">{errors.frequency}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold text-black bg-white rounded-[12px] hover:bg-white/90 transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p className="mt-4 text-center text-xs text-text-muted">
          By joining, you&apos;re opting into POV creator updates and early access.
        </p>
      </div>
    </form>
  );
}
