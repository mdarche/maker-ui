'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Section } from '@maker-ui/layout'
import { Modal } from '@maker-ui/modal'
import { useCountdown } from '@maker-ui/hooks'
// import { useCountdown } from '@maker-ui/hooks'

interface Time {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function ModalPage() {
  const [showModal, setModal] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const countdown = useCountdown(new Date(Date.now() + 10000))

  console.log(countdown)
  // const intervalRef = useRef<number | null>(null)

  // // const countdown = useCountdown(new Date(Date.now() + 1000000))

  // // console.log('Countdown is', countdown)
  // const [timeLeft, setTimeLeft] = useState<Time | undefined>(undefined)
  // const [timeRemaining, setTimeRemaining] = useState(new Date(0, 0, 0, 0, 5))

  // console.log('TimeRemaining is', timeRemaining)

  // const clearTimer = useCallback(() => {
  //   // Only clear if the timer is running
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current)
  //   }
  // }, [])

  // const startTimer = () => {
  //   // Ignore if there's already a timer running
  //   // if (intervalRef.current) return

  //   intervalRef.current = window.setInterval(() => {
  //     setTimeRemaining((t) => new Date(t.getTime() - 1000))
  //   }, 1000)
  // }

  // useEffect(() => {},[])

  // useEffect(() => {
  //   intervalRef.current = window.setInterval(() => {
  //     setTimeRemaining((t) => new Date(t.getTime() - 1000))
  //   }, 1000)

  //   return () => clearTimer()
  // }, [clearTimer])

  return (
    <>
      <Section>
        {/* <h1>{formatDate(timeRemaining)}</h1>
        <button onClick={startTimer}>Start</button>
        <button onClick={clearTimer}>Stop</button> */}
        <br />
        <br />
        <br />
        <button ref={ref} onClick={(e) => setModal(!showModal)}>
          Toggle Modal
        </button>
        <button>Fake button</button>
        <br />
        <br />
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nost
        </p>
        <p>
          Vivamus posuere condimentum leo eu hendrerit. Pellentesque placerat
          iaculis ante a rhoncus. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Vestibulum eu ipsum ac magna congue congue sed
          maximus tortor. Vivamus id odio elementum, vehicula nunc ut, efficitur
          felis. Nullam hendrerit velit libero, gravida porttitor tortor
          ullamcorper eu. Ut ut lectus non enim sagittis aliquam quis in orci.
          Donec a arcu eu eros cursus cursus. Donec dictum dignissim tellus,
          dictum egestas purus pellentesque sed
        </p>
        <Modal
          id="modal-root"
          show={showModal}
          set={setModal}
          focusRef={ref}
          closeOnBlur
          center>
          {/* <div style={{ height: 2000, width: 500, background: '#fff' }}>test</div> */}
          <div>Hello!</div>
          <button className="target-button">Test</button>
          <button>Yo</button>
          <button>Ya</button>
          <a href="https://google.com" rel="noreferrer" target="_blank">
            Google link
          </a>
        </Modal>
      </Section>
    </>
  )
}
