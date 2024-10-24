// components/BaseComponent.tsx
import React, { ReactNode } from 'react';

// Tipe untuk warna latar belakang
type BackgroundColor =
  | 'green'
  | 'orange'
  | 'brown'
  | 'lightGray'
  | 'darkBrown'
  | 'yellow'
  | 'gold';

// Tipe props untuk komponen
interface BaseComponentProps {
  bgColor?: BackgroundColor; // warna latar belakang
  children: ReactNode;         // konten
}

// Definisikan kelas untuk warna latar belakang
const bgColors: Record<BackgroundColor, string> = {
  green: '#8ba416',
  orange: '#d79338',
  brown: '#806242',
  lightGray: '#f2f1ef',
  darkBrown: '#251f17',
  yellow: '#ffae14',
  gold: '#dcaa62',
};

const BaseComponent: React.FC<BaseComponentProps> = ({
  bgColor = 'green',
  children,
}) => {
  const bgColorClass = bgColors[bgColor] || bgColors.green;

  return (
    <div
      style={{ backgroundColor: bgColorClass }}
      className="text-white p-4 rounded-lg"
    >
      {children}
    </div>
  );
};

export default BaseComponent;
