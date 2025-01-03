// services/elasticsearchService.js
const { Client } = require('@elastic/elasticsearch');

console.log('Elasticsearch URL:', process.env.ELASTICSEARCH_URL); // Debugging line

const client = new Client({ node: process.env.ELASTICSEARCH_URL });

async function indexProduct(product) {
    await client.index({
        index: 'products',
        id: product._id.toString(),
        body: {
            name: product.name,
            description: product.description,
            price: product.price,
        },
    });
}

async function searchProducts(query) {
    const { body } = await client.search({
        index: 'products',
        body: {
            query: {
                multi_match: {
                    query: query,
                    fields: ['name', 'description'],
                },
            },
        },
    });
    return body.hits.hits.map(hit => hit._source);
}

module.exports = { indexProduct, searchProducts };