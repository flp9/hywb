module.exports = {
    "resultCode": 200,
    "resultMsg": "操作成功",
    "data": [{
        "name": "保护单位名称1",
        "unitName": "所属机构1",
        "description": "保护单位描述1",
        "address": "保护单位地址1",
      },{
        "name": "保护单位名称2",
        "unitName": "所属机构2",
        "description": "保护单位描述2",
        "address": "保护单位地址2",
      }],
    "dataFormat": [{
            //   type: "index",
            //   type: "expand",
            "type": "index",
            "width": "50",
            "label": "序号"
        },
        {
            "label": "保护单位名称",
            "width": "150",
            "cate": "text",
            "prop": "name"
        },
        {
            "label": "所属机构",
            "width": "150",
            "cate": "text",
            "prop": "unitName"
        },
        {
            "label": "保护单位描述",
            "width": "",
            "cate": "text",
            "prop": "description"
        },
        {
            "label": "保护单位地址",
            "width": "150",
            "cate": "text",
            "prop": "address"
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
                    "title": "新建人员",
                },
                {
                    "label": "删除",
                    "action": "Delete",
                    "className": "danger",
                    "title": "更新人员",
                }
            ]
        }
    ]
}