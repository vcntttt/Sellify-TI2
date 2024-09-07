import PopUp from "./components/pop-up/PopUp";
import usePopUpManager from "./hooks/usePopUp";
{/*import { DatePickerDemo } from "./components/ui/DatePicker";*/}


export default function App() {
  const { popUps, handleShowPopUp, handleClosePopUp } = usePopUpManager();
  return (
    <div className="p-4">
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => handleShowPopUp('boleta')}
      >
        Mostrar Boleta
      </button>

      <button 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
        onClick={() => handleShowPopUp('factura')}
      >
        Mostrar Factura
      </button>
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-4"
        onClick={() => handleShowPopUp('registro')}
      >
        Mostrar registro
      </button>

      <PopUp show={popUps['boleta']} onClose={() => handleClosePopUp('boleta')}>
        <h2 className="text-xl font-semibold mb-4 text-white">Detalles de la Boleta</h2>
        <p className="bg-white p-4 rounded-lg">Aquí puedes mostrar la información de la boleta, como el número, fecha, items, etc.</p>
      </PopUp>
      <PopUp show={popUps['registro']} onClose={() => handleClosePopUp('registro')}>
          <h2 className="text-xl font-bold text-white mb-4">Registrar Cliente</h2>
          <div className="mb-4 space-x-16 relative left-10"><label className="inline-block mb-1 text-white">RUT</label>
          <input type="text" placeholder="217348889" className="w-80 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 rounded"></input></div>
          <div className="mb-4 space-x-9 relative left-10"><label className="inline-block mb-1 text-white">Nombre</label>
          <input type="text" placeholder="Pedro" className="w-80 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 rounded"/></div>
          <div className="mb-4 space-x-9 relative left-10"><label className="inline-block mb-1 text-white">Apellido</label>
          <input type="text" placeholder="Sanchéz" className="w-80 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 rounded"/></div>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 relative left-72">
          Confirmar Registro</button>
      </PopUp>
      <PopUp show={popUps['factura']} onClose={() => handleClosePopUp('factura')}>
        <div className="relative">
          <h2 className="text-white text-xl font-semibold mb-4">Detalles de Factura</h2>
          <input placeholder="Nombre Cliente" className="w-54 mb-2 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 rounded inline-block text-white relative left-5"></input>
          {/*<DatePickerDemo></DatePickerDemo>*/}
          <input placeholder="Dirección Cliente" className="w-54 mb-2 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 rounded block text-white relative left-5"></input>
          <p className="rounded-sm mb-4 p-2 bg-gray-800 border-2 border-gray-600 focus:border-blue-500 block text-white w-11/12 relative left-5"></p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 relative left-72">
        Confirmar factura</button>
      </PopUp>
    </div>
  );
}
