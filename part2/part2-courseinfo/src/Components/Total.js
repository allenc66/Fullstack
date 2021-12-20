const Total = ({exercises}) => {
    console.log(exercises)
    const NewArr = exercises.map((course) => course.exercises)
    const total = NewArr.reduce((res,cur) => res + cur)
    return <p style={{fontWeight: "bold"}}>total of {total} exercises </p> 
        }
        
    

export {Total}