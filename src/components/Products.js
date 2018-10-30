import React, { Component, Fragment } from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'


const cardStyle = {
    border: '1px solid grey',
    height: '500px',
    width: '18rem',
    margin: '10px'
}

const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
    padding: '10px'
}

class Products extends Component {
    render() {
        const {products} = this.props
        return (
            <div className='container settings'>
                <Fragment>
                    <br />
                    <div style={divStyle}>
                        {products.map(product => {
                            return (
                                <div className="card" style={cardStyle} key={product.id}>
                                    <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"><strong>${product.price}</strong></p>
                                        <a href="#" className="btn btn-success">Add To Cart</a>
                                        {/* If user is admin then render below */}
                                        <Link to={`/products/${product.id}`}><button className="btn btn-primary">Edit</button></Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                    <Link to={`/products/create`}><button className="btn btn-outline-secondary">+ Add New Products</button></Link>
                    </div>
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = ({ products }, { categoryId }) => {
    console.log(categoryId)
    if (categoryId){
       products = products.filter( product => {
            console.log(product.categories.find(cat => cat.id === categoryId*1))
           if (product.categories.find(category => category.id === categoryId*1)){
               return true
           }
       })
    }
    console.log(products)
    return {
        products
    }
}

export default connect(mapStateToProps)(Products)
