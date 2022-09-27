import { useState } from "react";
import { dataSource } from "../Service/get-data";
import '../Page/search-page.css'

const SearchPage = () => {
    var obj = dataSource;
    const [searchValue, setInput] = useState("");
    const [result, setResult] = useState("");
    const [objName] = useState('a')
  
    const findPath = (obj, query) => {
  
      for (const key in obj) {
  
        if (obj[key] && typeof obj[key] === "object") {
          let result = findPath(obj[key], query);
  
          if (result) {
            result.push(key);
            return result;
          }
        } else {
          if (
            typeof obj[key] === "string" &&
            obj[key].toLowerCase() === query.toLowerCase()
          ) {
            return [key];
          }
          if (typeof obj[key] === "number" && obj[key] === +query) {
            return [key];
          }
        }
      }
    };
  
    const getPath = (obj, item) => {
  
      function getActualPath (data) {
          const path = findPath(data, item);
          if (path == null) {
            return "";
          }
          return `${objName}.${path.reverse().join(".")}`;
        }
  
      if(Array.isArray(obj)){
          for(let i = 0; i < obj.length; i++){
              let result = getActualPath(obj[i]);
              if(result) {
                 let [basePath, ...otherPaths] =  result.split('.')
                  result = [`${basePath}[${i}]`, ...otherPaths].join('.')
                  return result
              }
          }
          return;
      }
  
      return getActualPath(obj)
    };
  
    const getResult = (query) => {
      const result = getPath(obj, query) || "Not Found";
      setResult(result);
    };
  
    const handleChange = (e) => {
      setInput(e.target.value);
    };
  
    const handleSearch = () => {
      if (searchValue) {
        getResult(searchValue);
      } else {
        setResult("");
      }
    };
  
    return (
      <main clssName='main'>
        <div className="search-wrapper">
          <div className = "search-input-wrapper">
            <h1 >Search Engine</h1>
            <div class="btn-wrapper">
                <input type="text" onChange={handleChange} />
                <a onClick={handleSearch} className='search-icon'>🍳</a>
            </div>

          </div>
          <div className="search-result-wrapper">
            <p><span>Result: </span>{result}</p></div>

        </div>
      </main>
    );
}
 
export default SearchPage;