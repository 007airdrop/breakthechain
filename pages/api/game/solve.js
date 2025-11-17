// pages/api/game/solve.js
import { verifyPuzzleAnswer, computeScore } from '../../../lib/puzzle'
import { getPuzzleById, saveScore } from '../../../db'

export default async function handler(req, res) {
  const { address, puzzleId, answer } = req.body
  if (!address || !puzzleId) return res.status(400).json({ error: 'missing' })

  const puzzle = await getPuzzleById(puzzleId)
  if (!puzzle) return res.json({ success:false })

  const ok = verifyPuzzleAnswer(puzzle, answer)
  if (!ok) return res.json({ success:false })

  const score = computeScore(puzzle, answer)
  await saveScore(address, puzzleId, score)
  return res.json({ success:true, score })
}
