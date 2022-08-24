import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood(good + 1)
  const updateNeutral = () => setNeutral(neutral + 1)
  const updateBad = () => setBad(bad + 1)

  return (
    <>
      <Feedback 
        setGood={updateGood} 
        setNeutral={updateNeutral} 
        setBad={updateBad} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const Button = ({action, text}) => {
  return  (
    <button onClick={() => action()}>{text}</button>
  )      

}

const Feedback = ({setGood, setNeutral, setBad}) => {
  return (
    <div>
      <h1>feedback</h1>
      <Button action={setGood} text="good" />
      <Button action={setNeutral} text="neutral" />
      <Button action={setBad} text="bad" />
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;

  const getAverage = () => total === 0
      ? 0
      : (good - bad) / total;

  const getPositive = () => 
    total === 0
    ? 0
    : good/total * 100;
  
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="all" value={total} />
            <StatisticsLine text="average" value={getAverage()} />
            <StatisticsLine text="positive" value={getPositive()} />
          </tbody>
        </table>
      </div>
    )
  
  }

}

export default App
