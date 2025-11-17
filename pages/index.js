// pages/index.js
import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [address, setAddress] = useState('')
  const [puzzle, setPuzzle] = useState(null)
  const [status, setStatus] = useState('idle')
  const [answer, setAnswer] = useState('')

  async function connectMock() {
    // Mock address for demo/testing on Vercel (no wallet needed)
    const mock = '0x1234567890abcdef1234567890abcdef12345678'
    setAddress(mock)
  }

  async function start() {
    setStatus('loading')
    const res = await fetch('/api/game/start', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ address })
    })
    const j = await res.json()
    if (j.puzzle) {
      setPuzzle(j.puzzle)
      setStatus('playing')
    } else {
      setStatus('error')
      alert('Error starting puzzle')
    }
  }

  async function submit() {
    setStatus('checking')
    const res = await fetch('/api/game/solve', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ address, puzzleId: puzzle.id, answer })
    })
    const j = await res.json()
    if (j.success) {
      setStatus('won')
      alert('Nice! score: ' + j.score)
    } else {
      setStatus('wrong')
      alert('Wrong answer, try again.')
    }
  }

  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:title" content="BreakTheChain" />
        <meta property="fc:frame:desc" content="Unique wallet puzzle from your tokens & NFTs (demo)." />
        <meta property="fc:frame:image" content="https://%YOUR_DOMAIN%/frames/card.png" />
        <meta property="fc:frame:button:1" content="Start" />
        <meta property="fc:frame:post_url" content="https://%YOUR_DOMAIN%/" />
        <title>BreakTheChain</title>
      </Head>
      <main style={{padding:20, fontFamily:'sans-serif'}}>
        <h1>BreakTheChain (demo)</h1>
        <p>Connect wallet or use mock address for testing.</p>

        {!address ? (
          <div>
            <button onClick={connectMock}>Use Mock Wallet (fast)</button>
          </div>
        ) : (
          <div>
            <div>Address: {address}</div>
            <div style={{marginTop:12}}>
              <button onClick={start}>Start Puzzle</button>
            </div>
          </div>
        )}

        {status === 'playing' && puzzle && (
          <div style={{marginTop:20}}>
            <h3>{puzzle.title}</h3>
            <p>{puzzle.hint}</p>
            <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Type answer" />
            <div style={{marginTop:8}}>
              <button onClick={submit}>Submit Answer</button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
