import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ name, onClick }) => (
    <button name={name} onClick={onClick}>{name}</button>
)

const Statistic = ({ name, value }) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

class Statistics extends React.Component {


    render() {
        const { counters, allFeedback } = this.props
        const total = this.total()
        if (total === 0) {
            return 'Ei vielä yhtään palautetta annettu'
        }
        return (
            <table>
                <tbody>
                    {allFeedback.map(({ name }) => (
                        <Statistic key={name} name={name} value={counters[name]} />
                    ))}
                    <Statistic name="keskiarvo" value={this.average(total)} />
                    <Statistic name="positiivisia" value={`${(this.howMany(total).hyvä * 100)} %`} />
                </tbody>
            </table>
        )
    }

    howMany = (total) => {
        return this.props.allFeedback.reduce((proportions, { name }) => ({
            ...proportions,
            [name]: this.props.counters[name] / total || 0
        }), {})
    }
    

    total = () => {
        return this.props.allFeedback.reduce((prev, { name }) =>
            prev + this.props.counters[name]
        , 0)
    }

    average = (total) => {
        if (total === 0) {
            return 0
        }

        const sum = this.props.allFeedback.reduce((prev, { name, value }) => (
            prev + this.props.counters[name] * value
        ), 0)

        return sum / total
    }

}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
}


    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                {App.FEEDBACK.map(({ name }) => (
                    <Button key={name} name={name} onClick={this.addMoreToCounter} />
                ))}
                <h1>Statistiikka</h1>
                <Statistics counters={this.state} allFeedback={App.FEEDBACK} />
            </div>
        )
    }

    addMoreToCounter = ({ target: { name }}) => (
        this.setState((prevState) => ({ [name]: prevState[name] + 1 }))
    )
}

ReactDOM.render(<App />, document.getElementById('root'));