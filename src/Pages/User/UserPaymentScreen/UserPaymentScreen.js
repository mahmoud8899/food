
import { Container, Col, Row } from 'react-bootstrap'
import UserNavBarScreen from '../UserNavBarScreen/UserNavBarScreen'
import '../UserProfileScreen/Profile.css'
import Styles from '../UserProfileScreen/style'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserPaymentDerail from './UserPaymentDerail'
import Title from '../../../Components/ScreenTitle/ScreenTitle'
import ShowDetailsCard from './ShowDetailsCard'
import AddOpenComponent from '../../../Components/Update/AddOpenComponent/AddOpenComponent'
export default function UserPaymentScreen(props) {
    const { history } = props



    const [openPayment, setOpenPayment] = useState(false)
    const userInfo = useSelector((state) => state?.userLogin?.userInfo)
    const TheCartNumber = useSelector((state) => state?.Cartnumber?.usercard)





    useEffect(() => {

        if (!userInfo?.firstname) {

            return history.push('/')
        }

    }, [history, userInfo?.firstname])





    return <Container>

        <Title TextTitle='Add Payment' />


        <Row className="justify-content-center margin-top-class" >
            <Col xs={12} sm={12} md={12} lg={12} >
                <div className='myprofile'>
                    <h1>Profile</h1>
                </div>

            </Col>


            <Col xs={12} sm={12} md={12} lg={12}>


                <UserNavBarScreen clasNamePayment />

                <div className='margin-bottom-class'>  </div>

            </Col>


            <Col xs={12} sm={12} md={12} lg={8} className={openPayment ? null : 'heigth-margin'}>

                {!openPayment ?

                    <div>

                        {TheCartNumber?.cartnumber ?


                            <ShowDetailsCard
                                TheCartNumber={TheCartNumber}
                            />

                            :
                            null
                        }




                        <div className='addToCart' onClick={(e) => setOpenPayment(true)}>
                            <AddOpenComponent
                                Titel='Add new Card'
                                style={Styles.addPayment}
                                className='className-link'
                                classNameTitle='className-linkleft'
                            />



                        </div>





                    </div>


                    :

                    <UserPaymentDerail
                        setOpenPayment={setOpenPayment}
                    />



                }





            </Col>



        </Row>
    </Container>
}