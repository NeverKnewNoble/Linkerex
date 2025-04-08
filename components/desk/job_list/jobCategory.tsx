import React from "react";


export default function JobCategory() {
    return (
        <div>
            <select
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Category</option>

                {/* <!-- Tech & Development --> */}
                <option value="Programming & Tech">Programming & Tech</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Game Development">Game Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Data Science & Analytics">Data Science & Analytics</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Blockchain & Crypto">Blockchain & Crypto</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="E-Commerce Development">E-Commerce Development</option>

                {/* <!-- Design & Creative --> */}
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Fashion & Beauty">Fashion & Beauty</option>
                <option value="Animation">Animation</option>
                <option value="Illustration">Illustration</option>
                <option value="Video & Animation">Video & Animation</option>
                <option value="Photography">Photography</option>
                <option value="Voice Over">Voice Over</option>

                {/* <!-- Marketing & Sales --> */}
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Social Media Management">Social Media Management</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO & SEM">SEO & SEM</option>
                <option value="Affiliate Marketing">Affiliate Marketing</option>
                <option value="Email Marketing">Email Marketing</option>
                <option value="Market Research">Market Research</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Brand Strategy">Brand Strategy</option>

                {/* <!-- Writing & Content --> */}
                <option value="Writing & Translation">Writing & Translation</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Copywriting">Copywriting</option>
                <option value="Technical Writing">Technical Writing</option>
                <option value="Editing & Proofreading">Editing & Proofreading</option>
                <option value="Transcription">Transcription</option>
                <option value="Academic Writing">Academic Writing</option>
                <option value="Scriptwriting">Scriptwriting</option>

                {/* <!-- Business Services --> */}
                <option value="Admin & Customer Support">Admin & Customer Support</option>
                <option value="Virtual Assistance">Virtual Assistance</option>
                <option value="Project Management">Project Management</option>
                <option value="Product Management">Product Management</option>
                <option value="Human Resources (HR)">Human Resources (HR)</option>
                <option value="HR & Training">HR & Training</option>
                <option value="Legal">Legal</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="Business Consulting">Business Consulting</option>
                <option value="Procurement & Supply Chain">Procurement & Supply Chain</option>

                {/* <!-- Education & Training --> */}
                <option value="Teaching & Tutoring">Teaching & Tutoring</option>
                <option value="Course Creation">Course Creation</option>
                <option value="Language Coaching">Language Coaching</option>
                <option value="Career Counseling">Career Counseling</option>

                {/* <!-- Lifestyle & Services --> */}
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Medical & Healthcare">Medical & Healthcare</option>
                <option value="Fitness Coaching">Fitness Coaching</option>
                <option value="Life Coaching">Life Coaching</option>
                <option value="Spiritual Guidance">Spiritual Guidance</option>
                <option value="Pet Care">Pet Care</option>
                <option value="Home Services">Home Services</option>
                <option value="Cooking & Baking">Cooking & Baking</option>

                {/* <!-- Industrial & Skilled Work --> */}
                <option value="Engineering & Architecture">Engineering & Architecture</option>
                <option value="Construction & Skilled Trade">Construction & Skilled Trade</option>
                <option value="Logistics & Transportation">Logistics & Transportation</option>
                <option value="Manufacturing & Production">Manufacturing & Production</option>
                <option value="Agriculture & Farming">Agriculture & Farming</option>
                <option value="Environmental & Energy">Environmental & Energy</option>
                <option value="Mining & Geology">Mining & Geology</option>

                {/* <!-- Events, Hospitality & Travel --> */}
                <option value="Event Planning & Management">Event Planning & Management</option>
                <option value="Travel & Hospitality">Travel & Hospitality</option>
                <option value="Tourism Services">Tourism Services</option>
                <option value="Hotel & Restaurant Management">Hotel & Restaurant Management</option>

                {/* <!-- Media & Entertainment --> */}
                <option value="Music & Audio">Music & Audio</option>
                <option value="Film & TV Production">Film & TV Production</option>
                <option value="Podcast Editing">Podcast Editing</option>
                <option value="Influencer Services">Influencer Services</option>
                <option value="Comedy & Entertainment">Comedy & Entertainment</option>

                {/* <!-- Research & Other Specialized Fields --> */}
                <option value="Research & Development">Research & Development</option>
                <option value="Science & Lab Services">Science & Lab Services</option>
                <option value="Archaeology & History">Archaeology & History</option>
                <option value="Library & Archiving">Library & Archiving</option>
                <option value="Translation & Localization">Translation & Localization</option>

                {/* <!-- Emerging & Miscellaneous --> */}
                <option value="NFT Services">NFT Services</option>
                <option value="Metaverse Development">Metaverse Development</option>
                <option value="Simulation & VR">Simulation & VR</option>
                <option value="Drone Services">Drone Services</option>
                <option value="Mystery Shopping">Mystery Shopping</option>
                <option value="Other">Other</option>
            </select>
        </div>
    )
}