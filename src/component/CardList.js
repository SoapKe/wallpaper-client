import { List, Row, Col} from 'antd';
import React from 'react';
import ShowCard from './Card';
// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;


const CardList = ({pics}) =>{ 
    return (
        <List grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4, }}
        dataSource={pics}
        renderItem={(item,i)=>(
            <List.Item type="flex" align="middle">
                <ShowCard id={i} key = {i} item={item}/>
            </List.Item>
        )}        
        />


        // <Row type="flex" justify="center" align="top">
        //     dataSource={pics}
        //     renderItem={(item,i)=>(
        //         <Col span={2}>
        //             <ShowCard id={i} key = {i} item={item}/>
        //         </Col>
        //     )}
           
        // </Row>

/*
        <div>
           {
            pics.map((post,i) => {
                return <ShowCard key={i} item={post}/>
            })
           }
        </div> 
*/
    );
}

export default CardList;