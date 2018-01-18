/* eslint-disable */
import React, {
  Component
} from 'react';
import logo from '../logo.svg';
import './App.css';
import {
  setInterval,
  clearInterval
} from 'timers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      from: 1,
      to: 1,
      total: 0,
      loadingPage: true
      // Objects that used for sorting
      // sortby: 'lastseen',
      // sortorder: 'desc',

      // That should be inside of component with table that need to sort
      // sorting: {lastseen: 'arrow-down'}
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.updateData();
    // Setting interval for updating data
    this.timer = setInterval(() => this.updateData(), 60000);
  }

  componentWillUnmount() {
    console.log("Updating Timer Cleared");
    // Stop updating
    clearInterval(this.timer);
  }

  updateData() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          loadingPage: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          loadingPage: false
        });
      })
  }

  // Changing sorting values. Current method should pass like prop to the inside components
  getSortingObject(sorting){
    this.setState({
        sortby: Object.keys(sorting)[0],
        sortorder: sorting[Object.keys(sorting)[0]] == 'arrow-down' ? 'desc' : 'asc'
    }, () => {
        this.updateData();
    });
  }

  // Changing current page
  changePage(e) {
    let id = e.target.id;
    this.setState({
      loadingPage: true
    }, () => {
      id == 'next' ? this.setState({
        from: this.state.to + 1
      }, this.updateData) : this.setState({
        from: this.state.from - 20
      }, this.updateData);
    });
  }

  // Methods that should be inside of component with table, that need to be sorted

  // changeSorting(e){
  //   let id = e.target.id;
  //   let newsort = {};
  //   if (this.state.sorting[id]){
  //     if(this.state.sorting[id] == 'arrow-down'){
  //       newsort[id] = 'arrow-up';
  //       this.setState({sorting: newsort}, () => {
  //         this.props.getSorted(this.state.sorting);
  //       });
  //     }
  //     else {
  //       newsort[id] = 'arrow-down';
  //       this.setState({sorting: newsort}, () => {
  //         this.props.getSorted(this.state.sorting);
  //       });
  //     }
  //   }
  //   else {
  //     newsort[id] = 'arrow-down';
  //     this.setState({sorting: newsort}, () => {
  //       this.props.getSorted(this.state.sorting);
  //     });
  //   }
  // }

  // handleSelectCity(selected) {
  //   this.setState({city: selected}, () => {
  //     this.props.getCity(this.state.city);
  //   });
  // }


  // DOM elements that should be inside of table component

  // If you want to use <Select /> component you have to install "react-select" module!
  // <Select
  //   name="city"
  //   id="city"
  //   placeholder="City..."
  //   style={{minWidth:150 + 'px'}}
  //   value={this.state.city && this.state.city}
  //   clearable={true}
  //   onChange={this.handleSelectCity}
  //   options={this.props.towns}
  // />
  // </th>
  // <th id="lastseen" onClick={this.changeSorting}>Last Seen<div className={`${this.state.sorting['lastseen']} arrow`}></div></th>

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.state.loadingPage
            ? 'Fetching message from API'
            : this.state.message}
        </p>
        {
          // Page Chooser
          !this.state.loadingPage ? <div className="pageChooserDiv">
          { this.state.from > 1 ? <span className="pageChooser" id="prev" onClick={this.changePage}>&lt; prev</span> : null }
          { `[${this.state.from} - ${this.state.to} of ${this.state.total}]`}
          { this.state.to < this.state.total ? <span className="pageChooser" id="next" onClick={this.changePage}>next &gt;</span> : null}
          </div> : <div className="pageChooserDiv">Loading...</div>
        }
      </div>
    );
  }
}

module.exports = App;