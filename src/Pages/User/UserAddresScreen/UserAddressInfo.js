import '../UserProfileScreen/Profile.css'
import { WhichWork } from '../../../Assistant/Selection'
import ImageScreen from '../../../Components/ImageScreen/ImageScreen'
import { useState } from 'react'
import EditComponent from '../../../Components/Update/EditComponent/EditComponent'
import { AddAdressUserAction } from '../../../redux/Action/Auth_Action'
import { useDispatch } from 'react-redux'

export default function UserAddressInfo(props) {



    const { userInfo, ClassNamepAY, setOpenAddres } = props


    const [optionMore, setOptionMore] = useState(false)
    const dispatch = useDispatch()





    const OpenEditAddress = () => {



        setOpenAddres(true)
        setOptionMore(false)
    }






    return userInfo?.Adress ?
        <div className={ClassNamepAY ? 'PAYMENT-FIX' : 'className-infoUser'}>
            <div className='box-infoUser'>
                <ImageScreen
                    ImageIcon={WhichWork(userInfo?.Adress?.work)}
                    className={ClassNamepAY ? 'bike-User add-size' : 'bike-User'}
                />

            </div>
            <div className='first-left-box'>
                <div className={ClassNamepAY ? 'color-family-User add-size' : 'color-family-User'}>
                    {userInfo?.Adress?.work}
                </div>
                <span className={ClassNamepAY ? 'color-last-items-User add-size' : 'color-last-items-User'}>
                    {userInfo?.Adress?.addres} {userInfo?.Adress?.homeNumber}  {userInfo?.Adress?.zipcode} {userInfo?.Adress?.city}
                </span>
            </div>





            {ClassNamepAY ? null :
                <EditComponent
                    setOptionMore={setOptionMore}
                    optionMore={optionMore}
                    OpenEditAddress={OpenEditAddress}
                    NoRemove={(e) => dispatch(AddAdressUserAction({ ClassAddAddress: false }))}
                />
            }
        </div>
        : null














}