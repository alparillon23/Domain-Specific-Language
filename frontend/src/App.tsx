import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const variants = {
  left: {
    x: -150,
    borderRadius: 8,
  },
  right: {
    x: 150,
    borderRadius: 128,
  },
}

function App() {
  const [animate, setAnimate] = useState(false)
  return (
    <Main className="w-full flex flex-col items-center justify-center">
      <motion.div
        variants={variants}
        animate={animate ? 'left' : 'right'}
        className="w-32 h-32 bg-blue-600 shadow-lg"
      ></motion.div>
      <section className="mt-16">
        <button
          className="text-base bg-gray-200 rounded-md text-black px-4 py-2 font-semibold"
          onClick={() => setAnimate((prev) => !prev)}
        >
          Click me!
        </button>
      </section>
    </Main>
  )
}

export default App

const Main = styled.main`
  height: 100vh;
`
