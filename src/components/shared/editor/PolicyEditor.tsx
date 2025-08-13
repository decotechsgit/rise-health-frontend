"use client";

import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  height?: number | string;
}

interface AIRequest {
  prompt: string;
  maxTokens?: number;
}

interface AIResponse {
  string: (callback: () => Promise<string>) => void;
}

const TinyMCEEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  height = 800,
}: TinyMCEEditorProps) => {
  const toolbarConfig =
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat";

  return (
    <div
      style={{
        height: typeof height === "number" ? `${height}px` : height,
        border: "1px solid #000000",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Editor
        apiKey="gmvut1nu5d7383bcjl6a996t8adnliadaemcvq7l064xe280"
        key={readOnly ? "readonly" : "editable"}
        disabled={readOnly}
        init={{
          plugins: [
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
          ],
          toolbar: readOnly ? false : toolbarConfig,
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request: AIRequest, respondWith: AIResponse) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
          placeholder,
          content_style:
            "body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }",
          menubar: !readOnly,
          height: "100%",
          min_height: 400,
          max_height: 1000,
          resize: true,
          branding: false,
          promotion: false,
          statusbar: false,
        }}
        value={value}
        onEditorChange={onChange}
      />
    </div>
  );
};

export default TinyMCEEditor;
