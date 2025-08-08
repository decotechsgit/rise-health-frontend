import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface IFormLabelProps {
  htmlFor: string;
  label: string;
  className?: string;
}

const FormLabel: React.FC<IFormLabelProps> = ({
  htmlFor,
  label,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-[6px] block text-[12px] leading-[26px] font-[600] tracking-[0px] text-[#1E1F21] sm:mb-[6px] md:mb-[8px] lg:mb-[8px] lg:text-[16px] xl:mb-[8px] ${inter.className} ${className}`}
    >
      {label}
    </label>
  );
};

export default FormLabel;
