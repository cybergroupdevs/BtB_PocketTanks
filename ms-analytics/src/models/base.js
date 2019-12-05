class BaseModel {
    constructor(model) {
        this.model = model;
    }

    async get(criteria = {}, limit = null, sort = { createdAt: 1 }) {
        if (sort && limit) {
            return await this.model.find(criteria).sort(sort).limit(parseInt(limit))
        } else {
            return await this.model.find(criteria).sort(sort)
        }
    }
    async insert(object) {
        return await this.model.create(object);
    }
    async update(criteria, updateObj) {
        return this.model.update(criteria, updateObj).exec();
    }
    async delete(criteria) {
        return this.model.delete(object).exec();
    }
}
export default BaseModel;
