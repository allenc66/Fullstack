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
            <Statisticline name = {'good'} value ={good} />
            <Statisticline name = {'neutral'} value ={neutral} />
            <Statisticline name = {'bad'} value ={bad} />
            <Statisticline name = {'all'} value ={all} />
            <Statisticline name = {'average'} value ={(good-bad)/all} />
            <Statisticline name = {'positive'} value ={String(good/all *100) + ' %'} />
            </tbody>
        </table>
      </div>
    )
    }
export {Statistics}