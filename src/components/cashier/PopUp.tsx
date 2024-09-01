export default function PopUp({ children }: any) {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg relative max-w-lg w-full">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
}
