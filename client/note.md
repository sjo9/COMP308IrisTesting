```
In client/react-ui folder, npm i and npm run dev
In server folder, npm i and npm run dev
```

```
// function App() {
//   const [data, setData] = useState({});
//   const [showLoading, setShowLoading] = useState(false); 
//   const [showInputForm, setShowInputForm] = useState(true); 
//   const apiUrl = "api/run";

//   const handleFormSubmit = (inputData) => {
//     setShowInputForm(false); 
//     setShowLoading(true); 
//     fetchData(); 
//   };

//   const fetchData = async () => {
//     try {
//       const result = await axios.get(apiUrl);
//       console.log('result.data:', result.data);
//       setData(result.data);
//     } catch (error) {
//       console.log('error in fetchData:', error);
//     } finally {
//       setShowLoading(false); 
//     }
//   };

//   return (
//     <div className="container mt-5">
//       {showInputForm ? (
//         <div>
//           <InputForm onSubmit={handleFormSubmit} />
//         </div>
//       ) : (
//         <div>
//           {showLoading ? (
//             <div className="text-center my-5">
//               <Spinner animation="border" role="status" className="mb-3">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//               <h5>Waiting for results...</h5>
//             </div>
//           ) : (
//             <div>
//               <h1 className="text-center mb-4">Prediction Result</h1>

//               {/* Test Results Section */}
//               <div className="p-4 border rounded shadow-sm bg-light mb-4">
//                 <h5 className="text-center mb-3">Test Results</h5>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Test 1
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={data[0] || ''}
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Test 2
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={data[1] || ''}
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Test 3
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={data[2] || ''}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               {/* Species Values Section */}
//               <div className="p-4 border rounded shadow-sm bg-light">
//                 <h5 className="text-center mb-3">Definition of Values for Species</h5>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Setosa
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value="1, 0, 0"
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Virginica
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value="0, 1, 0"
//                     readOnly
//                   />
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <label className="form-label me-3" style={{ width: '150px' }}>
//                     Versicolor
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value="0, 0, 1"
//                     readOnly
//                   />
//                 </div>
//               </div>

//               {/* Back Button */}
//               <div className="text-center mt-4">
//                 <button
//                   className="btn btn-secondary px-4"
//                   onClick={() => setShowInputForm(true)}
//                 >
//                   Back to Input Form
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
```