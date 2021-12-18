const Total = ({exercises}) => {
    const NewArr = exercises.map((element) => element.exercises)
    const total = NewArr.reduce((res,cur) => res + cur)
    console.log(NewArr)
    return (
        <p>Total of {total} exercises </p>
    )
}

export {Total}