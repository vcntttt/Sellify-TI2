interface PopUpProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function PopUp({ show, onClose, children }: PopUpProps) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button className="absolute top-2 right-5 text-white hover:text-gray-400" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
