const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
    const sum = parts
        .map(part => part.exercises)
        .reduce((agg, val) => {
            return agg + val;
        },0);
    return (
        <p><b>Total of {sum} exercises</b></p>
    )
}

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => <> { parts.map(part => <Part key={part.id} part={part} /> )} </>

const Course = ({course}) => {
    const {id, name, parts} = course
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course