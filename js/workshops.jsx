import React from 'react';
import ReactDOM from 'react-dom';

class CategoryRow extends React.Component {
    render() {
        return (<tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>);
    }
}

class CatRow extends React.Component {
    render() {
        var name = this.props.kitty.likesKids ?
            this.props.kitty.name :
            <span style={{color: 'red'}}>
        {this.props.kitty.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.kitty.age}</td>
            </tr>
        );
    }
}

class CatTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.likesKids)
        this.props.kitties.forEach((kitty) => {
            if (kitty.name.indexOf(this.props.filterText) === -1 || (!kitty.likesKids && this.props.likesKids)) {
                return;
            }
            if (kitty.category !== lastCategory) {
                rows.push(<CategoryRow category={kitty.category} key={kitty.category}/>);
            }
            rows.push(<CatRow kitty={kitty} key={kitty.name}/>);
            lastCategory = kitty.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTextChange = (e) => {
        this.props.onTextInput(e.target.value);
    }

    handleCheckBoxChange = (e) => {
        this.props.onCheckBoxInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText}
                       onChange={this.handleTextChange}/>
                <p>
                    <input type="checkbox" checked={this.props.likesKids} onChange={this.handleCheckBoxChange}/>
                    Only show kitties that like little kids.
                </p>
            </form>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            likesKids: false
        };

    }

    handleTextInput = (filterText) => {
        this.setState({
            filterText: filterText
        });
    }

    handleCheckBoxInput = (likesKids) => {
        this.setState({
            likesKids: likesKids
        })
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} likesKids={this.state.likesKids}
                           onTextInput={this.handleTextInput} onCheckBoxInput={this.handleCheckBoxInput}/>
                <CatTable kitties={this.props.kitties} filterText={this.state.filterText}
                          likesKids={this.state.likesKids}/>
            </div>
        );
    }
}


var kitties = [
    {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
    {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
    {category: "male", age: "2", likesKids: false, name: "Grumpy"},
    {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
    {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
    {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
];

ReactDOM.render(
    <App kitties={kitties}/>,
    document.getElementById('app')
);
