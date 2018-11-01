import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Nav from './Nav'
import Auth from './Auth.js'
import Shop from './Shop.js'
import Cart from './Cart.js'
import OrderDetail from './OrderDetail';
import Orders from './Orders.js'
import Checkout from './Checkout'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/productsReducer.js'
import { fetchCategories } from '../store/categoriesReducer.js'
import { fetchOrders } from '../store/ordersReducer.js'


class App extends Component {

    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchProducts()
        this.props.fetchCategories()
        this.props.fetchOrders()
    }

    render(){
        return(
            <Router>
                <div>
                <Nav/>
                <Route render={ ({ history }) => <Auth history={ history }/>}/>
                <Route exact path = '/' render = {() => <Shop/>}/>
                <Route path = '/user/:userId/cart' render = {({ history }) => <Cart history={ history }/>}/>
                <Route path = '/user/:userId/checkout' render = { ({ history }) => <Checkout history={ history }/> } />
                <Route path = '/user/:userId/orders/:orderId' render = { () => <OrderDetail/> } />
                <Route exact path = '/user/:userId/orders' render = {() => <Orders/>}/>
                <Route path = '/categories/:categoryId' render = {({match}) => <Shop categoryId={match.params.categoryId}/>}/>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(null, mapDispatchToProps)(App)