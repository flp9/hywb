module.exports = {
    "resultCode": 200,
    "resultMsg": "操作成功",
    "data": {
        "items": [{
            "createTime": "2019-08-29 09:31:21",
            "createUser": "",
            "updateTime": "2020-01-07 02:19:50",
            "updateUser": "admin",
            "isDeleted": false,
            "id": "6c669ca6ca444de2b21ec288b6f36b76",
            "roleName": "超级管理员",
            "roleCode": "superadmin",
            "aliasName": "SuperAdmin",
            "isEnabled": true,
            "unitId": "6320a11da1a84c2181f1354485b56356",
            "description": "Superjlkjlkss",
            "location": 0
        }, {
            "createTime": "2020-05-15 02:58:02",
            "createUser": "admin",
            "updateTime": "2020-05-15 08:33:00",
            "updateUser": "admin",
            "isDeleted": false,
            "id": "a827455da481473a8a0100d0b5ff7c94",
            "roleName": "test",
            "roleCode": "test",
            "aliasName": "",
            "isEnabled": true,
            "unitId": "",
            "description": "测试用户11",
            "location": 0
        }, {
            "createTime": "2019-08-29 09:31:24",
            "createUser": "",
            "updateTime": "2019-12-30 10:17:29",
            "updateUser": "admin",
            "isDeleted": false,
            "id": "e5bc89630ed04c11b8e998a1904d5dd6",
            "roleName": "管理员",
            "roleCode": "admin",
            "aliasName": "Admin",
            "isEnabled": true,
            "unitId": "a89bb112bce64617b530d54f4b27871d",
            "description": "Admin",
            "location": 1
        }],
        "dataFormat": [{
                //   type: "index",
                //   type: "expand",
                "type": "selection",
                "width": "50"
            },
            {
                "label": "名称",
                "width": "150",
                "cate": "text",
                "prop": "roleName"
            },
            {
                "label": "标识",
                "width": "150",
                "cate": "text",
                "prop": "roleCode"
            },
            {
                "label": "描述",
                "width": "",
                "cate": "text",
                "prop": "description"
            },
            {
                "label": "是否启用",
                "width": "150",
                "cate": "switch",
                "prop": "isEnabled"
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
                        "title": "更新角色"
                    },
                    {
                        "label": "权限",
                        "action": "Power",
                        "className": "warning",
                        "title": "编辑菜单权限"
                    }
                ]
            }
        ]
    }

}