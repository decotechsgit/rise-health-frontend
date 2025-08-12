"use client";

import { useEffect, useState } from "react";
import StyledDatePicker from "@components/shared/date-picker/StyledDatePicker";
import CustomSelect from "@components/shared/select-with-images/CustomSelect";
import TextElement from "@components/shared/typography/TextElement.typo";
import { useOnboarding } from "@/contexts/onboarding-context";
import { useSearchParams } from "next/navigation";
import Button from "@components/shared/button";

type SelectOption = {
  title: string;
  value: string;
  imgUrl?: string;
};

type BookAppointmentFormData = {
  auditor: SelectOption | null;
  date: Date | null;
  time: SelectOption | null;
  scope: SelectOption | null;
  notes: string;
};

type BookAppointmentErrors = Partial<
  Record<keyof BookAppointmentFormData, string>
>;

const auditProviders = [
  {
    title: "AQCGROUP",
    value: "aqcgroup",
    imgUrl: "/images/auditors/aqcgroup.png",
  },
  {
    title: "ASSURED AUDITING",
    value: "assured-auditing",
    imgUrl: "/images/auditors/assured-auditing.png",
  },
  {
    title: "AUDIT WISE GROUP",
    value: "audit-wise-group",
    imgUrl: "/images/auditors/audit-wise-group.png",
  },
  {
    title: "ADDED VALUE ASSESSOR",
    value: "added-value-assessor",
    imgUrl: "/images/auditors/added-value-assessor.png",
  },
  {
    title: "CERTIFI INTERNATIONAL",
    value: "certifi-international",
    imgUrl: "/images/auditors/certifi-international.png",
  },
];

const initialState: BookAppointmentFormData = {
  auditor: null,
  date: new Date(),
  time: null,
  scope: null,
  notes: "",
};

const validate = (data: BookAppointmentFormData): BookAppointmentErrors => {
  const errors: BookAppointmentErrors = {};
  if (!data.auditor) errors.auditor = "Auditor is required";
  if (!data.date) errors.date = "Date is required";
  if (!data.time) errors.time = "Time is required";
  if (!data.scope) errors.scope = "Scope of audit is required";
  return errors;
};

const BookAppointment = () => {
  const [formData, setFormData] =
    useState<BookAppointmentFormData>(initialState);
  const [formErrors, setFormErrors] = useState<BookAppointmentErrors>({});
  const { loading, onboarding, setOnboarding } = useOnboarding();
  const searchParams = useSearchParams();
  const currentStepKey = searchParams.get("step") as string;

  useEffect(() => {
    if (onboarding?.progress?.audit) {
      const obj = onboarding?.progress?.audit[0];
      const auditor =
        auditProviders.find((v) => v?.value === obj?.auditor) ?? null;
      const scope =
        auditProviders.find((v) => v?.value === obj?.scopeOfAudit) ?? null;

      setFormData({
        auditor,
        date: new Date(obj?.date),
        time: { title: obj?.time, value: obj?.time },
        scope,
        notes: obj?.notes,
      });
    }
  }, [onboarding]);

  const handleChange = (field: keyof BookAppointmentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedFormData: AuditType = {
      auditor: String(formData?.auditor?.value),
      date: String(formData?.date),
      time: String(formData?.time?.value),
      scopeOfAudit: String(formData?.scope?.value),
      notes: formData?.notes,
    };
    if (onboarding) {
      let completedSteps = onboarding.progress?.completedSteps ?? [];
      if (completedSteps.includes(currentStepKey)) {
        completedSteps = completedSteps.filter(
          (item) => item !== currentStepKey
        );
      }

      setOnboarding({
        ...onboarding,
        progress: {
          ...onboarding.progress,
          completedSteps: [...completedSteps],
          audit: [updatedFormData],
        },
      });
    }
  };

  return (
    <div className="flex w-full gap-10">
      <div className="flex-1">
        {formData?.auditor ? (
          <div className="w-full">
            <img
              src={formData?.auditor?.imgUrl}
              alt={"Logo"}
              className="h-15 w-auto object-cover"
            />
            <TextElement as="h2" className="mt-5 text-[22px] font-semibold">
              {formData?.auditor?.title}
            </TextElement>
            {/* <TextElement as="h2" className="my-5 text-[18px] font-semibold">
              Available Dates
            </TextElement> */}
            {/* <StyledDatePicker
              onDateSelect={(val) => console.log("date", val)}
            /> */}
          </div>
        ) : (
          <div className="flex h-[100px] w-full items-center justify-center">
            <TextElement>No auditor select</TextElement>
          </div>
        )}
      </div>
      <div className="flex-1">
        <form
          className="font-[Altform TRIAL] space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Auditor */}
          <div>
            <label className="mb-1 block text-[16px] text-[#1E1F21]">
              Select auditor
            </label>
            <CustomSelect
              value={formData?.auditor}
              onSelect={(val) => handleChange("auditor", val)}
              options={auditProviders}
            />
            {formErrors.auditor && (
              <TextElement className="text-red-500">
                {formErrors.auditor}
              </TextElement>
            )}
          </div>

          {/* Date */}
          <div>
            <StyledDatePicker
              value={formData?.date}
              onDateSelect={(val) => handleChange("date", val)}
            />
            {formErrors.date && (
              <TextElement className="text-red-500">
                {formErrors.date}
              </TextElement>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="mb-1 block text-[16px] text-[#1E1F21]">
              Time
            </label>
            <CustomSelect
              value={formData?.time}
              placeholder="Select Time"
              onSelect={(val) => handleChange("time", val)}
              options={Array.from({ length: 48 }, (_, i) => {
                const hour = Math.floor(i / 2);
                const minute = i % 2 === 0 ? "00" : "30";
                const label = `${hour.toString().padStart(2, "0")}:${minute}`;
                return { value: label, title: label };
              })}
            />
            {formErrors.time && (
              <TextElement className="text-red-500">
                {formErrors.time}
              </TextElement>
            )}
          </div>

          {/* Scope */}
          <div>
            <label className="mb-1 block text-[16px] text-[#1E1F21]">
              Scope of audit
            </label>
            <CustomSelect
              value={formData?.scope}
              placeholder="Select Scope of audit"
              onSelect={(val) => handleChange("scope", val)}
              options={auditProviders.map((v) => ({
                title: v.title,
                value: v.value,
              }))}
            />
            {formErrors.scope && (
              <TextElement className="text-red-500">
                {formErrors.scope}
              </TextElement>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-[16px] text-[#1E1F21]">
              Notes
            </label>
            <textarea
              rows={4}
              placeholder="Anything you will like me to know before the appointment"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full resize-none rounded-lg border border-[#525558] px-4 py-3 text-[16px] text-[#1E1F21] focus:outline-none"
            />
          </div>

          {/* Proceed Button */}
          <div>
            <Button
              title={"Proceed to payment"}
              type="submit"
              isLoading={loading}
              disabled={loading}
              btnClassName="!text-[16px] !text-white"
              className="h-[56px] w-full rounded-sm bg-[#F59432] py-3 text-[16px] transition hover:bg-[#e6862b]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
