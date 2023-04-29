const handleStatus = (status: string) => {

    if(status === "success") return  (
      <span className="border border-green-500 text-green-500 rounded-full px-3 py-2 ">
        {status}
      </span>
    )
    if(status === "failed") return (
      <span className="border border-red-600 text-red-600 rounded-full px-3 py-2">
        {status}
      </span>
    )
   if( status === "pending") return (
      <span className="border border-yellow-500 text-yellow-500 rounded-full px-3 py-2">
        Pending
      </span>
    )
  
  }

  export default handleStatus