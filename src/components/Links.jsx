import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStart } from '../store/ListSlice';
import { renderMarkup } from 'react-render-markup';

const Links = () => {
    const [datas, setData] = useState([]);
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(fetchDataStart()); 
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
        const sortedData = [...data].sort((a, b) => b.service_order - a.service_order);
        setData(sortedData);
    }
}, [data]);

  if (loading) {
    return (
    <div className='w-screen h-screen flex justify-center items-center mx-auto my-auto'>
        <div role="status">
    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    </div>);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    {/* Header Links */}
    <div className='m-4 p-2 rounded-md bg-slate-100'>
      {/* Display data */}
      {datas && (
        <ul className='md:flex md:flex-row-reverse md:px-20'>
          {datas.map(item => (
           <li key={item.service_order} className='line-clamp-2 m-1 text-xs mb-2 md:mb-0 hover:text-blue-600 transition-all ease-out'>
           <a href={`#id-${item.service_order}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Data Listing */}
    <div>
    {datas && (
        <div className='flex flex-col-reverse'>
        {datas.map(item => (
            <div id={`id-${item.service_order}`} key={item.service_order} className={`block lg:h-fit lg:flex justify-center items-center text-center ${item.service_order % 2 === 0 ? 'bg-gray-100 flex-row-reverse' : 'bg-gray-200'}`}>
                <div className='images lg:w-5/12 mx-10 my-4'>
                    <img src={item.icon} className='h-[500px] mx-auto' />
                </div>
                <div className='block lg:w-5/12 mx-10 my-8 p-4'>
                <img src={item.photo} className='w-20 mx-auto' />
                <h1 className='font-semibold text-2xl my-2'>{item.title}</h1>
                <div className='text-md text-gray-600 my-2'>{renderMarkup(item.description1)}</div>
                {item.description2 ? (
                    <div className='text-sm bg-blue-200 my-2 p-4 leading-5'>
                    {renderMarkup(item.description2)}
                    </div> 
                    ):(
                        <div></div>
                        )}
                </div>
            </div>

          ))}
       </div>
      )}
    </div>
    </>
  );
};

export default Links;
