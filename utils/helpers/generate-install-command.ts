interface FormDetails {
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  installCommand: string;
}

type SetFormDetails = React.Dispatch<React.SetStateAction<FormDetails>>;

export const generateInstallCommand = (
  formDetails: FormDetails,
  setFormDetails: SetFormDetails
): void => {
  if (!formDetails.title || !formDetails.category) return;

  const fileName = formDetails.title.toLowerCase().replace(/\s+/g, "-");
  const extension = formDetails.language === "typescript" ? "ts" : "js";
  const command = `npx add ${formDetails.category}/${fileName}.${extension}`;

  setFormDetails((prev) => ({ ...prev, installCommand: command }));
};

//  const generateInstallCommand = () => {
//     if (!formDetails.title || !formDetails.category) return;

//     const fileName = formDetails.title.toLowerCase().replace(/\s+/g, "-");
//     const extension = formDetails.language === "typescript" ? "ts" : "js";
//     const command = `npx create-file ${formDetails.category}/${fileName}.${extension}`;

//     setFormDetails((prev) => ({ ...prev, installCommand: command }));
//   };
