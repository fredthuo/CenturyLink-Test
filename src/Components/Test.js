import React from 'react';
import axios from 'axios';
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            data: '',
            repos: [],
            followers:[],   
            followers_followers:[],
            followers_url: '',
            login:[],
        }
        this.getFollowersInfo = this.getFollowersInfo.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault()
    
        axios
          .get(`https://api.github.com/user/${this.state.Id}`)
          .then(resp => {
            this.setState({data: resp.data})
            this.setState({ Id: '' })
          })
          axios
          .get(`${this.state.data.followers_url}`)
          .then(resp =>{
            this.setState({followers: resp.data})
          })
          axios
          .get(`${this.state.data.repos_url}`)
          .then(resp =>{
            this.setState({repos: resp.data})
          })
        }
    getFollowersInfo = event => {
        const Id = this.state.data.followers.id
        axios
          .get(`https://api.github.com/user/${Id}`)
          .then(resp => {
            this.setState({data: resp.data})
            this.setState({ id: '' })
          }) 
    }

render() {
    const followers_url = this.state.followers_url;
    const Id = this.state.Id;
    return (
        <React.Fragment>
        <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.Id}
              onChange={event => this.setState({ Id: event.target.value })}
              placeholder="GitHub Id"
            //   required
            />
            <button type="submit">View Data</button>
        </form>

        <form onSubmit={this.handleSubmit}>
            <button onClick={event => this.setState({ Id: this.state.data.Id})} type="submit">View Followers</button>
        </form>

        {JSON.stringify(this.state.data)}
        <h3>Followers</h3>
        {JSON.stringify(this.state.followers.fill(1,5))}
        {JSON.stringify(this.state.followers.followers_url)}
        
        <h3>Followers followers</h3>
        {this.state.followers.map((event, key) => {
            return (
                <div key={key}>
                <form onSubmit={this.handleSubmit}>
                    <button onClick={event => this.setState({ followers_url: this.state.data.followers_url})} type="submit">View Followers</button>
                </form> 
                               {event.followers_url}
                               {JSON.stringify(this.state.data)}
                               {JSON.stringify(this.state.followers.fill(1,5))}
                </div>
                
            )
        })
        }
        </React.Fragment>
    )
}
}

export default Test;