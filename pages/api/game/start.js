// pages/api/game/start.js
import { generatePuzzleForWallet } from '../../../lib/puzzle'
import { savePuzzle } from '../../../db'

export default async function handler(req, res) {
  const { address } = req.body
  if (!address) return res.status(400).json({ error: 'no address' })

  // Demo snapshot (replace with real fetch later)
  const snapshot = { tokens: ['ZORA','WETH'], nfts: [{name:'MyNFT', id:123}] }

  const puzzle = generatePuzzleForWallet(address, snapshot)
  await savePuzzle(puzzle)

  // return puzzle (without answer)
  res.json({ puzzle: { id: puzzle.id, title: puzzle.title, hint: puzzle.hint, meta: puzzle.meta }})
}
