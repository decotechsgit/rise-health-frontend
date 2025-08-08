"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { policyService } from "@api/policy.service";
import Button from "@components/shared/button";
import TinyMCEEditor from "@components/shared/editor/PolicyEditor";

interface Props {
  initialContent: string;
  categoryId: string;
  subcategoryId: string;
  policyId: string;
  title?: string;
}

const PoliciesProceduresEditor = ({
  initialContent,
  categoryId,
  subcategoryId,
  policyId,
  title,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [content, setContent] = useState(initialContent);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    try {
      setLoading(true);
      const payload: TPolicyPayload = {
        categoryId: categoryId,
        subcategoryId: subcategoryId,
        content: content,
        title: title || "Test Policy",
      };
      if (policyId) {
        await policyService.updatePolicy(policyId, payload);
      } else {
        await policyService.create(payload);
      }
      router.back();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col rounded">
      <div className="mb-60 flex-1 overflow-hidden">
        <TinyMCEEditor
          value={content}
          onChange={setContent}
          readOnly={!isEditing}
          placeholder="Enter policies and procedures content..."
          height="95%"
        />
      </div>
      <div className="absolute right-0 bottom-0 flex gap-2 p-4">
        <Button
          title="Cancel"
          className="rounded-xl border-none bg-[var(--button-cancel-bg)] px-10 py-6 text-lg font-normal text-[var(--button-text)] shadow-none"
          handleOnClick={handleCancel}
        />
        {
          isEditing ?
            <Button
              title="Save"
              isLoading={loading}
              disabled={loading}
              className="rounded-xl border-none bg-[var(--button-save-bg)] px-10 py-6 text-lg font-normal text-[var(--button-text)] shadow-none"
              handleOnClick={handleSave}
            />
            :
            <Button
              title="Edit"
              className="rounded-xl border-none bg-[var(--button-save-bg)] px-10 py-6 text-lg font-normal text-[var(--button-text)] shadow-none"
              handleOnClick={() => {
                setIsEditing(true)
              }}
            />
        }
      </div>
    </div>
  );
};

export default PoliciesProceduresEditor;
