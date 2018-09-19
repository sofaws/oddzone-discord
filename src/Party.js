
export default class Party {

    constructor(owner, adversary, defi, channel) {
        this._defi = defi;
        this._state = "WAIT_NUMBER";
        this._owner = owner;
        this._adversary = adversary;
        this._number = null;
        this._response = null;
        this._channel = channel;
    }


    get channel() {
        return this._channel;
    }

    set channel(value) {
        this._channel = value;
    }

    get response() {
        return this._response;
    }

    set response(value) {
        this._response = value;
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }

    static VerifyAdversary(mentions) {
        return mentions.users.size === 1 && !mentions.everyone;
    }

    ifAlreadyOnParty(parties) {
        let bool = false;
        parties.forEach((party) => {
            if ((party.owner === this._owner || party.owner === this._adversary) && party.state !== "END") bool = true;
            if ((party.adversary === this._owner || party.adversary === this._adversary) && party.state !== "END") bool = true;
        });
        return bool;
    }

    static waitFirstNumberOf(parties, user) {
        let partySelected = -1;
        parties.forEach((party, index) => {
            if (party.adversary === user && party.state === "WAIT_NUMBER") partySelected = index;
        });
        return partySelected;
    }

    static waitNumbers(parties, user) {
        let partySelected = -1;
        parties.forEach((party, index) => {
            if ((party.adversary === user || party._owner === user ) && party.state === "WAIT_NUMBERS") partySelected = index;
        });
        return partySelected;
    }

    static waitNumbersInCounter(parties, user) {
        let partySelected = -1;
        parties.forEach((party, index) => {
            if ((party.adversary === user || party._owner === user ) && party.state === "COUNTER") partySelected = index;
        });
        return partySelected;
    }

    get owner() {
        return this._owner;
    }

    set owner(value) {
        this._owner = value;
    }

    get adversary() {
        return this._adversary;
    }

    set adversary(value) {
        this._adversary = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get defi() {
        return this._defi;
    }

    set defi(value) {
        this._defi = value;
    }
}