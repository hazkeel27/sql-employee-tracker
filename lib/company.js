// parent class
class Company {
    view() {
        throw new Error(`Company class's children must implement view() method`);
    }

    enter() {
        throw new Error(`Company class's children must implement enter() method`);
    }
}

module.exports = Company;