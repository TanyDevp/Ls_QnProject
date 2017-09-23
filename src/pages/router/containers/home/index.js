'use strict';

import React from 'react';
import {
  Notice, Button, Grid, Dialog, Tab
  , Form, Field, Input, Checkbox, Select
} from 'qnui';
import './index.scss';
import QNApi from '../../../../utils/qnapi'

const Row = Grid.Row;
const Col = Grid.Col;
const FormItem = Form.Item;
const Combobox = Select.Combobox;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.field = new Field(this);
  }
  state = {
    titleNum: 3,
    user: '',
    visible: false,
    plist: [
      {
        img: "https://image.cool-de.com/data/attachment/block/55/557b1dc057fc89be4f3842ca44e21338.jpg",
        title: "李益中设计 台山 · 保利中央公馆",
        vol: "163m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/e3/e3d51b988be577a5009a04888063bbca.jpg",
        title: "维恩设计表现作品，附模型下载",
        vol: "179m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/forum/201709/03/222117xg0esh0tuuqmsegu.jpg",
        title: "北欧客厅2012",
        vol: "157m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/27/2723cc3aff4edfb3e00b40bbbc248e3d.jpg",
        title: "归丶隐（农村自建房）",
        vol: "141m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/6c/6c0e248dd3774c27f1a8a473f875bebe.jpg",
        title: "2018年设计流行趋势！",
        vol: "51m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/ff/ff7f86115fd65a685ac87bc80d40f50a.jpg",
        title: "遨锐设计|万科翡翠滨江软装设计 168㎡",
        vol: "185m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/a3/a3bd7b8b752ee92c042d64e971e46bac.jpg",
        title: "触摸式人景交互体验式街区——东莞·万科城市广场",
        vol: "167m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/78/78cdc766726beefb3fb40bc81369b846.jpg",
        title: "杭州陌上设计事务所——静好如初",
        vol: "89m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/e1/e112e5754b34a8856054b70cca89aa5a.jpg",
        title: "工业风客餐厅 3DMAX2012",
        vol: "62m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/ec/ec5c07890a8337a49de4d5e712bf8c69.jpg",
        title: "======落笔视觉表现初秋拙品======",
        vol: "6m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/f2/f2b8d18c751237cd090acc8ea843cecf.jpg",
        title: "日本摄影师工作室兼自宅",
        vol: "101m²"
      },
      {
        img: "https://image.cool-de.com/data/attachment/block/74/741cc6b625bd9de4d608c8f524edb4fe.jpg",
        title: "1°灰——南京澜本设计新作",
        vol: "59m²"
      }
    ]
  }
  getActiveUserInfo() {
    QNApi.getActiveUser((msg) => {
      console.log(msg);
      QNApi.getContactInfo({
        uid: msg.uid
      }, (msg) => {
        console.log(msg);
        this.setState({
          user: msg.nickName
        });
      });
    });
  }

  contactchanged() {
    QNApi.contactchanged((data) => {
      let arr = JSON.parse(data);
      if (arr.newContact) {
        this.setState({
          user: arr.newContact.replace("cntaobao", ""),
          visible: false
        })
      }
    });
  }

  componentDidMount() {
    // this.getActiveUserInfo();
    setTimeout(() => {
      this.getActiveUserInfo();
      this.contactchanged();
    }, 100);

  }

  testClick() {
    this.setState({
      visible: true
    });
    return;
    QNApi.getActiveUser((msg) => {
      console.log(msg);
      QNApi.UserMsg({
        nick: msg.uid.replace('cntaobao', '')
      }, (msg) => {
        console.log(msg);
      });
    });
  }

  onClose() {
    this.setState({
      visible: false
    });
  }

  _sendlog() {
    QNApi.sendMsg({
      sendContent: '聊天内容123',
      uid: 'cntaobao' + this.state.user
    });
  }
  handleSubmit() {

  }

  render() {
    const init = this.field.init;
    return (
      <div>
        <Notice className="NoticeStyle" title="" iconType="next-icon-info" type="warning">
          当前客户：{this.state.user}
        </Notice>
        <Tab defaultActiveKey="tab1">
          <Tab.TabPane key="tab1" tab="客户协商">1111111111
          </Tab.TabPane>
          <Tab.TabPane key="tab2" tab="推荐方案">
            <div style={{ height: '260px', overflowY: 'auto' }}>
              {this.state.plist.map(x => {
                return (<Row>
                  <Col span="8">
                    <img src={x.img}
                      style={{ width: '100%' }}
                      alt={x.title} />
                  </Col>
                  <Col span="16">
                    <p style={{ fontSize: '13px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} title={x.title}>{x.title}</p>
                    <p style={{ fontSize: '12px', color: '#ccc' }}>适合面积：{x.vol}</p>
                    <p style={{ fontSize: '12px' }}><a href="javascript:void(0)" onClick={this._sendlog.bind(this)}>发送链接</a></p>
                  </Col>
                </Row>);
              })}
            </div>
          </Tab.TabPane>
        </Tab>

        <Button type="primary" onClick={this.testClick.bind(this)}>测试按钮2</Button>
        <Dialog visible={this.state.visible}
          onOk={this.onClose.bind(this)}
          onCancel={this.onClose.bind(this)}
          onClose={this.onClose.bind(this)}
          title="客户信息登记"
          style={{ width: '300px' }}
        >
          <Form direction="ver" field={this.field} >
            <FormItem label="用户昵称：">
              <p className="next-form-text-align">{this.state.user}</p>
            </FormItem>
            <FormItem label="定制场景：">
              <Combobox
                // onInputUpdate={this.onInputUpdate.bind(this)}
                multiple
                filterLocal={false}
                fillProps="label"
                placeholder="定制场景(多选)"
                // onChange={onChange}
                dataSource={[{
                  label: "客厅",
                  value: "客厅"
                }, {
                  label: "餐厅",
                  value: "餐厅"
                }, {
                  label: "卧室",
                  value: "卧室"
                }, {
                  label: "书房",
                  value: "书房"
                }, {
                  label: "其他",
                  value: "其他"
                }]} />
            </FormItem>
            <FormItem label="建议风格：">
              <Combobox
                // onInputUpdate={this.onInputUpdate.bind(this)}
                multiple
                filterLocal={false}
                fillProps="label"
                placeholder="建议风格(多选)"
                // onChange={onChange}
                dataSource={[{
                  label: "北欧现代",
                  value: "北欧现代"
                }, {
                  label: "美式乡村",
                  value: "美式乡村"
                }, {
                  label: "简约现代",
                  value: "简约现代"
                }]} />
            </FormItem>
            <FormItem label="空间面积：">
              <Select placeholder="空间面积">
                <Select.Option value="40">40m²以下</Select.Option>
                <Select.Option value="40-50">40m²-50m²</Select.Option>
                <Select.Option value="50-60">50m²-60m²</Select.Option>
                <Select.Option value="60-70">60m²-70m²</Select.Option>
                <Select.Option value="70-80">70m²-80m²</Select.Option>
                <Select.Option value="80-90">80m²-90m²</Select.Option>
              </Select>
            </FormItem>
          </Form>
        </Dialog>
      </div>
    );
  }
}
export default Home;
