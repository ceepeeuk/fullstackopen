import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const points = [0, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(points)

  const next = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const vote = () => {
    const copy = [...scores];
    copy[selected] += 1;
    setScores(copy)
  }


  const mostVotes = () => scores.reduce((prev, curr, index) => {
    return scores[prev] >= scores[curr]
      ? prev
      : curr
  }, 0)
  
  const Anecdote = ({text, score}) => {
    return (
      <>
        <div>
          {text}
        </div>
        <div>
          has {score} votes
        </div>
      </>
    )
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} score={scores[selected]} />
      <div>
        <button onClick={vote}>vote</button>
        <button onClick={next}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[mostVotes()]} score={scores[mostVotes()]} />
    </>
  )
}

export default App