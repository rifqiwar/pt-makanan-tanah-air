// src/app/components/TextEditor.tsx
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import react-quill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, placeholder }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mb-4"
    />
  );
};

export default TextEditor;
