const router = require('express').Router();
const { Order, LineItem, Product, User } = require('../db/models');
const conn = require('../db/conn');


//get all orders
router.get('/', async (req, res, next) => {
    const attr = {
        status: 'CART'
    }
    try {
        let cart = await Order.findOne({ where: attr })
        if(!cart) {
            cart = await Order.create(attr);
        }
        const orders = await Order.findAll({
            include: [ LineItem ],
            order: [['createdAt', 'DESC']]
        })
        res.send(orders);
    }
    catch(ex) {
        next(ex)
    }
})

//reset orders
router.put('/', (req, res, next) => {
  conn.sync({ force : true })
    .then(() => {
        //create products
        Promise.all([
            Product.create({ name : 'Bonsai Tree', description : 'Bonsai is popularized by Japanese people as an art of growing ornamental, dwarf trees. Bonsai Plants is assumed to have the same life cycle of the normal size trees. Growing and taking care of Bonsai’s is one way to relieve stress and will develop as a good hobby. Can be a décor to your home or office. In feng shui, bonsai trees is believe to bring a good luck.', price : 12.69, quantity : 10 }),
            Product.create({ name : 'Heirloom Tomato Seeds', description : '8 individual packets, with each packet having a minimum of 30 seeds', price : 9.97, quantity : 10 }),
            Product.create({ name : 'Fresh Indoor Soil Mix', description : 'Blended for a wide variety of plants. Feeds up to 6 months.', price : 25.99, quantity : 10 }),
            Product.create({ name : 'Spray Bottle', description : 'Great for plants, cats, and everything in between.', price : 2.99, quantity : 10 })
        ])
    })
    .then(()=> {
        //create categories
        Promise.all([
            Category.create({ name : 'Gardening' }),
            Category.create({ name : 'Household Items'})
        ]);
    })
    .then(()=> {
        //create order
        Promise.all([
            Order.create({ status : 'CART' }),
            Order.create({ status : 'COMPLETED', shippingAddress : '5 Hanover Sq, New York, NY 10004', total : 47.85 }),
            Order.create({ status : 'PROCESSING', shippingAddress : '123 abc ave, def, GH 56789', total : 30.00 })
        ]);
    })
    .then(()=> {
        //create line items
        Promise.all([
            LineItem.create({ quantity : 2, price : 12.69 }),
            LineItem.create({ quantity : 3, price : 9.97 }),
            LineItem.create({ quantity : 5, price : 25.99 }),
            LineItem.create({ quantity : 6, price : 2.99 }),
            LineItem.create({ quantity : 1, price : 12.69 }),
            LineItem.create({ quantity : 1, price : 9.97 })
        ]);
    })
    .then(()=> {
        //create reviews
        Promise.all([
            Review.create({ title : 'Best seeds ever!', rating : 5, description : 'With these seeds I was able to grow the most freshest tomatos of all time. 10/10' }),
            Review.create({ title : 'Great multi-purpose spray bottle', rating : 5, description : 'This spray bottle is so versatile. I water my plants all the time with it and when my cat gets annoying, I give him a small spritz!' })
        ]);
    })
    .then(()=> {
        //create users
        Promise.all([
            User.create({ name : 'Sample AuthUser', username : 'sampleAuthUser@gmail.com', password : 'abc123', isAdmin : false, address: ['5 Hanover Sq, New York, NY 10004', 'abc 123st, You, ME 01234'] }),
            User.create({ name : 'Sample Admin', username : 'sampleAdmin@gmail.com', password : 'abc123', isAdmin : true }),
            User.create({ name : 'Sample Guest', username : 'sampleGuest@email.com', password : 'na', isAdmin : false })
        ]);
    })
    .then(users => res.send(users))
    .catch(next)
})


module.exports = router;