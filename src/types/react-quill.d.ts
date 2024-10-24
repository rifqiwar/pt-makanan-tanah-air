declare module 'react-quill' {
    import * as React from 'react';
  
    export interface QuillProps {
      value?: string;
      onChange?: (value: string) => void;
      modules?: object;
      formats?: string[];
      placeholder?: string;
      theme?: string;
      className?: string; // Add this line
    }
  
    export default class Quill extends React.Component<QuillProps> {}
  }
  