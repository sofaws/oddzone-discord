"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Party = function () {
    function Party(owner, adversary, defi, channel) {
        _classCallCheck(this, Party);

        this._defi = defi;
        this._state = "WAIT_NUMBER";
        this._owner = owner;
        this._adversary = adversary;
        this._number = null;
        this._response = null;
        this._channel = channel;
    }

    _createClass(Party, [{
        key: "ifAlreadyOnParty",
        value: function ifAlreadyOnParty(parties) {
            var _this = this;

            var bool = false;
            parties.forEach(function (party) {
                if ((party.owner === _this._owner || party.owner === _this._adversary) && party.state !== "END") bool = true;
                if ((party.adversary === _this._owner || party.adversary === _this._adversary) && party.state !== "END") bool = true;
            });
            return bool;
        }
    }, {
        key: "channel",
        get: function get() {
            return this._channel;
        },
        set: function set(value) {
            this._channel = value;
        }
    }, {
        key: "response",
        get: function get() {
            return this._response;
        },
        set: function set(value) {
            this._response = value;
        }
    }, {
        key: "number",
        get: function get() {
            return this._number;
        },
        set: function set(value) {
            this._number = value;
        }
    }, {
        key: "owner",
        get: function get() {
            return this._owner;
        },
        set: function set(value) {
            this._owner = value;
        }
    }, {
        key: "adversary",
        get: function get() {
            return this._adversary;
        },
        set: function set(value) {
            this._adversary = value;
        }
    }, {
        key: "state",
        get: function get() {
            return this._state;
        },
        set: function set(value) {
            this._state = value;
        }
    }, {
        key: "defi",
        get: function get() {
            return this._defi;
        },
        set: function set(value) {
            this._defi = value;
        }
    }], [{
        key: "VerifyAdversary",
        value: function VerifyAdversary(mentions) {
            return mentions.users.size === 1 && !mentions.everyone;
        }
    }, {
        key: "waitFirstNumberOf",
        value: function waitFirstNumberOf(parties, user) {
            var partySelected = -1;
            parties.forEach(function (party, index) {
                if (party.adversary === user && party.state === "WAIT_NUMBER") partySelected = index;
            });
            return partySelected;
        }
    }, {
        key: "waitNumbers",
        value: function waitNumbers(parties, user) {
            var partySelected = -1;
            parties.forEach(function (party, index) {
                if ((party.adversary === user || party._owner === user) && party.state === "WAIT_NUMBERS") partySelected = index;
            });
            return partySelected;
        }
    }, {
        key: "waitNumbersInCounter",
        value: function waitNumbersInCounter(parties, user) {
            var partySelected = -1;
            parties.forEach(function (party, index) {
                if ((party.adversary === user || party._owner === user) && party.state === "COUNTER") partySelected = index;
            });
            return partySelected;
        }
    }]);

    return Party;
}();

exports.default = Party;