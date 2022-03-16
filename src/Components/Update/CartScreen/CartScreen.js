import { Col, Row } from 'react-bootstrap'
import {TotalPrice} from '../../../Assistant/TotalPrice'
import {FilterCartDetials} from '../UseContext/FilterRestarangeProduct'
import { FiShoppingCart } from 'react-icons/fi'
import { useContext } from 'react'



export default function CartScreen(props) {


    const { setYourOrder, yourOrder } = props

    const {filterCartProduct} = useContext(FilterCartDetials)













    return <Row className='justify-content-center' >
        {filterCartProduct?.length === 0 ? null :
            <Col xs={12} ms={12} md={12} lg={12}>
                <div className='basket-box' onClick={() => setYourOrder(!yourOrder)}>
                    <div className='basket-image'>
                        <FiShoppingCart 
                         className='basket2'
                         
                         />
                    </div>

                    <div className='basket-price'>
                        <span>kr {TotalPrice(filterCartProduct)}</span>
                    </div>
                </div>
            </Col>
        }
    </Row>



}