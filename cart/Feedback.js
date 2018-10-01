class Feedback {
    constructor(source, container = '#feedbackWrapper') {
        this.source = source;
        this.container = container;
        this.reviews = [];
        this._init(this.source);
    }

    _init(source) {
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let review of data) {
                    this.reviews.push(review);
                    this._renderReview(review);
                }
            });
        this._renderForm(this.container);
    }

    _renderReview(review) {
        let $customerName = $('<div/>', {
            class: 'customer-name-wrapper'
        });
        let $customerReview = $('<p/>', {
            class: 'customer-review-text'
        });
        $customerName.appendTo($(this.container));
        $customerReview.appendTo($(this.container));

        $customerName.append(`${review.author}`);
        $customerReview.append(`${review.text}`);
    }

    _renderForm(container) {
        let $reviewForm = $('<form/>', {
            class: 'feedback-form'
        });
        let $reviewInput = $('<input>', {
            type: 'name'
        });
        let $reviewText = $('<textarea>');
        $reviewForm.append($reviewInput);
        $reviewForm.append($reviewText);
        $(container).append($reviewForm);

    }

}