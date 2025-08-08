import FormNav from "@components/pages/dashboard/forms/formNavBar";
import SlidePanel from "@components/shared/form/SidePanel";

const FormsModalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <SlidePanel isOpen={true} className="w-full sm:!w-1/2 lg:!w-[70%] xl:!w-1/2">
        <FormNav>{children}</FormNav>
      </SlidePanel>
    </div>
  );
};

export default FormsModalLayout;
