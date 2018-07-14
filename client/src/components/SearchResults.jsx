import React from 'react';

const SearchResults = ({results}) => {
  if(!results){
    return(<div></div>)
  }
  else if (!results.length){
    return(<div>No Results Found For Your Query</div>)
  }
    return (
      <div>
        {
          results.map(result=>{
           return  <div>{result}</div>
          })
        }
      
      </div>
    );
 
};
export default SearchResults;