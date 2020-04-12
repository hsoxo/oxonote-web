import {v4 as uuid} from "uuid";
import { JournalType } from "@/types/journal";

export function defaultJournal(): JournalType {
    return {
        _id: uuid(),
        _rev: '',
        title: '',
        titleIcon: '',
        bannerPic: '',
        createdTime: new Date().getTime(),
        createdUser: '',
        description: '',
        views: [{
            type: 'list',
            viewId: uuid(),
            label: '全部文档',
            attribute: [],
            filters: {
                relation: 'and',
                settings: [],
            },
            sorts: [],
        }],
        jourAttrs: [
            {
                attrId: uuid(),
                type: "1",
                label: '创建时间',
            },
            {
                attrId: uuid(),
                type: "2",
                label: '最后修改时间',
            },
            {
                attrId: uuid(),
                type: "3",
                label: '创建人',
            },
            {
                attrId: uuid(),
                type: "4",
                label: '最后修改人',
            }
        ]
    }
}

