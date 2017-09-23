'use strict';

import React from 'react';
import { Navigation, Icon } from 'qnui';
import classnames from 'classnames';
import Tools from 'utils/index';
import './index.scss';
const Item = Navigation.Item;
const Group = Navigation.Group;

const linkConfig = {
  //本地localhost或127.0.0.1环境下的路径设置
  local: {
    'index': './#/home',
    'redux': './#/page1',
    'router-home': './#/home',
    'router-page1': './#/page1',
    'router-page2': './#/page2',
  },
  onLine: {//自行根据服务端路径定义
    'index': './#/home',
    'redux': './#/page1',
    'router-home': './#/home',
    'router-page1': './#/page1',
    'router-page2': './#/page2',
  }
}

const links = Tools.isLocal() ? linkConfig.local : linkConfig.onLine;

class SideMenu extends React.Component {

  render() {
    let className = classnames({
      "left-menu": true
    });
    return (
      <div className={className}>
        <Navigation
          style={{ maxWidth: '240px' }}
          type="tree"
          activeDirection="right"
        >
          <Item
            itemid="index"
            className="left-nav-item"
            icon="history"
            text="首页"
            link={links.index} />
          <Item
            itemid="router-group"
            className="left-nav-item"
            icon="attachment"
            text="下拉菜单" >
            <Navigation >
              <Item
                itemid="router-home"
                className="left-nav-item"
                text="home"
                icon="service"
                link={links['router-home']} />
              <Item
                itemid="router-page1"
                className="left-nav-item"
                text="page1"
                icon="training"
                link={links['router-page1']} />
              <Item
                itemid="router-page2"
                className="left-nav-item"
                text="page2"
                icon="electronics"
                link={links['router-page2']} />
            </Navigation>
          </Item>
        </Navigation>
      </div>
    );
  }
}

export default SideMenu;
