import { formCopyService } from "@api/form.copies.service";
import { packageService } from "@api/package.service";
import FormsModule from "@components/pages/dashboard/forms/FormsModule";

export const dynamic = "force-dynamic";
const Page = async () => {
  const formsData = await packageService.getAllPackages();
  const formCopiesData = await formCopyService.getAllFormCopies();

  return <FormsModule initialData={formsData} formCopies={formCopiesData} />;
};

export default Page;
