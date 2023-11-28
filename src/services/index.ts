import axios from "@/utils/axios";
const prefixIamApi = "apis/v1/services/iam/"

interface List<Authority> {
    pagination: Pagination
    items: Authority[]

}
interface Authority {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}
interface Pagination {
    pageSize: Number,
    pageTotal: Number,
    itemsTotal: Number,
    nextPageToken: string
}
export async function listAuthority(payload: {groupId: string, pageToken: string, pageSize: Number}): Promise<List<Authority>> {
   const res =  await axios({
        url: prefixIamApi+"authorities",
        method: 'get',
        params: payload
    })
    return res.data
}

interface Group {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}

export function listGroup(payload: {pageToken: string, pageSize: Number}): Promise<Group> {
   return axios({
        url: prefixIamApi+"groups",
        method: 'get',
        params: payload
    })
}