// import { useSession } from "next-auth/react";


export default function Dashboard() {
  // const { data: status } = useSession();

  // //? Handle loading and unauthenticated states
  // if (status === "loading") {
  //   return <Loading />;
  // }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/linkerex/inf.jpg')", // Using project image as background
      }}
    >
      <div className="w-full bg-white min-h-screen mx-10 my-5 rounded-lg shadow-lg">
        {/* Dashboard Title */}
        <h1 className="text-[50px] font-bold ml-8 mt-5 text-[#18181b]">Dashboard</h1>

        {/* Top Section */}
        <div className="mt-10 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center">
            {/* Card 1 */}
            <div className="bg-[#18181b] w-full h-[300px] rounded-lg flex flex-col items-center justify-center text-white font-semibold shadow-md">
              <h1 className="text-[40px]">Listed Jobs</h1>
              <div className="text-[90px]">0</div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#18181b] w-full h-[300px] rounded-lg flex flex-col items-center justify-center text-white font-semibold shadow-md">
              <h1 className="text-[40px]">Applications</h1>
              <div className="text-[90px]">0</div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#18181b] w-full h-[300px] rounded-lg flex flex-col items-center justify-center text-white font-semibold shadow-md p-4">
              <h2 className="text-[30px] mb-4">Job Status</h2>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg shadow-sm">
                  <span>Pending</span>
                  <span className="text-[20px] font-bold">0</span>
                </div>
                <div className="flex items-center justify-between bg-blue-100 text-blue-800 py-2 px-4 rounded-lg shadow-sm">
                  <span>Interview Scheduled</span>
                  <span className="text-[20px] font-bold">0</span>
                </div>
                <div className="flex items-center justify-between bg-green-100 text-green-800 py-2 px-4 rounded-lg shadow-sm">
                  <span>Accepted</span>
                  <span className="text-[20px] font-bold">0</span>
                </div>
                <div className="flex items-center justify-between bg-red-100 text-red-800 py-2 px-4 rounded-lg shadow-sm">
                  <span>Rejected</span>
                  <span className="text-[20px] font-bold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="my-10 px-8 ">
          <div className="bg-[#18181b] w-full h-[300px] rounded-lg flex items-center justify-center text-white font-semibold shadow-md">
            <p className="text-[30px]">More Dashboard Content Coming Soon !!!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
