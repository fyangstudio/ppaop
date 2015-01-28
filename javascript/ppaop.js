/**
 *前端切面模式 ppaop：
 * 兼容性：IE6+
 * version: 0.1.0
 *@author：ppfyang(hzyang_fan@corp.netease.com)
 */
(function (_global) {

    // 空函数
    var noop = function () {};

    // 调用声明
    var ppaop = function () {
        return new ppaop.fn.init(Array.prototype.slice.call(arguments));
    }

    // 函数判定
    function isFunction(obj) {
        return {}.toString.call(obj) == "[object Function]";
    }

    ppaop.fn = ppaop.prototype = {

        // 参数初始化
        init: function () {

            var _arg = arguments[0], _argL = _arg.length;

            // 检测obj调用 包括obj和节点事件触发
            if (_argL == 2) {
                if (typeof(_arg[0]) === 'object') {
                    this._targetObj = _arg[0];
                    this._methodName = _arg[1];
                } else {
                    return false;
                }

            // 执行Function调用
            } else if (_argL == 1) {
                if (!isFunction(_arg[0])) return false;
                this._targetObj = null;
                this._methodName = _arg[0];

            // 错误的调用
            } else {
                throw new Error("ppaop: parameter error!");
            }

        },

        // 前插函数
        before: function (_adviceFn) {

            // 目标对象
            var _target = this._targetObj;
            // 目标方法
            var _method = this._methodName;
            // 插入方法
            var _adviceFn = arguments[0] || noop;
            // 原方法
            var _originalFn = !!_target ? _target[_method] : _method;
            // 插值后新方法
            var _newFn = function () {
                (_adviceFn)(), _originalFn.apply(_target || this, arguments);
            }

            // 面向对象调用
            if (!!_target && _target[_method]) {
                _target[_method] = _newFn;

            // 面向方法调用
            } else if (!!_method) {
                _newFn();

            // 错误的调用
            } else {
                throw new Error("ppaop: parameter error!");
            }
        },
        // 后插函数
        after: function () {

            // 目标对象
            var _target = this._targetObj;
            // 目标方法
            var _method = this._methodName;
            // 插入方法
            var _adviceFn = arguments[0] || noop;
            // 原方法
            var _originalFn = !!_target ? _target[_method] : _method;
            // 插值后新方法
            var _newFn = function () {
                _originalFn.apply(_target || this, arguments), (_adviceFn)();
            }

            // 面向对象调用
            if (!!_target && _target[_method]) {
                _target[_method] = _newFn;

                // 面向方法调用
            } else if (!!_method) {
                _newFn();

                // 错误的调用
            } else {
                throw new Error("ppaop: parameter error!");
            }
        }
    }

    ppaop.fn.init.prototype = ppaop.fn;

    _global.ppaop = ppaop;

})(window)