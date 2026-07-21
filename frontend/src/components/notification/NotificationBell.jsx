import { useEffect, useState } from "react";

import {
  FiBell,
} from "react-icons/fi";


import {
  getNotifications,
  markNotificationRead,
} from "../../api/notificationApi";


import {
  errorToast,
} from "../../utils/toast";



const NotificationBell = () => {


  const [notifications,setNotifications] = useState([]);

  const [open,setOpen] = useState(false);



  useEffect(()=>{

    loadNotifications();

  },[]);





  const loadNotifications = async()=>{


    try{


      const response =
        await getNotifications();



      setNotifications(
        response.data
      );



    }catch(error){


      console.log(error);


      errorToast(
        "Failed to load notifications"
      );


    }


  };







  const handleRead = async(id)=>{


    try{


      await markNotificationRead(id);



      setNotifications(
        notifications.map(
          (item)=>

            item._id === id

            ?

            {
              ...item,
              isRead:true
            }

            :

            item
        )
      );



    }catch(error){

      console.log(error);

    }


  };







  const unreadCount =

    notifications.filter(
      (item)=>!item.isRead
    ).length;







  return (

    <div className="relative">


      <button

        onClick={()=>setOpen(!open)}

        className="relative p-3 rounded-full hover:bg-gray-100"

      >

        <FiBell size={22}/>



        {
          unreadCount > 0 &&

          (

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

            {unreadCount}

          </span>

          )

        }



      </button>







      {
        open &&


        (

        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50">


          <div className="p-4 border-b">


            <h3 className="font-bold">

              Notifications

            </h3>


          </div>







          <div className="max-h-96 overflow-y-auto">


          {
            notifications.length===0

            ?

            (

            <p className="p-5 text-gray-500">

              No notifications

            </p>

            )


            :


            notifications.map(
              (notification)=>(


              <div

                key={
                  notification._id
                }

                onClick={()=>
                  handleRead(
                    notification._id
                  )
                }

                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  
                  !notification.isRead

                  ?

                  "bg-emerald-50"

                  :

                  ""

                }`}

              >


                <p className="text-sm">

                  {
                    notification.message
                  }

                </p>


                <p className="text-xs text-gray-400 mt-2">

                  {
                    new Date(
                      notification.createdAt
                    )
                    .toLocaleDateString()
                  }

                </p>



              </div>


              )
            )

          }


          </div>



        </div>

        )

      }





    </div>

  );

};


export default NotificationBell;