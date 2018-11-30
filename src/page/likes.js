import React from "react"
import CardList from '../component/CardList'
import axios from 'axios'

// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;

class Likes extends React.Component {
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        axios.get("http://localhost:8000/wallpapers/likes")
            .then(response => {
                console.log(response.data);
                this.setState({
                    posts: response.data
                })      
            })  
            .catch(error => {
                    console.log(error);
            });
    }
    render(){       
        return (
            <div>
                <CardList pics={this.state.posts} />
            </div>
        );
    }

}
export default Likes;