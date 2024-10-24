// components/Modal.tsx
interface ModalProps {
  title: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, description, imageUrl, avatarUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96">
        <button className="text-gray-500 hover:text-gray-700 absolute top-4 right-4" onClick={onClose}>
          ×
        </button>
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full mr-4" src={avatarUrl} alt="Avatar" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <img className="w-full h-48 object-cover mb-4" src={imageUrl} alt={title} />
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
