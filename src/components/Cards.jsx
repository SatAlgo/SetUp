import React from 'react';

function Cards({ item }) {
    return (

        <>
            <div className="mt-4 my-3 p-3">
                <div className="card w-92 h-[420px] shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img src={item.image} alt={item.title} />
                    </figure>
                    <div className="card-body p-5">
                        <h2 className="card-title justify-between">
                            {item.name}
                            <div
                                className={`badge ${item.category === 'For Sale'
                                        ? 'bg-lime-400 text-black'
                                        : item.category === 'Fashion'
                                        ? 'bg-green-500 text-white'
                                        : item.category === 'Books'
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-500 text-white'
                                    } rounded-md`}
                            >
                                {item.category}
                            </div>
                        </h2>
                        <p className="text-left text-[12px]">{item.description}</p>
                        <div className="card-actions justify-between">
                            {/* <div className="badge badge-outline">Rs. {item.price}</div> */}
                            {item.category === 'For Sale' && (
                                <div className="px-3 py-3 badge badge-outline">Rs. {item.price}</div>
                            )}
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer px-2 py-1 rounded-full border-[2px] badge badge-outline hover:bg-pink-500 hover:text-white duration-200"
                            >
                                Check
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards
