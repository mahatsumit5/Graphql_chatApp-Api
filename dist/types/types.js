"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Order = void 0;
var Order;
(function (Order) {
    Order["Asc"] = "asc";
    Order["Desc"] = "desc";
})(Order || (exports.Order = Order = {}));
var Status;
(function (Status) {
    Status["Accepted"] = "ACCEPTED";
    Status["Pending"] = "PENDING";
    Status["Rejected"] = "REJECTED";
})(Status || (exports.Status = Status = {}));
