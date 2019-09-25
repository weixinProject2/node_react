/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useState } from 'react';
import { Input, Tabs } from 'antd';

import NnvocieIssued from './invoiceIssued';
import NodeDetail from './nodeDetail';
import NoteIssued from './noteIssued';
import NoteThis from './noteThis';
import './index.css'
const { TabPane } = Tabs;
function transcationMan(props){
    function callback(){
        console.log('ss');
    }
   
    return (
        <div className="NoteTabs">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="票据本" key="1">
                    <NoteThis />
                </TabPane>
                <TabPane tab="票据明细" key="2">
                     <NodeDetail/>
                </TabPane>
                <TabPane tab="票据开具" key="3">
                     <NoteIssued/>
                </TabPane>
                <TabPane tab="发票开具" key="4">
                     <NnvocieIssued/>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default transcationMan;