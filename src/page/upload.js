import React from "react";
import { Upload, message, Button, Icon, Modal } from 'antd';
import CardList from '../component/CardList';
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Uploads extends React.Component {
    constructor(){
        super();
        this.state={
            posts:[],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: '',
                status: 'done',
                url: '',
            }],
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })


    uploadImage = (file) => {
        // ipcRenderer.send('upload-image', file.path);
        // console.log(file.path);
        console.log(file)
        axios({
            url: 'http://localhost:8000/upload',
            method: 'post',
            data: {
              image:  file.path
            },
            transformRequest: [function (data) {
              // Do whatever you want to transform the data
              let ret = '';
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(response => {   
            this.props.history.push('/');
          })  
          .catch(error => {
            console.log(error);
          });
      };

    componentDidMount(){
        axios.get("http://localhost:8000/wallpapers/upload")
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
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );      
        return (
            <div> 
                <Upload
                    action={this.uploadImage}
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                {fileList.length < 0 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt=" " style={{ width: '100%' }} src={previewImage} />
                </Modal>   
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Uploads;