'use strict';

import React from 'react';
import {Link}  from 'react-router'
import './index.scss';
import Tools from 'utils/index';
import {Navigation,Icon,Menu} from 'qnui';
const {Item, Group} = Navigation

const linkConfig = {
  //本地localhost或127.0.0.1环境下的路径设置
  local: {
    'home': '/home',
    'page1': '/page1',
    'page2': '/page2',
  },
  onLine: {//自行根据服务端路径定义
    'home': '/home',
    'page1': '/page1',
    'page2': '/page2',
  }
}

const links = Tools.isLocal() ? linkConfig.local : linkConfig.onLine;

class Header extends React.Component {

 turnHref(){
   
 }

  render() {
    return (
       <Navigation
        type="filling"
        activeDirection="bottom"
        style={{'minWidth':'320px'}}
        >
        <Item
            itemid="1"
            text="菜单"
            icon="service"
            >
                <Menu>
                    <Menu.Item key="1"><Link to={links.home}>首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={links.page1}>page1</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={links.page2}>page2</Link></Menu.Item>
                    <Menu.PopupItem label="other" key="5">
                      <Menu>
                        <Menu.Item key="11">Option 1</Menu.Item>
                      </Menu>
                    </Menu.PopupItem>
                </Menu>
            </Item>
            <Item
                itemid="2"
                text="按钮"
                icon="training"
                >
            </Item>
        <li className="navigation-toolbar">
          <ul>
            <li>
              <Icon type="set" />
              <span>设置</span>
            </li>
          </ul>
        </li>
    </Navigation>
    );
  }
}
export default Header;
