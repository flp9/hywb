module.exports = {
    "resultCode": 200,
    "resultMsg": "操作成功",
    "data": {
        "total": 3,
        "totalPage": 1,
        "pageSize": 10,
        "pageNum": 1,
        "items": [{
            "createTime": "2020-05-14 07:35:22",
            "createUser": "admin",
            "updateTime": null,
            "updateUser": null,
            "isDeleted": false,
            "id": "209520f844a14f70ba8abd534fcd4d00",
            "username": "test111",
            "password": "$2a$10$odYgrKURcLGIi6r8IfeRWupl6lGEnZ40NHR8xQlfI/WbrozQXHuOm",
            "icon": null,
            "email": "",
            "nickname": "测试111",
            "isOnline": false,
            "isEnabled": true,
            "loginTime": null,
            "loginIp": null,
            "loginCount": 0
        }, {
            "createTime": null,
            "createUser": null,
            "updateTime": "2020-01-02 09:17:09",
            "updateUser": "admin",
            "isDeleted": false,
            "id": "b45a885e8c9f4c27bff8826ac431e1ea",
            "username": "admin",
            "password": "$2a$10$7huV3mo/xJA/5O9Oiywga..sIczpTSfxCxQK4304jK9azGy5rOc/W",
            "icon": "string",
            "email": "123456@qq.com",
            "nickname": "admin",
            "isOnline": true,
            "isEnabled": true,
            "loginTime": "2020-05-21 01:48:03",
            "loginIp": "192.168.1.138",
            "loginCount": 348
        }, {
            "createTime": null,
            "createUser": null,
            "updateTime": "2020-05-15 01:52:56",
            "updateUser": "admin",
            "isDeleted": null,
            "id": "b97f9fc3918547c89da8481d70d5a3d4",
            "username": "testaaa",
            "password": null,
            "icon": null,
            "email": "",
            "nickname": "测试用户aaa1",
            "isOnline": null,
            "isEnabled": true,
            "loginTime": null,
            "loginIp": null,
            "loginCount": null
        }],
        "dataFormat": [{
            //   type: "index",
            //   type: "expand",
            "type": "selection",
            "width": "50"
        },
        {
            "label": "用户名",
            "width": "150",
            "cate": "text",
            "prop": "username"
        },
        {
            "label": "用户名",
            "width": "150",
            "cate": "text",
            "prop": "nickname"
        },
        {
            "label": "邮箱",
            "width": "",
            "cate": "text",
            "prop": "email"
        },
        {
            "label": "状态",
            "width": "150",
            "cate": "switch",
            "prop": "isEnabled"
        },
        {
            "label": "在线",
            "width": "150",
            "cate": "switch",
            "prop": "isOnline"
        },
        {
            "label": "操作",
            "width": "150",
            "cate": "handle",
            "prop": "handle",
            "btnList": [{
                    "label": "编辑",
                    "action": "Edit",
                    "className": "primary",
                    "title": "更新人员"
                },
                {
                    "label": "删除",
                    "action": "Delete",
                    "className": "danger",
                    "title": "新建人员"
                }
            ]
        }
    ]
    },
    
}