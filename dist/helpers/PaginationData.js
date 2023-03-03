"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paginationData(data, page, limit, count, nameData) {
    return {
        total: count,
        currentPage: page,
        pageSize: data.length,
        totalPage: Math.ceil(count / limit),
        [nameData]: data,
    };
}
exports.default = paginationData;
