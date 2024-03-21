


const Card = () =>{
    return(
        <div>
            <div className='bg-white border border-gray-300 p-2 h-auto w-80 rounded'>
                <img className='object-cover w-80 h-80 rounded'></img>
                <div className='h-auto mb-1'>
                    <div className='flex justify-between pr-1 pl-1 mt-3'>
                        <p className='text-lg font-roboto'>Prize</p>
                        <p className='text-lg'>100 HAM</p>
                    </div>  
                    <button className='bg-blue-600 w-[100%] h-10 mt-3 rounded cursor-pointer text-white'>Buy Now</button>
                </div>
            </div>

        </div>
    )
}

export default Card;