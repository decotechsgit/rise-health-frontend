'use client'
import { X } from "lucide-react";

import { altform } from "@/app/fonts/altform";
import Button from "@components/shared/button";
import StyledDatePicker from "@components/shared/date-picker/StyledDatePicker";
import CustomSelect from "@components/shared/select-with-images/CustomSelect";
import TextElement from "@components/shared/typography/TextElement.typo";

const AuditProviders = () => {
  const auditProviders = [
    {
      title: "AQCGROUP",
      value: "aqcgroup",
      imgUrl: '/images/auditors/aqcgroup.png',
    },
    {
      title: "ASSURED AUDITING",
      value: "assured-auditing",
      imgUrl: '/images/auditors/assured-auditing.png',
    },
    {
      title: "AUDIT WISE GROUP",
      value: "audit-wise-group",
      imgUrl: '/images/auditors/audit-wise-group.png',
    },
    {
      title: "ADDED VALUE ASSESSOR",
      value: "added-value-assessor",
      imgUrl: '/images/auditors/added-value-assessor.png',
    },
    {
      title: "CERTIFI INTERNATIONAL",
      value: "certifi-international",
      imgUrl: '/images/auditors/certifi-international.png',
    },
  ];
  return (
    <div className="absolute top-0 left-0 z-20 h-[100vh] w-[100%] bg-[rgba(0,0,0,0.5)] p-6">
      <section className="absolute top-0 left-0 h-[100vh] w-full  lg:right-0 lg:left-auto lg:w-[40%] bg-[#F1F4F8]">
        <div className="flex h-[100px] items-center justify-between bg-[#E0E3E7] px-6">
          <TextElement
            className={`${altform.className} !text-[16px] !text-[#1E1F21] lg:!text-[24px]`}
          >
            Book an appointment
          </TextElement>
          <X className="text-[#1E1F21]" />
        </div>


        <div className="mx-auto mt-4 flex h-[80vh] w-[90%] flex-col justify-between overflow-x-hidden ">
          <div>
            <TextElement as="span" className={`${altform.className}`}>
              Selected auditor
            </TextElement>
            <CustomSelect
            onSelect={(val)=>{console.log(val)}}
            options={auditProviders}
            />
          </div>

          <StyledDatePicker
          onDateSelect={(val)=>{console.log(val)}}
          />
          <label htmlFor="time">
            <TextElement as="span" className={`${altform.className}`}>
              Time
            </TextElement>
            <br />
            <input
              type="time"
              className="mx-auto h-[65px] w-full rounded-lg border border-[#525558] px-4"
            />
          </label>

          <div>
            <TextElement as="span" className={`${altform.className}`}>
              Scope of audit
            </TextElement>
            <select className="mx-auto h-[65px] w-full rounded-lg border border-[#525558] bg-transparent px-4">
              {auditProviders.map((audit) => {
                return (
                  <option
                    value={audit.value}
                    key={audit.value}
                    className={`${altform.className}`}
                  >
                    {audit.title}
                  </option>
                );
              })}
            </select>
          </div>

          <label htmlFor="note">
            <TextElement as="span" className={`${altform.className}`}>
              Notes
            </TextElement>
            <br />
            <textarea
              className="mx-auto w-full rounded-lg border border-[#525558] p-4"
              rows={7}
            />
          </label>

          <Button title="Proceed to payment" />
        </div>
      </section>
    </div>
  );
};
export default AuditProviders;
