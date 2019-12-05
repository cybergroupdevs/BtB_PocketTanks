class BaseModel {
    constructor(model) {
        this.model = model;
    }

    async get(criteria = {}) {
        return await this.model.find(criteria);
    }
    async insert(object){
        return await this.model.create(object);
    }
    async update(criteria, updateObj){
        return this.model.update(criteria, updateObj).exec();
    }
    async delete(criteria){
        return this.model.delete(object).exec();
    }
}
export default BaseModel;