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

    howMany = (total) => {
        return this.props.feedbackTypes.reduce((proportions, { name }) => ({
            ...proportions,
            [name]: this.props.counters[name] / total || 0
        }), {})
    }
    

    total = () => {
        return this.props.feedbackTypes.reduce((prev, { name }) =>
            prev + this.props.counters[name]
        , 0)
    }

    average = (total) => {
        if (total === 0) {
            return 0
        }

        const sum = this.props.feedbackTypes.reduce((prev, { name, value }) => (
            prev + this.props.counters[name] * value
        ), 0)

        return sum / total
    }



    render() {
        const { counters, feedbackTypes } = this.props
        const total = this.total()
        if (total === 0) {
            return 'Ei vielä yhtään palautetta annettu'
        }
        return (
            <table>
                <tbody>
                    {feedbackTypes.map(({ name }) => (
                        <Statistic key={name} name={name} value={counters[name]} />
                    ))}
                    <Statistic name="keskiarvo" value={this.average(total)} />
                    <Statistic name="positiivisia" value={`${(this.howMany(total).hyvä * 100)} %`} />
                </tbody>
            </table>
        )
    }
}

class App extends React.Component {

    static FEEDBACK = [
        {
            name: 'hyvä',
            value: 1
        },
        {
            name: 'neutraali',
            value: 0
        },
        {
            name: 'huono',
            value: -1
        }
    ]

    state = App.FEEDBACK.reduce((state, { name }) => ({
        ...state,
        [name]: 0
    }), {})

    handleIncrement = ({ target: { name }}) => (
        this.setState((prevState) => ({ [name]: prevState[name] + 1 }))
    )

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                {App.FEEDBACK.map(({ name }) => (
                    <Button key={name} name={name} onClick={this.handleIncrement} />
                ))}
                <h1>statistiikka</h1>
                <Statistics counters={this.state} feedbackTypes={App.FEEDBACK} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));