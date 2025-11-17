// db/index.js
const puzzles = {}
const scores = []

export async function savePuzzle(puzzle) {
  puzzles[puzzle.id] = {
    id: puzzle.id,
    address: puzzle.address,
    title: puzzle.title,
    hint: puzzle.hint,
    meta: puzzle.meta,
    answer_hash: puzzle.answerHash,
    created_at: puzzle.createdAt,
    expires_at: puzzle.expiresAt,
    _debug_answer: puzzle._answerPlain
  }
}

export async function getPuzzleById(id) {
  return puzzles[id] || null
}

export async function saveScore(address, puzzleId, score) {
  scores.push({ address, puzzleId, score, solvedAt: new Date().toISOString() })
}
