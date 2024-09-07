import { useState } from 'react';

interface PopUpsState {
  [key: string]: boolean; 
}

function usePopUpManager() {
  const [popUps, setPopUps] = useState<PopUpsState>({});

  const handleShowPopUp = (key: string) => {setPopUps(prevState => ({...prevState, [key]: true,}));};

  const handleClosePopUp = (key: string) => {setPopUps(prevState => ({...prevState, [key]: false,}));};

  return {
    popUps,
    handleShowPopUp,
    handleClosePopUp,
  };
}

export default usePopUpManager;