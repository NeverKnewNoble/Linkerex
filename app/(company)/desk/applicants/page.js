import ApplicantList from "@/app/components/(desk)/ApplicantList"


export default function Applicants() {
  return <div
  className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
  style={{
    backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
  }}>
      <div className="w-full bg-white min-h-screen mx-10 my-5 rounded-lg shadow-lg">
        {/* Dashboard Title */}
        <h1 className="text-[50px] font-bold ml-8 mt-5 text-[#18181b]">Applicants</h1>
        

        {/* Job List Section */}
        <section className="">
          <div className="container mx-auto px-6">
            <ApplicantList />
          </div>
        </section>

      </div>
  </div>
}