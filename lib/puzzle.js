// lib/puzzle.js
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

function sha256(str){ return crypto.createHash('sha256').update(str).digest('hex') }

export function generatePuzzleForWallet(address, snapshot){
  const seed = address.toLowerCase() + JSON.stringify(snapshot) + Date.now().toString().slice(0,5)
  const id = uuidv4()
  const answer = sha256(seed).slice(0,6)
  const title = 'Hex Finder'
  const hint = 'Combine your wallet + tokens to find a 6-char hex. (demo puzzle)'
  const meta = { seedPreview: seed.slice(0,20) }
  const answerHash = sha256(answer)

  return { id, address, seed, title, hint, meta, answerHash, createdAt: new Date().toISOString(), expiresAt: new Date(Date.now()+30*60*1000).toISOString(), _answerPlain: answer }
}

export function verifyPuzzleAnswer(puzzleRow, answer){
  const hash = sha256(answer)
  return hash === puzzleRow.answer_hash || hash === puzzleRow.answerHash || hash === puzzleRow.answerHash
}

export function computeScore(puzzle, answer){
  return 100
}
