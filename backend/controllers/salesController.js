const Sales = require('../models/Sales');
const APIFeatures = require('../utils/apiFeatures');

exports.getSales = async (req, res) => {
    try {
        // Execute query with features
        const features = new APIFeatures(Sales.find(), req.query)
            .search()
            .filter()
            .sort()
            .paginate();

        const sales = await features.query;

        // Get total count for pagination (need to apply search/filter but not pagination)
        const countFeatures = new APIFeatures(Sales.find(), req.query)
            .search()
            .filter();
        const total = await countFeatures.query.countDocuments();

        res.status(200).json({
            status: 'success',
            results: sales.length,
            total,
            totalPages: Math.ceil(total / (req.query.limit || 50)),
            currentPage: req.query.page * 1 || 1,
            data: {
                sales,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message,
        });
    }
};

exports.getFilterOptions = async (req, res) => {
    try {
        // Aggregation to get unique values for filters
        const regions = await Sales.distinct('customer.region');
        const genders = await Sales.distinct('customer.gender');
        const categories = await Sales.distinct('product.category');
        const paymentMethods = await Sales.distinct('paymentMethod');
        const tags = await Sales.distinct('tags');

        res.status(200).json({
            status: 'success',
            data: {
                regions,
                genders,
                categories,
                paymentMethods,
                tags
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};
