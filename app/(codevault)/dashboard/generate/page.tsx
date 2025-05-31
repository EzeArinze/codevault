import GenerateInput from "@/components/generate-code/generate-input";
import React from "react";

// function AiGeneratePage() {
//   return (
//     <div className="flex min-h-[90vh] w-full gap-6 p-4">
//       <div className="flex-1 flex flex-col bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl justify-end p-4">
//         <GenerateInput />
//       </div>
//     </div>
//   );
// }

// export default AiGeneratePage;

function AiGeneratePage() {
  return (
    <div className="flex min-h-[92vh] w-full gap-6 p-4">
      {/* Sidebar */}
      <aside className="bg-muted/50 rounded-xl w-full max-w-xs p-4 md:flex flex-col hidden"></aside>
      {/* Main Content */}
      <main className="flex-1 bg-muted/50 rounded-xl p-6 flex flex-col justify-end">
        {/* Main content goes here */}
        {/* <div className="flex-1" /> */}
        <GenerateInput />
      </main>
    </div>
  );
}

export default AiGeneratePage;
