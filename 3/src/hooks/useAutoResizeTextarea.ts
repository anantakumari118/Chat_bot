import { useEffect } from 'react'

export const useAutoResizeTextarea = (
  ref: React.RefObject<HTMLTextAreaElement | null>,
  value: string,
) => {
  useEffect(() => {
    if (!ref.current) return
    ref.current.style.height = '0px'
    ref.current.style.height = `${Math.min(ref.current.scrollHeight, 220)}px`
  }, [ref, value])
}
