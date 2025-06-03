import { SnippetPayload } from "@/utils/types";

type SetFormDetails = React.Dispatch<React.SetStateAction<SnippetPayload>>;

export const generateInstallCommand = (
  formDetails: SnippetPayload,
  setFormDetails: SetFormDetails
): void => {
  if (!formDetails.title || !formDetails.category) return;

  const fileName = formDetails.title.toLowerCase().replace(/\s+/g, "-");
  const extension = formDetails.language === "typescript" ? "ts" : "js";
  const command = `npx add ${formDetails.category}/${fileName}.${extension}`;

  setFormDetails((prev) => ({ ...prev, command: command }));
};

//  const generateInstallCommand = () => {
//     if (!formDetails.title || !formDetails.category) return;

//     const fileName = formDetails.title.toLowerCase().replace(/\s+/g, "-");
//     const extension = formDetails.language === "typescript" ? "ts" : "js";
//     const command = `npx create-file ${formDetails.category}/${fileName}.${extension}`;

//     setFormDetails((prev) => ({ ...prev, installCommand: command }));
//   };
