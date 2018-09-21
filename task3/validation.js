class ValidationForm {
    constructor(inputIDs, validationRegExes) {
        this.inputIDs = inputIDs;
        this.validationRegExes = validationRegExes;
    }

    init() {
        for (let i = 0; i < this.inputIDs.length; i++) {

            if (this.validationRegExes[i].test(getInput(this.inputIDs[i]))) {

            }
        }
    }
}