import React from "react";

const Button = ({
  label,
  onClick,
  bgColor = "bg-[#2f71c7]",
  hoverColor = "hover:bg-[#a1d9ec]",
  textColor = "text-white",
  width = "w-auto",
  height = "h-auto",
  className = "",
  href,
}) => {
  const sharedClasses = `${bgColor} ${hoverColor} ${textColor} ${width} ${height} font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={sharedClasses}
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return (
    <button className={sharedClasses} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;







// Use Case
// {/* Default Button */}
// <Button
// label="Find A Job Now"
// onClick={handleClick}
// />

// {/* Custom Colors and Size */}
// <Button
// label="Learn More"
// bgColor="bg-[#4caf50]"
// hoverColor="hover:bg-[#81c784]"
// textColor="text-black"
// width="w-48"
// height="h-12"
// onClick={() => console.log("Learn More Clicked")}
// />

// {/* Full Width Button */}
// <Button
// label="Submit"
// bgColor="bg-red-600"
// hoverColor="hover:bg-red-700"
// textColor="text-white"
// width="w-full"
// height="h-16"