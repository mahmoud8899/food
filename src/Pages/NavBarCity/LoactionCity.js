import { Modal, } from 'react-bootstrap'
import ImageScreen from '../../Components/ImageScreen/ImageScreen'
import { MyOderImage } from '../../Assistant/MyOrderImage'
import './NavBarCity.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import NotUserSerchingCity from './NotUserSerchingCity'
import ActiveUserSearchCity from './ActiveUserSearchCity'
export default function LoactionCity(props) {

    const { showCity, setShowCity } = props
    const theUserCheckIn = useSelector((state) => state?.userLogin?.userInfo)
    const [openAddres, setOpenAddres] = useState(false)
    const [openSelectionCity, setOpenSelectionCity] = useState(false)





    // open address.... 
    const HandleOpenAdddress = (e) => {
        e.preventDefault()
        setOpenAddres(!openAddres)
    }


    // selection city 
    const HandleCity = (e) => {
        e.preventDefault()
        setOpenSelectionCity(!openSelectionCity)
    }


  



    return <Modal show={showCity} onHide={() => setShowCity(false)}>
        <div className='first-city-location add-padding-loaction'>
            <div>
                {openAddres || openSelectionCity ?
                    <ImageScreen
                        ImageIcon={MyOderImage.left}
                        className='close-pp-pp-image'
                        onClick={(e) => openAddres ? HandleOpenAdddress(e) : HandleCity(e)}
                    />
                    : null

                }

            </div>
            <div className='font-edit'>
                Edit address details
            </div>
            <ImageScreen ImageIcon={MyOderImage.close} className='close-pp-pp-image'
                onClick={() => setShowCity(false)} />
        </div>

        <div className='loaction-bottom'></div>

        {theUserCheckIn?.firstname ?

            // option if user login 
            <ActiveUserSearchCity
                openAddres={openAddres}
                setOpenAddres={setOpenAddres}
                openSelectionCity={openSelectionCity}
                setOpenSelectionCity={setOpenSelectionCity}
                theUserCheckIn={theUserCheckIn}
                HandleOpenAdddress={HandleOpenAdddress}
                HandleCity={HandleCity}
                setShowCity={setShowCity}
                showCity={showCity}

            />

            :
            // option if NOT  login 

            <NotUserSerchingCity />

        }








    </Modal>
}