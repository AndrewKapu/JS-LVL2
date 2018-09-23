/**
 * Класс объекта валидации формы
 */
class ValidationForm {
    /**
     * @constructor Функция конструктор валидации формы
     * @param {string} form ID формы
     * @property {object} patterns Содержит необходимые нам шаблоны для валидации формы
     * @property {object} errors Содержит сообщения об ошибках
     * @property {string} errorClass класс для обозначения ошибки в поле
     */
    constructor(form) {
        this.patterns = {
            name: /^\w+$/,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w.-_]+@\w+\.\w{2,4}$/
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this._validateForm(this.form);
    }

    /**
     * Функкция валидирует форму
     * @param {string} form ID нашей формы
     * @private
     */
    _validateForm(form){
        let formFields = [...document.getElementById(form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
    }

    /**
     * Функция валидирует поля формы
     * @param {HTMLElement} field input, который мы валидируем
     * @private
     */
    _validate(field){
        if (this.patterns[field.name]){
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.toggle('error-alert');
                this._addErrorMsg(field);
                this._watchField(field);
            }
        }
    }

    /**
     * Функция добавляет сообщение об ошибке для пользователя
     * @param {HTMLElement} field Проверяемый input
     * @private
     */
    _addErrorMsg(field){
        let errMsg = document.createElement('div');
        errMsg.classList.add(this.errorClass);
        errMsg.textContent = this.errors[field.name];
        field.parentNode.appendChild(errMsg);
    }
    /**
     * Функция проверяет правильность при вводе
     * @param {HTMLElement} field Проверяемый input
     * @private
     */
    _watchField(field){
        field.addEventListener('input', () => {
            if (this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (field.parentNode.lastChild !== field) {
                    field.parentNode.lastChild.remove();
                }
            } else {
                field.classList.add('invalid');
                field.classList.remove('valid');
                if (field.parentNode.lastChild.nodeName !== 'DIV') {
                    this._addErrorMsg(field);
                }

            }
        })
    }

}