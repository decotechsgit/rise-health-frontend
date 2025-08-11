import { useCallback, useState } from "react";

import AvailablePolicyModal from "@/components/shared/modals/AvailablePolicy.modal";
import PolicyAvailableFormModal from "@/components/shared/modals/PolicyAvailableForm.modal";
import Row from "@/components/shared/row";
import TextElement from "@/components/shared/typography/TextElement.typo";

export interface IPolicy {
  name: string;
}

const AvailablePolicies = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showPolicyAndProcedure, setShowPolicyAndProcedure] =
    useState<boolean>(false);

  const [selectedPolicy, setSelectedPolicy] = useState<IPolicy | null>(null);
  const [selectedPolicyAndProcedure, setSelectedPolicyAndProcedure] =
    useState<IPolicy | null>(null);

  const toggleShowPolicyAndProcedure = useCallback((item?: IPolicy | null) => {
    setShowPolicyAndProcedure((prev) => !prev);

    if (item) {
      setSelectedPolicyAndProcedure(item);
    }
  }, []);

  const toggleShowForm = useCallback((item?: IPolicy | null) => {
    setShowForm((prev) => !prev);
    if (item) {
      setSelectedPolicy(item);
    }
  }, []);

  return (
    <Row className="w-full flex-col gap-4 rounded-2xl bg-white p-4">
      <Row className="mb-4 flex-col gap-2">
        <TextElement as="h3">NDIS Compilance Packs</TextElement>

        <TextElement as="p">
          Easy access all required policies, procedures and forms for each NDIS
          registration group.
        </TextElement>
      </Row>

      {[
        { name: "NDIS Verification Pack" },
        { name: "NDIS Certification pack (Core Module)" },
        { name: "NDIS Module 1: High Intensity" },
        { name: "NDIS Module 2: Behaviour Support" },
        { name: "NDIS Module 3: Early Child Support" },
        { name: "NDIS Module 4: Support Coordinator" },
      ].map((item, index) => (
        <Row
          key={index}
          className="w-full items-center justify-between rounded-lg bg-orange-100 p-4"
        >
          <TextElement as="h3">{item.name}</TextElement>

          <Row className="cursor-pointer items-center gap-6 text-indigo-500 underline">
            <TextElement
              as="p"
              onClick={() => toggleShowPolicyAndProcedure(item)}
            >
              Policies & Procedures
            </TextElement>

            <TextElement as="p" onClick={() => toggleShowForm(item)}>
              Forms
            </TextElement>
          </Row>
        </Row>
      ))}

      {showForm && (
        <PolicyAvailableFormModal
          onCancel={toggleShowForm}
          currentPolicy={selectedPolicy}
        />
      )}

      {showPolicyAndProcedure && (
        <AvailablePolicyModal
          currentPolicy={selectedPolicyAndProcedure}
          onCancel={toggleShowPolicyAndProcedure}
        />
      )}
    </Row>
  );
};

export default AvailablePolicies;
