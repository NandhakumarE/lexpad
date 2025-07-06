import { useEffect, type RefObject } from "react"

function useOutsideClick<T extends HTMLElement>(
    ref: RefObject<T> , 
    callback: (event: MouseEvent) => void
) {
    useEffect(() => {
      const outsideClose = (event: MouseEvent) => {
        if(ref?.current && !ref.current.contains(event.target as Node)){
            callback(event);
        }
      }
      document.addEventListener('mousedown', outsideClose)
      return () => {
        document.removeEventListener('mousedown',outsideClose);
      }
    }, [ref, callback]);
}
export default useOutsideClick;