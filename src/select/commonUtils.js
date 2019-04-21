import { useEffect } from "react";

function useOutsideClick(domElement, handler) {
  function handleOutSideClick(event) {
    const { target } = event;
    if (domElement.current.contains(target)) {
      return;
    }
    handler();
  }
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);
}

export default useOutsideClick;
