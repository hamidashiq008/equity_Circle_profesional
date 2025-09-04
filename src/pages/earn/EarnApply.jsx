import React, { useState } from "react";

const EarnApply = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <p className="uppercase text-gray-400 text-xs tracking-wide mb-1">
          Applying For
        </p>
        <h2 className="text-lg font-semibold mb-8">
          FITNES HUSTLE TESTING
        </h2>

        {/* Job Title */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 uppercase block mb-2">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Your current job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm"
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-8">
          <label className="text-xs text-gray-400 uppercase block mb-2">
            @LinkedIn
          </label>
          <input
            type="text"
            placeholder="Add LinkedIn"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm"
          />
        </div>

        {/* Upload CV */}
        <div className="mb-6">
          <label className="text-xs text-gray-400 uppercase block mb-3">
            Upload Your CV
          </label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer hover:border-white transition">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="cvUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="cvUpload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <span className="text-3xl">📄</span>
              <p className="mt-2 text-sm font-medium">
                {file ? file.name : "UPLOAD YOUR CV"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported Formats: PDF, DOC, DOCx
              </p>
            </label>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-[11px] text-gray-500 mb-8 flex items-start leading-relaxed">
          <span className="mr-1">🔒</span> 
          Your Information is kept private and will only be used to respond to your enquiry. Read our Privacy Policy for more.
        </p>

        {/* Apply Now Button */}
        <button className="w-full bg-gray-900 text-white font-semibold py-4 rounded-full text-sm tracking-wide border border-gray-700 hover:bg-white hover:text-black transition">
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

export default EarnApply;
