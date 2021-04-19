import React, { useEffect , useState} from 'react';
import axios from 'axios'; 
import Loader from './Loader'; 
import Paginate from './Paginate'; 
//import styles from './styles.css'; 
const Giphy = () =>  {
    //pass the default into useState() 
        const [data, setData] = useState([]); 
        const [isLoading , setIsLoading] = useState(false); 

    //Error handling 
        const [isError, setIsError] = useState(false); //set state as false if no error happens yet
    //Searching Gifs 
        const [search, setSearch] = useState("");

    //Pagination 
        const [currentPage, setCurrentPage] = useState(1); 
        const [itemsPerPage, setItemsPerPage] = useState(20); 
        const indexOfLastItem = currentPage * itemsPerPage; 
        const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
        const currentItems  = data.slice( indexOfFirstItem, indexOfLastItem); 
        //Page 1 : item 1 - 25 
        //Page 2: item 26 - 50 
        //Page 3: item 51 - 75 
        //Page 4 : item 76 - 100; 
    useEffect(() => {
    const fetchData = async() => { 
        setIsError (false); // No eroor until error happends. 
        setIsLoading(true); // in this function Loading is True 

        try { 
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
            api_key: "EHJWnmARPJfgSgaToHjpuISipYUaFsmR", 
        }
        }); //pass it into [] empty dependency array 
        console.log(results); 
        setData(results.data.data); //console it in 

        }
        catch(err){ //If we catch the error -> this code block will work 
        setIsError(true); //Error happens.
        setTimeout(() => setIsError(false), 4000); //timer will wait for four minutes and then go back to loading 
        console.log(err); // error object will be consoled in log. 
        }
        setIsLoading(false); 
        //Anytime state changes , it will rerender and when the state chages and rerender happens 
        // setIsLoading will set it back to false --> then it will show loading spinner 
        // we can see the spinner is loading when we refresh the page. 
    }
        fetchData(); 
    }, []); 
    
    //Error handling --> isLoading happens (Error in loading ) this function will work. 
    const renderGifs = () => {  
        if (isLoading){ //Return Loader component ....
            return <Loader/>; 
        }
        return currentItems.map( el=>{
            return (
            <div key={el.id} className = "gif"><img className="border border-secondary rounded m-2" src={el.images.fixed_height.url}/></div>
        )
    }); 
}; 

    const renderError = () => { 
        if (isError){ 
         return (  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                Unable to get Gifs , please try again in a few minutes. 
            </div>); 
        }
    }; 
    // onChange = {searchChange}
    //            value={search}

    const handleSearchChange = (event) => { 
        setSearch(event.target.value); 
    }
    const handleSubmit = async (event) => { 
        //dont need a fetch data anymore . alreay fetch the data 
        //and just need to search data what we already fetched 
        //const fetData = () => { 
        //need to make sure an event to prevent from default , don't want to reload it. 
        event.preventDefault(); 
        setIsError(false); 
        setIsLoading(true); 
        //Error Handling 
        try { 
        const results = await axios("http://api.giphy.com/v1/gifs/search", 
            {
                params: {
                    api_key: "EHJWnmARPJfgSgaToHjpuISipYUaFsmR", 
                    q: search, 
                    limit: 1000
                }
            }); 
            setData(results.data.data);
        }
        
        catch (err){ 
            setIsError(true); 
            setTimeout(() => setIsError(false), 4000); 
        }
            setIsLoading(false); 
    }
        const pageSelected = (pageNumber) => { 
            setCurrentPage(pageNumber); 
        }
      return (
          <div className = "m-2"> 

           {renderError()}
           <form className = "form-inline justify-content-center m-2">

               <input  
               value={search}
               onChange = {handleSearchChange} type="text" placeholder="Search" className="form-control"
               />
               <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2"> Search </button>
           </form>
           <Paginate pageSelected={pageSelected}   currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={data.length}/> 
           <div className = "container gifs"> 
            {renderGifs()}
            </div> 
            
            </div>); 
    
}
 
export default Giphy;