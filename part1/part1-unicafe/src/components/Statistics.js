import { Statisticline } from "./Statisticline"

const Statistics = (props) => {
    const {good, neutral, bad} = props 
    const all = good + neutral + bad
  
    if (all === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
  
    return (
      <div>
        <table>
            <tbody>
            <Statisticline text = 'good' value ={good} />
            <Statisticline text = 'neutral' value ={neutral} />
            <Statisticline text = 'bad' value ={bad} />
            <Statisticline text = 'all' value ={all} />
            <Statisticline text = 'average' value ={(good-bad)/all} />
            <Statisticline text = 'positive' value ={String(good/all *100) + ' %'} />
            </tbody>
        </table>
      </div>
    )
    }
export {Statistics}