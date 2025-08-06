import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import DraftEditor from "./DraftEditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../variable";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "Application for Frontend Developer Position - Arshad Qadri",
    text: `Dear Hiring Manager,<br><br>
            I hope you're doing well. My name is Arshad Qadri, and I am interested in applying for the Frontend Developer / React Developer / Next.js Developer position. With 3.5 years of experience in frontend technologies like React, Next.js, and some experience in Node.js for building APIs, I am confident in my ability to contribute effectively to your team.<br><br>
            I am passionate about building efficient, user-friendly web applications and would love the opportunity to be a part of your team. Please find my resume attached for further details.<br><br>
            Looking forward to your response.<br>
            Best Regards, <br>
            Arshad Qadri <br>
            Contact : 8007330423 <br>
            Email : arshadqadri321@gmail.com`,
    resume: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("to", formData.to);
    data.append("subject", formData.subject);
    data.append("text", formData.text);
    data.append("resume", formData.resume);

    try {
      const res = await fetch(`${baseUrl}/api/email/send-email`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Email sent successfully!");
        setFormData({ ...formData, to: "" });
      } else {
        toast.error(`Failed: ${result.message}`);
      }
    } catch (err) {
      console.log("error===", err);

      toast.error("Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-[1200px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Recipient Email
              </label>
              <input
                type="email"
                name="to"
                placeholder="Recipient Email"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.to}
                id="email"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-1 font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.subject}
                id="subject"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-1 font-medium text-gray-700"
            >
              Message
            </label>
            <DraftEditor
              value={formData.text}
              onChange={(htmlContent) =>
                setFormData({ ...formData, text: htmlContent })
              }
            />
          </div>

          <div>
            <label
              htmlFor="resume"
              className="block mb-1 font-medium text-gray-700"
            >
              Upload Resume (PDF)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="w-full">
                <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition">
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    onChange={handleChange}
                    required
                    id="resume"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <div className="flex items-center justify-between p-3">
                    <span className="text-gray-600 truncate">
                      {formData.resume
                        ? formData.resume.name
                        : "Choose a PDF file..."}
                    </span>
                    <span className="text-blue-600 font-medium">Browse</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`cursor-pointer md:min-w-[100px] min-w-full md:w-max w-full mt-6 md:mt-0 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  <IoSend />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
