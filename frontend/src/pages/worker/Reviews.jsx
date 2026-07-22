import { useEffect, useState } from "react";

import {
  FiStar,
  FiAward,
  FiMessageSquare,
} from "react-icons/fi";

import { motion } from "framer-motion";

import ReviewCard from "../../components/review/ReviewCard";

import {
  getWorkerReviews,
} from "../../api/reviewApi";

import {
  getMyWorkerProfile,
} from "../../api/workerApi";

import {
  errorToast,
} from "../../utils/toast";


const Reviews = () => {

  const [data,setData] = useState(null);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadReviews();

  },[]);



  const loadReviews = async()=>{

    try{

      const profileResponse =
        await getMyWorkerProfile();


      const workerId =
        profileResponse.data._id;



      const reviewResponse =
        await getWorkerReviews(workerId);



      setData(reviewResponse.data);


    }catch(error){

      console.log(
        "REVIEW ERROR:",
        error.response?.data || error
      );


      errorToast(
        "Failed to load reviews"
      );


    }finally{

      setLoading(false);

    }

  };




  if(loading){

    return(

      <div className="
      h-96
      flex
      items-center
      justify-center
      ">

        <div className="text-center">

          <div className="
          h-12
          w-12
          rounded-full
          border-4
          border-emerald-600
          border-t-transparent
          animate-spin
          mx-auto
          " />

          <p className="
          mt-4
          text-gray-500
          ">
            Loading Reviews...
          </p>

        </div>

      </div>

    );

  }




  const stats = [

    {
      title:"Average Rating",
      value:data?.averageRating || 0,
      icon:<FiStar/>,
      color:"text-yellow-500"
    },


    {
      title:"Reputation Score",
      value:data?.reputationScore || 0,
      icon:<FiAward/>,
      color:"text-emerald-600"
    },


    {
      title:"Total Reviews",
      value:data?.totalReviews || 0,
      icon:<FiMessageSquare/>,
      color:"text-blue-600"
    }

  ];



  return (

    <div className="
    min-h-screen
    bg-gradient-to-br
    from-slate-50
    via-white
    to-emerald-50
    p-4
    sm:p-6
    lg:p-8
    space-y-8
    ">



      {/* Header */}


      <motion.div

        initial={{
          opacity:0,
          y:-20
        }}

        animate={{
          opacity:1,
          y:0
        }}

        className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-200
        p-8
        "

      >

        <h1 className="
        text-3xl
        sm:text-4xl
        font-bold
        text-slate-900
        ">
          My Reviews
        </h1>


        <p className="
        text-gray-500
        mt-3
        ">
          Client feedback and your professional reputation.
        </p>


      </motion.div>





      {/* Statistics */}


      <div className="
      grid
      md:grid-cols-3
      gap-6
      ">


        {
          stats.map((item,index)=>(


            <motion.div

              key={index}

              whileHover={{
                y:-5
              }}

              className="
              bg-white
              rounded-3xl
              shadow-lg
              border
              border-slate-200
              p-6
              "

            >


              <div className={`
              ${item.color}
              text-3xl
              `}>

                {item.icon}

              </div>



              <h2 className="
              text-4xl
              font-bold
              mt-5
              ">

                {item.value}

              </h2>



              <p className="
              text-gray-500
              mt-2
              ">

                {item.title}

              </p>


            </motion.div>


          ))
        }


      </div>







      {/* Reviews List */}


      <div className="
      space-y-5
      ">


        {
          !data?.reviews ||
          data.reviews.length===0

          ?


          (

            <div className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            p-12
            text-center
            ">


              <FiMessageSquare

                size={60}

                className="
                mx-auto
                text-gray-300
                mb-5
                "

              />


              <h2 className="
              text-2xl
              font-bold
              ">

                No Reviews Yet

              </h2>


              <p className="
              text-gray-500
              mt-3
              ">

                Complete jobs to receive client feedback.

              </p>


            </div>


          )


          :


          data.reviews.map((review)=>(


            <ReviewCard

              key={review._id}

              review={review}

            />


          ))

        }


      </div>



    </div>

  );

};


export default Reviews;