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
        return await this.model.updateOne(criteria, updateObj);
    }
    async delete(criteria) {
        return await this.model.delete(object);
    }
    async bulkInsert(data) {
        try {
            let bulk = this.model.collection.initializeOrderedBulkOp();
            data.forEach(element => {
                bulk.insert(element);
            });
            bulk.execute(function() {})
            return;
        } catch (error) {
            console.log(error)
        }
    }
    async getAggregate(criteria) {
        return await this.model.aggregate(criteria)
    }
}
export default BaseModel;