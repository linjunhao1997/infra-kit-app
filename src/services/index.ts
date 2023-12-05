import axios from "@/utils/axios";
const prefixIamApi = "apis/v1/services/iam/"

interface List<T> {
    pagination: Pagination
    items: T[]
}
interface Authority {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}
interface Group {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}

interface Namespace {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}

interface Org {
    id: string
    code: string
    name: string
    ctime: string
    mtime: string
}

interface User {
    id: string
    name: string
    email: string
    ctime: string
    mtime: string
}


interface Pagination {
    pageSize: Number,
    pageTotal: Number,
    itemsTotal: Number,
    nextPageToken: string
}


export async function listAuthority(payload: {groupId?: string, pageToken?: string, pageSize?: number}): Promise<List<Authority>> {
   const res =  await axios({
        url: prefixIamApi+"authorities",
        method: 'get',
        params: payload
    })
    return res.data
}


export async function listGroup(payload: {pageToken?: string, pageSize?: number}): Promise<List<Group>> {
   const res = await axios({
        url: prefixIamApi+"groups",
        method: 'get',
        params: payload
    })
    return res.data
}

export async function listOrg(payload: {pageToken?: string, pageSize?: number}): Promise<List<Org>> {
    const res = await axios({
         url: prefixIamApi+"orgs",
         method: 'get',
         params: payload
     })
     return res.data
}

export async function listNamespace(payload: {pageToken?: string, pageSize?: number}): Promise<List<Namespace>> {
    const res = await axios({
         url: prefixIamApi+"namespaces",
         method: 'get',
         params: payload
     })
     return res.data
}

export async function listUser(payload: {pageToken?: string, pageSize?: number}): Promise<List<User>> {
    const res = await axios({
         url: prefixIamApi+"users",
         method: 'get',
         params: payload
     })
     return res.data
}

export async function createAuthority(payload: {code: string, name: string}): Promise<Authority> {
    const res =  await axios({
         url: prefixIamApi+"authorities",
         method: 'post',
         data: payload
     })
     return res.data
 }

 export async function createGroup(payload: {orgCode: string, code: string, name: string}): Promise<Group> {
    const res =  await axios({
         url: prefixIamApi+"groups",
         method: 'post',
         data: payload
     })
     return res.data
 }

 export async function createOrg(payload: {code: string, name: string}): Promise<Org> {
    const res =  await axios({
         url: prefixIamApi+"orgs",
         method: 'post',
         data: payload
     })
     return res.data
 }

 export async function createNamespace(payload: {code: string, name: string}): Promise<Namespace> {
    const res =  await axios({
         url: prefixIamApi+"namespaces",
         method: 'post',
         data: payload
     })
     return res.data
 }

 export async function createUser(payload: {email: string, name: string}): Promise<User> {
    const res =  await axios({
         url: prefixIamApi+"users",
         method: 'post',
         data: payload
     })
     return res.data
 }