"use strict";
exports.__esModule = true;
var Pointc = /** @class */ (function () {
    function Pointc(x, y) {
        this.x = x;
        this.y = y;
        this.z = 100;
    }
    Pointc.prototype.getZ = function () {
        return this.z;
    };
    Pointc.prototype.setZ = function (val) {
        this.z = val;
    };
    Pointc.prototype.selfmethod = function () {
        console.log("Selfmethod");
    };
    return Pointc;
}());
exports.Pointc = Pointc;
