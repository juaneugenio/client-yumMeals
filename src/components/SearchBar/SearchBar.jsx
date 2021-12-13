// import React, { useEffect, useState } from "react";
// import { Form, Container, Row, Col, Button, FormControl } from "react-bootstrap";
// import { getSearchRecipes } from "../../services/recipeService";
// import { useNavigate } from "react-router-dom";
// import * as PATHS from "../../utils/paths";

// function SearchBar() {
//     const navigate = useNavigate();
//     const [searchForm, setSearchForm] = useState({
//       search: "",
//     });
//     const [error, setError] = useState("");
//     const [isLoading, SetIsLoading] = useState(false);

//     const { search } = searchForm;

//     //HANDLE UPDATE INPUT
//     function handleNormalInput(event) {
//         console.log(event.target.name);
//         console.log(event.target.value);
//       const { name, value } = event.target;
//       return setSearchForm({ ...searchForm, [name]: value });
//     }

//     function handleSubmit(event) {
//       event.preventDefault();
//       SetIsLoading(true);
//       setError(false);

//       getSearchRecipes(search).then((result) => {
//           console.log("search:", result)
//         if (!result.success) {
//           return setError(result.data);
//         }
//         navigate(PATHS.SEARCH_RESULT_PAGE);
//       });
//     }
//   return (
//     <div>
//       <div className="search-bar">
//         <Form onSubmit={handleSubmit} className="d-flex">
//           <FormControl
//             type="search"
//             value={search}
//             name= "search"
//             placeholder="Search a recipe"
//             className="me-2"
//             aria-label="Search"
//             onChange={handleNormalInput}
//           />
//           <Button type="submit" className="btn btn-info">Search</Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;
