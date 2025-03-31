export default class CustomError extends Error {
    constructor(status, statusText, text, message) {
        super(message)
        this.status = status;
        this.statusText = statusText;
        this.text = text;
        this.name = this.constructor.name;

        console.log(this.toString());
    }

    toString() {
        return `
${this.name}:
- Message: ${this.message}
- Status: ${this.status}
- Status Text: ${this.statusText}
- Text: ${this.text}
`;
    }
}