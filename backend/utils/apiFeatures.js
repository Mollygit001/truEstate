class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //Search by product or customer
    search() {
        const s = this.queryString.search;
        if (s) {
            const regex = new RegExp(s, "i");
            this.query = this.query.find({
                $or: [
                    { "customer.name": regex },
                    { "customer.phone": regex },
                    { "product.name": regex },
                    { "product.sku": regex }
                ]
            });
        }
        return this;
    }

    //Filtering Logic
    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ["page", "sort", "limit", "fields", "search"];
        excludedFields.forEach((f) => delete queryObj[f]);

        let parsedQuery = JSON.parse(
            JSON.stringify(queryObj).replace(
                /\b(gte|gt|lte|lt)\b/g,
                (match) => `$${match}`
            )
        );

        // Convert ?regions[]=North -> regions: ["North"]
        Object.keys(parsedQuery).forEach((key) => {
            if (key.endsWith("[]")) {
                const newKey = key.replace("[]", "");
                parsedQuery[newKey] = Array.isArray(parsedQuery[key])
                    ? parsedQuery[key]
                    : [parsedQuery[key]];
                delete parsedQuery[key];
            }
        });

        // Map UI Query Keys ➜ Mongo Field Keys
        const filterMap = {
            regions: "customer.region",
            genders: "customer.gender",
            categories: "product.category",
            paymentMethods: "paymentMethod",
            tags: "tags",
            ageMin: "customer.age",
            ageMax: "customer.age"
        };

        Object.keys(filterMap).forEach((key) => {
            if (parsedQuery[key]) {
                const field = filterMap[key];

                if (key === "ageMin" || key === "ageMax") {
                    parsedQuery[field] = parsedQuery[field] || {};
                    parsedQuery[field][key === "ageMin" ? "$gte" : "$lte"] =
                        Number(parsedQuery[key]);
                } else {
                    parsedQuery[field] = {
                        $in: Array.isArray(parsedQuery[key])
                            ? parsedQuery[key]
                            : [parsedQuery[key]]
                    };
                }
                delete parsedQuery[key];
            }
        });

        // Date Range Support
        if (parsedQuery.dateFrom || parsedQuery.dateTo) {
            parsedQuery.date = {};
            if (parsedQuery.dateFrom) parsedQuery.date.$gte = new Date(parsedQuery.dateFrom);
            if (parsedQuery.dateTo) parsedQuery.date.$lte = new Date(parsedQuery.dateTo);
            delete parsedQuery.dateFrom;
            delete parsedQuery.dateTo;
        }

        this.query = this.query.find(parsedQuery);
        return this;
    }

    //Sorting Logic
    sort() {
        const sortParam = this.queryString.sort;
        if (sortParam) {
            const direction = sortParam.startsWith("-") ? -1 : 1;
            const field = sortParam.replace("-", "");
            this.query = this.query.sort({ [field]: direction });
        } else {
            this.query = this.query.sort({ date: -1 });
        }
        return this;
    }

    //Pagination
    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 50;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
