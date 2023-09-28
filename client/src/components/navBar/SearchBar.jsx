// import { useState } from "react";

// export default function SearchBar({}) {
//   const [id, setId] = useState("");

//   const handleChange = (event) => {
//     setId(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSearch(id);
//     setId("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         className="inputNav"
//         type="search"
//         placeholder="Insert a number..."
//         onChange={handleChange}
//         value={id}
//       />
//       <button className="addBtn" type="submit">
//         ADD
//       </button>
//       <button className="addBtn" type="button" onClick={clearCharacters}>
//         CLEAR
//       </button>
//     </form>
//   );
// }
