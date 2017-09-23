'use strict';


var QNApi = {
  /*
   * 向当前聊天对象输入框,插入信息
   * @发送内容
   * @用户昵称
   */
  sendMsg: (parm, callbark = () => { }) => {
    console.log(parm);
    QN.wangwang.invoke({
      "cmd": "insertText2Inputbox",
      "param": {
        uid: parm.uid,
        text: parm.sendContent,
        type: 0
      },
      error: function (msg, cmd, param) {
        console.log(msg);
        callbark(msg);
      },
      success: function (rsp, cmd, param) {
        callbark(rsp);
        //alert("成功获取用户信息")
        //alert(JSON.stringify(rsp['user_get_response']['user']['nick']));
      }
    });
  },

  /*
   * 客户信息
   */
  UserMsg: (parm, callbark) => {
    QN.top.invoke({
      "cmd": "taobao.user.get",
      "param": {
        fields: 'user_id,uid,nick,sex,buyer_credit,seller_credit,location,created,last_visit,birthday,type,status,alipay_no,alipay_account,alipay_account,email,consumer_protection,alipay_bind',
        nick: parm.nick,
        fromat: 'json'
      },
      error: function (msg, cmd, param) {
        console.log(msg);
        callbark(msg);
      },
      success: function (rsp, cmd, param) {
        callbark(rsp);
        //alert("成功获取用户信息")
        //alert(JSON.stringify(rsp['user_get_response']['user']['nick']));
      }
    });
  },

  /*
   * 获取千牛版本
   */
  getVersion: (callbark) => {
    QN.application.invoke({
      // category : '类别',//jianyiguanli
      cmd: 'getVersion',//
      param: {/* defined obj */ },
      error: function (msg, categroy, cmd, param) {
        console.log(msg);
        callbark(msg)
      },
      success: function (rsp, categroy, cmd, param) {
        callbark(rsp)
      }
    }
    )
  },

  /*
   * 获取接入列表的当前用户
   */
  getActiveUser: (callbark) => {
    QN.wangwang.invoke({
      cmd: 'getActiveUser',//
      error: function (msg, categroy, cmd, param) {
        console.log(msg);
        callbark(msg)
      },
      success: function (rsp, categroy, cmd, param) {
        callbark(rsp)
      }
    }
    )
  },

  /*
   * 获取接入列表的当前用户
   * status: 0-离线 1-在线 2-移动在线 3-忙碌 4-离开 5-等待呼叫 6-OUTFORDINNER 7-等待  8-隐身
   */
  getContactInfo: (parm, callbark) => {
    QN.wangwang.invoke({
      cmd: 'getContactInfo',//
      param: { uid: parm.uid },
      error: function (msg, categroy, cmd, param) {
        console.log(msg);
        callbark(msg)
      },
      success: function (rsp, categroy, cmd, param) {
        callbark(rsp)
      }
    }
    )
  },

  /*
   *切换联系人触发事件
   */
  contactchanged: (callbark) => {
    QN.event.regEvent({
      eventId: 'wangwang.active_contact_changed',
      error: function (msg, categroy, cmd, param) {
        console.log(msg);
      },
      success: function (rsp, categroy, cmd, param) {
        console.log(rsp);
      },
      notify: function (data, eventId) {
        callbark(data);
      }
    }
    )
  }
};

export default QNApi;
