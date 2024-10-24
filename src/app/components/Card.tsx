// components/Card.tsx
interface CardProps {
    name: string;
    photo: string;
    imageUrl: string;
    message: string;
    onClick: () => void;
  }
  
  const Card: React.FC<CardProps> = ({ name, photo,message, imageUrl, onClick }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={onClick}>
        <img className="w-full h-48 object-cover" src={imageUrl} alt={imageUrl} />
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{name}</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    );
  };
  
  export default Card;
  