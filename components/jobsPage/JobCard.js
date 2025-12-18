import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Building2, Tag, CheckCircle2, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const JobCard = ({
  id, // Job ID
  title,
  company,
  location,
  category,
  price,
  pricingType = "hour",
  description,
  jobType,
  className = "",
  appliedJobs, // Applied jobs data
  userId, // Logged-in user ID
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the user has already applied for this job
  const hasApplied = appliedJobs.some(
    (job) =>
      job.jobId === id &&
      job.studentId === userId &&
      job.studentAction === "Submitted"
  );

  // Get pricing label based on type
  const getPricingLabel = () => {
    switch (pricingType) {
      case "Salary":
        return "per month";
      case "Wage":
        return "per hour";
      default:
        return "";
    }
  };

  // Get job type badge styles
  const getJobTypeStyles = (type) => {
    switch (type) {
      case "Full-Time":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Part-Time":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "Internship":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Get button text and status
  const getButtonContent = () => {
    if (hasApplied) {
      return (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 size={18} />
          <span>Applied</span>
        </div>
      );
    } else if (jobType === "Full-Time" || jobType === "Part-Time" || jobType === "Internship") {
      return "Apply For This Job";
    } else {
      return "Unavailable";
    }
  };

  // Get pricing display
  const Pricing = () => {
    if (jobType === "Full-Time" || jobType === "Part-Time") {
      if (price === null || price === undefined || price === 0) {
        return null;
      }
      return (
        <div className="flex items-center gap-2 text-success font-semibold">
          <DollarSign size={18} />
          <span>GH₵ {price} / {getPricingLabel()}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${className}`}
    >
      {/* Header Section with Job Type Badge */}
      <div className="relative p-6 pb-4">
        {/* Job Type Badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getJobTypeStyles(jobType)}`}
          >
            {jobType}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Company and Location */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-3">
          <div className="flex items-center gap-1.5">
            <Building2 size={16} className="text-muted" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-muted" />
            <span>{location}</span>
          </div>
        </div>

        {/* Category */}
        {category && (
          <div className="flex items-center gap-1.5 mb-3">
            <Tag size={16} className="text-muted" />
            <span className="text-sm text-muted">{category}</span>
          </div>
        )}

        {/* Pricing */}
        <div className="mb-4">
          <Pricing />
        </div>

        {/* Description */}
        <p className="text-sm text-muted line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer with Apply Button */}
      <div className="px-6 pb-6 pt-4 border-t border-border bg-card/50">
        <Link href={`/jobs/applying_to_job?id=${id}`}>
          <button
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              hasApplied
                ? "bg-success/20 text-success border border-success/30 hover:bg-success/30"
                : "bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {getButtonContent()}
          </button>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default JobCard;
