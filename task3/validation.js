class ValidationForm {
    constructor(inputIDs, validationRegExes) {
        this.inputIDs = inputIDs;// type string
        this.validationRegExes = validationRegExes;
    }

    init() {
        for (let i = 0; i < this.inputIDs.length; i++) {

            if (this.validationRegExes[i].test(this.getInputValue(this.inputIDs[i]))) {

            }
        }
    }

    getInputValue(ID) {
        let input = document.getElementById(ID);
        return input.value;
    }
}