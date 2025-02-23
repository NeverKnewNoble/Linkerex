// "use client";

// import React, { useState } from "react";
// import { Button, Input, Link, Alert } from "@nextui-org/react";
// import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
// import Image from "next/image";

// export default function Component() {
//   const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control
//   const backdrop = "blur"; // Set the backdrop style
//   const [email, setEmail] = useState(""); // State to track email input
//   const [error, setError] = useState(""); // State to track error messages

//   const handleResetPassword = () => {
//     if (!email.trim()) {
//       setError("Please provide a valid email address.");
//       return;
//     }
//     setError(""); // Clear any previous errors
//     onOpen(); // Open the modal
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center bg-black">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center mt-5">
//           <Link href={"/#home"}>
//             <Image
//               src="/linkerex/whitelincrop.png"
//               alt="Linkerex Logo"
//               width={744}
//               height={80}
//               className="cursor-pointer"
//             />
//           </Link>
//         </div>
//         <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
//           <div className="flex flex-col">
//             <Input
//               classNames={{
//                 base: "-mb-[2px]",
//                 inputWrapper:
//                   "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
//               }}
//               label="Email Address"
//               name="email"
//               placeholder="Enter your email"
//               type="email"
//               variant="bordered"
//               value={email}
//               onValueChange={setEmail}
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           <Button color="primary" type="button" onPress={handleResetPassword}>
//             Reset Password
//           </Button>
//         </form>
//       </div>

//       {/* Modal */}
//       <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Password Reset</ModalHeader>
//               <ModalBody>
//                 <p>
//                   Instructions to reset your password have been sent to your email. Please check
//                   your inbox and follow the steps.
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }





"use client";

import React, { useState } from "react";
import { Button, Input, Link, Alert } from "@nextui-org/react";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Image from "next/image";

export default function Component() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control
  const backdrop = "blur"; // Set the backdrop style
  const [email, setEmail] = useState(""); // State to track email input
  const [error, setError] = useState(""); // State to track error messages

  const handleResetPassword = () => {
    if (!email.trim()) {
      setError("Please provide a valid email address.");
      return;
    }
    setError(""); // Clear any previous errors
    onOpen(); // Open the modal
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-black p-4 sm:p-6">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center mt-5">
          <Link href={"/#home"}>
            <Image
              src="/linkerex/whitelincrop.png"
              alt="Linkerex Logo"
              width={744}
              height={80}
              className="cursor-pointer w-[200px] sm:w-[300px]"
            />
          </Link>
        </div>
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <Input
              classNames={{
                base: "-mb-[2px]",
                inputWrapper:
                  "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
              }}
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              value={email}
              onValueChange={setEmail}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button color="primary" type="button" onPress={handleResetPassword}>
            Reset Password
          </Button>
        </form>
      </div>

      {/* Modal */}
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Password Reset</ModalHeader>
              <ModalBody>
                <p>
                  Instructions to reset your password have been sent to your email. Please check
                  your inbox and follow the steps.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}