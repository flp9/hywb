module.exports = {
    "resultCode": 200,
    "resultMsg": "操作成功",
    "data": {
        "items": [{
            "createTime": "2020-05-12 10:05:25",
            "createUser": "admin",
            "updateTime": "2020-05-14 01:52:38",
            "updateUser": null,
            "isDeleted": null,
            "id": "80ff3b7d64334a7cbfbd907a902850d6",
            "parentId": "",
            "unitName": "xxxx机构",
            "aliasName": null,
            "unitCode": "",
            "description": "",
            "address": "xxx地点11",
            "telephone": "xxx",
            "email": "",
            "website": "",
            "location": null,
            "children": [],
            "parentName": ""
        }, {
            "createTime": null,
            "createUser": "admin",
            "updateTime": "2020-04-08 01:57:02",
            "updateUser": null,
            "isDeleted": null,
            "id": "9c9bb6c099b944ac877f21751e469ca3",
            "parentId": "",
            "unitName": "河北华友古建筑工程股份有限公司",
            "aliasName": null,
            "unitCode": "",
            "description": "",
            "address": "河北",
            "telephone": "",
            "email": "",
            "website": "",
            "location": null,
            "children": [{
                "createTime": "2020-01-19 07:54:00",
                "createUser": "admin",
                "updateTime": null,
                "updateUser": null,
                "isDeleted": null,
                "id": "792579c453794d88ad6baeb2de4a6751",
                "parentId": "9c9bb6c099b944ac877f21751e469ca3",
                "unitName": "一层机构",
                "aliasName": null,
                "unitCode": "",
                "description": "",
                "address": "一层机构地址",
                "telephone": "",
                "email": "",
                "website": "",
                "location": null,
                "children": [{
                    "createTime": "2020-01-19 07:54:33",
                    "createUser": "admin",
                    "updateTime": null,
                    "updateUser": null,
                    "isDeleted": null,
                    "id": "d02bdb8f46b848da98a7ac5303a07a7d",
                    "parentId": "792579c453794d88ad6baeb2de4a6751",
                    "unitName": "二层机构",
                    "aliasName": null,
                    "unitCode": "",
                    "description": "",
                    "address": "二层机构地址",
                    "telephone": "",
                    "email": "",
                    "website": "",
                    "location": null,
                    "children": [],
                    "parentName": "一层机构"
                }],
                "parentName": "河北华友古建筑工程股份有限公司"
            }, {
                "createTime": "2020-01-19 07:58:46",
                "createUser": "admin",
                "updateTime": null,
                "updateUser": null,
                "isDeleted": null,
                "id": "f11d01823fac4b86b4f2e18afd41800e",
                "parentId": "9c9bb6c099b944ac877f21751e469ca3",
                "unitName": "一层机构A",
                "aliasName": null,
                "unitCode": "",
                "description": "",
                "address": "一层机构地址A",
                "telephone": "",
                "email": "",
                "website": "",
                "location": null,
                "children": [],
                "parentName": "河北华友古建筑工程股份有限公司"
            }],
            "parentName": ""
        }],
        "dataFormat": [{
                "label": "机构名称",
                "width": "350",
                "cate": "text",
                "prop": "unitName"
            },
            {
                "label": "地址",
                "width": "",
                "cate": "text",
                "prop": "address"
            },
            {
                "label": "登记人",
                "width": "180",
                "cate": "text",
                "prop": "createUser"
            },
            {
                "label": "登记时间",
                "width": "180",
                "cate": "text",
                "prop": "updateTime"
            },
            {
                "label": "操作",
                "width": "180",
                "cate": "handle",
                "prop": "handle",
                "btnList": [{
                        "label": "编辑",
                        "action": "Edit",
                        "className": "primary",
                        "title": "编辑机构"
                    },
                    {
                        "label": "删除",
                        "action": "Delete",
                        "className": "danger",
                        "title": "添加机构"
                    }
                ]
            }
        ]
    }

}