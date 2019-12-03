class BaseModel {
    constructor(model) {
        this.model = model;
    }

    async get(criteria = {}) {
        return this.model.find(criteria).exec();
    }
    async insert(object){
        return this.model.create(object).exec();
    }
    async update(criteria, updateObj){
        return this.model.update(criteria, updateObj).exec();
    }
    async delete(criteria){
        return this.model.delete(object).exec();
    }
}
export default BaseModel;