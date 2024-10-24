// src/app/page.tsx

import WhatsAppButton from "@/app/components/WhasappButton";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-center text-2xl mt-4">Welcome to Catering Service</h1>
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
