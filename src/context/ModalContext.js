"use client"
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null); // 'login' | 'signup' | null
  const [info, setInfo] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const[count,setCount]=useState(0)
  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <ModalContext.Provider
      value={{
        modalType,
        openModal,
        closeModal,
        info,
        setInfo,
        sidebarOpen,
        setSidebarOpen,
        count,
        setCount,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
