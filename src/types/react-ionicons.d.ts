// types/react-ionicons.d.ts
declare module "react-ionicons" {
  import * as React from "react";

  interface IonIconProps {
    name: string;
    size?: string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    rotate?: boolean;
    shake?: boolean;
    beat?: boolean;
    onClick?: () => void;
  }

  const IonIcon: React.FC<IonIconProps>;

  export { IonIcon };
}
