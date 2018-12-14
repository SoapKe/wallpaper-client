import React from "react"
import CardList from '../component/CardList'
import axios from 'axios'
import { Button, Radio, Icon } from 'antd';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Likes extends React.Component {
    constructor(){
        super();
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        axios.get("http://localhost:8000/wallpapers/collections")
        .then(response => {
            this.setState({
                posts: response.data
            })      
        })  
        .catch(error => {
                console.log(error);
        });
    }

    handleDownload(){
        var urls;
        urls = this.state.posts.map((item) => item.url);
        ipcRenderer.send('download_all', urls);
    }

    render(){       
        return (
            <div>
                <Button type="primary" icon="download" size="large" onClick={() => this.handleDownload()}>Download</Button>
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Likes;