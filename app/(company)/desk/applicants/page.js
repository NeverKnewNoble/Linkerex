import ApplicantList from "@/app/components/(desk)/ApplicantList";

export default function Applicants() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-2 md:p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
      }}
    >
      <div className="w-full bg-white min-h-screen mx-2 md:mx-10 my-2 md:my-5 rounded-lg shadow-lg">
        {/* Dashboard Title */}
        <h1 className="text-2xl md:text-[50px] font-bold ml-4 md:ml-8 mt-8 md:mt-8 text-[#18181b]">
          Applicants
        </h1>

        {/* Job List Section */}
        <section className="">
          <div className="container mx-auto px-2 pt-5 md:px-6">
            <ApplicantList />
          </div>
        </section>
      </div>
    </div>
  );
}