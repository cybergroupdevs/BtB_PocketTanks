class BaseModel {
    constructor(model) {
        this.model = model;
    }

    async get(criteria = {}, limit = null, sort = {
        createdAt: 1
    }) {
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
    async bulkInsert(data) {
        let bulk = this.model.collection.initializeOrderedBulkOp();
        data.forEach(element => {
            bulk.insert(element);
        });
        bulk.execute(function() {})
        return;
    }
}
export default BaseModel;