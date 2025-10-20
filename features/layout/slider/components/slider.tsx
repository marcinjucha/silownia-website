"use client"
import { useEffect, useRef, useState } from "react"
import ImageControl, { mapToImageProps } from "@/components/controls/image"
import TextControl, { mapToTextProps, TextControlDTO } from "@/components/controls/text"

type SliderItem = {
  link: string
  image: any
}

type Props = {
  title: TextControlDTO
  items: SliderItem[]
}

export default function SliderSection({ title, items }: Props) {
  // Stan i referencje
  const trackRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const positionRef = useRef(0)
  const speedRef = useRef(0.5) // piksele na frame
  const [hasAnimation, setHasAnimation] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track || items.length === 0) return

    // Zresetuj pozycję przy każdym przeładowaniu
    resetTrackPosition(track)

    /**
     * Sprawdza czy mamy wystarczającą liczbę elementów do animacji
     */
    const hasEnoughElements = () => {
      const container = track.parentElement
      if (!container) return false

      // Sprawdź minimalną liczbę elementów
      const minElements = 2
      if (track.children.length < minElements) return false

      // Sprawdź czy elementy wypełniają kontener
      const containerWidth = container.offsetWidth
      const totalElementsWidth = calculateTotalWidth(track.children)

      // Potrzebujemy wystarczająco elementów aby wypełnić kontener 1.5x
      return totalElementsWidth > containerWidth * 1.5
    }

    /**
     * Oblicza łączną szerokość wszystkich elementów
     */
    function calculateTotalWidth(elements: HTMLCollection): number {
      let total = 0
      Array.from(elements).forEach(child => {
        const element = child as HTMLElement
        total += element.offsetWidth + 48 // element + gap (3rem)
      })
      return total
    }

    /**
     * Resetuje pozycję tracka
     */
    function resetTrackPosition(track: HTMLElement) {
      positionRef.current = 0
      track.style.transform = `translateX(0)`
    }

    // Inicjalizacja slidera po załadowaniu elementów
    setTimeout(() => {
      const canAnimate = hasEnoughElements()
      setHasAnimation(canAnimate)

      if (!canAnimate) {
        return // Nie uruchamiaj animacji jeśli za mało elementów
      }

      initializeSliderAnimation(track)
    }, 300)

    /**
     * Inicjalizuje animację slidera
     */
    function initializeSliderAnimation(track: HTMLElement) {
      const container = track.parentElement
      if (!container) return

      // Konfiguracja animacji
      setupAnimation(track)

      // Konfiguracja obsługi myszy
      setupMouseHandlers(track, container)

      // Konfiguracja obsługi zmiany rozmiaru okna
      setupResizeHandlers(container)
    }

    /**
     * Konfiguruje i uruchamia animację
     */
    function setupAnimation(track: HTMLElement) {
      // Funkcja animacji przesuwająca slider i przenosząca elementy
      const animateSlider = () => {
        // Przesuwaj slider
        positionRef.current -= speedRef.current
        track.style.transform = `translateX(${positionRef.current}px)`

        // Sprawdź, czy pierwszy element jest poza ekranem
        if (track.children.length > 0) {
          const firstItem = track.children[0] as HTMLElement
          const itemWidth = firstItem.offsetWidth + 48 // 3rem gap

          // Jeśli element jest poza widokiem, przenieś go na koniec
          if (Math.abs(positionRef.current) > itemWidth) {
            moveFirstElementToEnd(track, itemWidth)
          }
        }

        // Kontynuuj animację
        animationFrameRef.current = requestAnimationFrame(animateSlider)
      }

      // Rozpocznij animację
      animationFrameRef.current = requestAnimationFrame(animateSlider)
    }

    /**
     * Przenosi pierwszy element na koniec i koryguje pozycję
     */
    function moveFirstElementToEnd(track: HTMLElement, itemWidth: number) {
      const element = track.children[0]
      track.appendChild(element)

      // Zresetuj pozycję o szerokość pierwszego elementu
      positionRef.current += itemWidth
      track.style.transform = `translateX(${positionRef.current}px)`
    }

    /**
     * Konfiguruje obsługę zdarzeń myszy (zatrzymanie/wznowienie)
     */
    function setupMouseHandlers(track: HTMLElement, container: HTMLElement) {
      // Obsługa pauzy przy najechaniu myszą
      const handleMouseEnter = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
          animationFrameRef.current = null
        }
      }

      const handleMouseLeave = () => {
        if (!animationFrameRef.current) {
          setupAnimation(track)
        }
      }

      // Dodaj event listenery
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)

      // Funkcja czyszcząca
      trackRef.current?.addEventListener("unmount", () => {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      })
    }

    /**
     * Konfiguruje obsługę zmiany rozmiaru okna
     */
    function setupResizeHandlers(container: HTMLElement) {
      // Dostosuj prędkość na podstawie szerokości kontenera
      const adjustSpeed = () => {
        const containerWidth = container.offsetWidth
        // Dostosuj prędkość do szerokości kontenera
        speedRef.current = Math.max(0.3, containerWidth / 8000)
      }

      // Ustawienie początkowej prędkości
      adjustSpeed()

      // Dodaj nasłuchiwanie zmiany rozmiaru
      const handleResize = () => adjustSpeed()
      window.addEventListener("resize", handleResize)

      // Funkcja czyszcząca
      trackRef.current?.addEventListener("unmount", () => {
        window.removeEventListener("resize", handleResize)
      })
    }

    // Czyszczenie przy odmontowaniu komponentu
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Specjalny event dla cleanup funkcji
      trackRef.current?.dispatchEvent(new Event("unmount"))
    }
  }, [items])

  // Powielanie elementów aby zapewnić płynne przewijanie
  const duplicatedItems = Array(3).fill(items).flat()

  return (
    <section className="relative w-full overflow-hidden bg-white py-10">
      <div className="text-background mb-6 text-center">
        <TextControl {...mapToTextProps(title)} />
      </div>

      <div className={`overflow-hidden ${!hasAnimation ? "flex justify-center" : ""}`}>
        <div
          ref={trackRef}
          className={`flex ${!hasAnimation ? "mx-auto justify-center" : "w-max"}`}
          style={{ gap: "3rem" }}
        >
          {duplicatedItems.map((item, index) => (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-20 min-w-[150px] shrink-0 items-center justify-center transition hover:opacity-80"
            >
              {/* wrapper o stałej wysokości */}
              <div className="slider-logo h-full">
                <ImageControl {...mapToImageProps(item.image)} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
