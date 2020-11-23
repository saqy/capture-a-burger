/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react"

 const HttpErrorHandler =  httpClient  => {
    const [error,setError] = useState(null)

    const requestInterceptors = httpClient.interceptors.request.use((request) => {
      setError(null)
      return request;
    });
    const responseInterceptors = httpClient.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err)
      }
    );
  

  useEffect(()=>{
    return ()=> {
      httpClient.interceptors.request.eject(requestInterceptors);
      httpClient.interceptors.response.eject(responseInterceptors);
    }
  },[requestInterceptors, responseInterceptors])
  
 const errorConfirmedHandler = () => {
    setError(null)
  };

  return [error, errorConfirmedHandler]

}

export default HttpErrorHandler