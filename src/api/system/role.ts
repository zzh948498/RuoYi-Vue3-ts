import request from '@/utils/request';

// 查询角色列表
export function listRole(query: any) {
    return request({
        url: '/system/role/list',
        method: 'get',
        params: query,
    });
}

// 查询角色详细
export function getRole(roleId: any) {
    return request({
        url: '/system/role/' + roleId,
        method: 'get',
    });
}

// 新增角色
export function addRole(data: any) {
    return request({
        url: '/system/role',
        method: 'post',
        data: data,
    });
}

// 修改角色
export function updateRole(data: any) {
    return request({
        url: '/system/role',
        method: 'put',
        data: data,
    });
}

// 角色数据权限
export function dataScope(data: any) {
    return request({
        url: '/system/role/dataScope',
        method: 'put',
        data: data,
    });
}

// 角色状态修改
export function changeRoleStatus(roleId: any, status: any) {
    const data = {
        roleId,
        status,
    };
    return request({
        url: '/system/role/changeStatus',
        method: 'put',
        data: data,
    });
}

// 删除角色
export function delRole(roleId: any) {
    return request({
        url: '/system/role/' + roleId,
        method: 'delete',
    });
}

// 查询角色已授权用户列表
export function allocatedUserList(query: any) {
    return request({
        url: '/system/role/authUser/allocatedList',
        method: 'get',
        params: query,
    });
}

// 查询角色未授权用户列表
export function unallocatedUserList(query: any) {
    return request({
        url: '/system/role/authUser/unallocatedList',
        method: 'get',
        params: query,
    });
}

// 取消用户授权角色
export function authUserCancel(data: any) {
    return request({
        url: '/system/role/authUser/cancel',
        method: 'put',
        data: data,
    });
}

// 批量取消用户授权角色
export function authUserCancelAll(data: any) {
    return request({
        url: '/system/role/authUser/cancelAll',
        method: 'put',
        params: data,
    });
}

// 授权用户选择
export function authUserSelectAll(data: any) {
    return request({
        url: '/system/role/authUser/selectAll',
        method: 'put',
        params: data,
    });
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId: any) {
    return request({
        url: '/system/role/deptTree/' + roleId,
        method: 'get',
    });
}
